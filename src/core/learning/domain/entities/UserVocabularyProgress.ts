import { Stability } from "../value-objects/Stability"
import { EaseFactor } from "../value-objects/EaseFactor"
import { ReviewLevel } from "../value-objects/ReviewLevel"

/**
 * Represents the learning progress of a specific user
 * for a specific vocabulary item.
 *
 * This entity acts as an Aggregate Root in the learning domain.
 * All state mutations related to spaced repetition must go
 * through this class to maintain consistency and invariants.
 */
export interface UserVocabularyProgressProps {

    readonly id: string
    readonly userId: string
    readonly vocabularyId: string
    readonly createdAt: Date
    level: ReviewLevel
    stability: Stability
    easeFactor: EaseFactor
    nextReviewAt: Date
    correctCount: number
    wrongCount: number
}

export class UserVocabularyProgress {
     constructor(
        private props: UserVocabularyProgressProps
    ) { }

    /**
     * Creates a new learning progress instance
     * when a user starts learning a vocabulary item
     * for the first time.
     *
     * @param params - Required identifiers
     * @returns A new UserVocabularyProgress instance
     */
    static create(params: {
        id: string
        userId: string
        vocabularyId: string
    }): UserVocabularyProgress {
        return new UserVocabularyProgress({
            id: params.id,
            userId: params.userId,
            vocabularyId: params.vocabularyId,
            level: new ReviewLevel(0),
            stability: new Stability(1),
            easeFactor: new EaseFactor(2.5),
            nextReviewAt: new Date(),
            correctCount: 0,
            wrongCount: 0,
            createdAt: new Date(),
        })
    }

    updateAfterReview(params: {
        level: ReviewLevel
        stability: Stability
        easeFactor: EaseFactor
        nextReviewAt: Date
        isCorrect: boolean
    }): void {

        this.props.level = params.level
        this.props.stability = params.stability
        this.props.easeFactor = params.easeFactor
        this.props.nextReviewAt = params.nextReviewAt

        if (params.isCorrect) {
            this.props.correctCount++
        } else {
            this.props.wrongCount++
        }
    }

    /**
     * Reconstructs the entity from persisted data.
     * Used when loading from database or storage.
     *
     * @param props - Persisted entity properties
     * @returns Rehydrated UserVocabularyProgress instance
     */
    static rehydrate(
        props: UserVocabularyProgressProps
    ): UserVocabularyProgress {
        return new UserVocabularyProgress(props)
    }

    /**
     * Determines whether the vocabulary item
     * is due for review.
     *
     * @param now - Optional reference time (defaults to current time)
     * @returns True if review is due
     */
    isDue(now: Date = new Date()): boolean {
        return this.props.nextReviewAt <= now
    }


    /**
     * Unique identity of the progress entity.
     */
    get id(): string {
        return this.props.id
    }

    /**
     * Owner user identifier.
     */
    get userId(): string {
        return this.props.userId
    }

    /**
     * Associated vocabulary identifier.
     */
    get vocabularyId(): string {
        return this.props.vocabularyId
    }


    /**
     * Next scheduled review date.
     */
    get nextReviewAt(): Date {
        return this.props.nextReviewAt
    }

    /**
     * Total number of correct answers.
     */
    get correctCount(): number {
        return this.props.correctCount
    }

    /**
     * Total number of incorrect answers.
     */
    get wrongCount(): number {
        return this.props.wrongCount
    }


    get level(): ReviewLevel {
        return this.props.level
    }

    get stability(): Stability {
        return this.props.stability
    }

    get easeFactor(): EaseFactor {
        return this.props.easeFactor
    }



    /**
     * Compares entities based on identity.
     *
     * @param other - Another UserVocabularyProgress instance
     * @returns True if both share the same id
     */
    equals(other: UserVocabularyProgress): boolean {
        return this.id === other.id
    }

    /**
     * Serializes entity into a plain object
     * suitable for persistence.
     *
     * Value objects are converted into primitives.
     */
    toJSON(): Omit<
        UserVocabularyProgressProps,
        "level" | "stability" | "easeFactor"
    > & {
        level: number
        stability: number
        easeFactor: number
    } {
        return {
            ...this.props,
            level: this.props.level.getValue(),
            stability: this.props.stability.getValue(),
            easeFactor: this.props.easeFactor.getValue(),
        }
    }
} 