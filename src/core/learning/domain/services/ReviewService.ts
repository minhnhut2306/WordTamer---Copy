import { UserVocabularyProgress } from "../entities/UserVocabularyProgress"
import { ReviewLevel } from "../value-objects/ReviewLevel"
import { Stability } from "../value-objects/Stability"
import { EaseFactor } from "../value-objects/EaseFactor"

/**
 * Domain Service
 *
 * Implements a spaced repetition algorithm inspired by SM-2 (SuperMemo 2).
 *
 * Scientific Foundation:
 * - Based on the forgetting curve theory by Hermann Ebbinghaus.
 * - Used in systems like Anki.
 *
 * Core Principles:
 * - Correct answers increase review interval exponentially.
 * - Incorrect answers reset learning progress.
 * - Ease factor adjusts card difficulty dynamically.
 *
 * Responsibilities:
 * - Pure domain logic (no DB, no framework dependency)
 * - Calculates next review state
 * - Delegates state mutation to Entity
 */
export class ReviewService {

    /**
     * Reviews a vocabulary progress instance.
     *
     * @param progress - User vocabulary progress aggregate root
     * @param isCorrect - Whether the user's answer was correct
     * @param now - Current timestamp (injected for testability)
     */
    review(
        progress: UserVocabularyProgress,
        isCorrect: boolean,
        now: Date = new Date()
    ): void {

        const currentLevel = progress.level
        const currentStability = progress.stability
        const currentEase = progress.easeFactor

        let newLevel: ReviewLevel
        let newStability: Stability
        let newEase: EaseFactor
        let nextReviewAt: Date

        /**
         * If answer is correct:
         * - Increase repetition level
         * - Increase stability (memory strength)
         * - Slightly increase ease factor
         * - Calculate next interval exponentially
         */
        if (isCorrect) {

            newLevel = currentLevel.next()

            // Stability grows with successful recall
            newStability = currentStability.increase(1)

            // Ease factor increases slightly (card becomes easier)
            newEase = currentEase.adjust(0.1)

            /**
             * Interval formula:
             * interval = stability × easeFactor
             *
             * This creates exponential growth similar to SM-2:
             * 1 → 6 → 15 → 35 → 90 → ...
             */
            const intervalDays = Math.max(
                1,
                Math.round(
                    newStability.getValue() *
                    newEase.getValue()
                )
            )

            nextReviewAt = new Date(now)
            nextReviewAt.setDate(
                nextReviewAt.getDate() + intervalDays
            )

        } else {

            /**
             * If answer is incorrect:
             * - Reset repetition level
             * - Reduce stability (memory weakens)
             * - Decrease ease factor (card becomes harder)
             * - Schedule short interval (1 day)
             */

            newLevel = currentLevel.reset()

            newStability = currentStability.decrease(1)

            // Ease factor should never drop below 1.3 (SM-2 rule)
            newEase = currentEase.adjust(-0.2).min(1.3)

            nextReviewAt = new Date(now)
            nextReviewAt.setDate(
                nextReviewAt.getDate() + 1
            )
        }

        /**
         * Apply new state to aggregate root
         */
        progress.updateAfterReview({
            level: newLevel,
            stability: newStability,
            easeFactor: newEase,
            nextReviewAt,
            isCorrect
        })
    }
}