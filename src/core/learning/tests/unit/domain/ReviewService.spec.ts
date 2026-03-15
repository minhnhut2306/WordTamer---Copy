import { ReviewService } from "../../../domain/services/ReviewService"
import { UserVocabularyProgress } from "../../../domain/entities/UserVocabularyProgress"
import { ReviewLevel } from "../../../domain/value-objects/ReviewLevel"
import { Stability } from "../../../domain/value-objects/Stability"
import { EaseFactor } from "../../../domain/value-objects/EaseFactor"

describe("ReviewService", () => {

    let reviewService: ReviewService

    beforeEach(() => {
        reviewService = new ReviewService()
    })

    function createMockProgress() {

        const level = {
            next: jest.fn(),
            reset: jest.fn()
        } as unknown as ReviewLevel

        const stability = {
            increase: jest.fn(),
            decrease: jest.fn(),
            getValue: jest.fn()
        } as unknown as Stability

        const ease = {
            adjust: jest.fn(),
            getValue: jest.fn(),
            min: jest.fn()
        } as unknown as EaseFactor

        const progress = {
            level,
            stability,
            easeFactor: ease,
            updateAfterReview: jest.fn()
        } as unknown as UserVocabularyProgress

        return { progress, level, stability, ease }
    }

    it("should update progress correctly when answer is correct", () => {

        const { progress, level, stability, ease } = createMockProgress()

        const newLevel = {} as ReviewLevel
        const newStability = {
            getValue: jest.fn().mockReturnValue(3)
        } as unknown as Stability

        const newEase = {
            getValue: jest.fn().mockReturnValue(2)
        } as unknown as EaseFactor

        level.next = jest.fn().mockReturnValue(newLevel)
        stability.increase = jest.fn().mockReturnValue(newStability)
        ease.adjust = jest.fn().mockReturnValue(newEase)

        const now = new Date("2025-01-01")

        reviewService.review(progress, true, now)

        expect(level.next).toHaveBeenCalled()
        expect(stability.increase).toHaveBeenCalledWith(1)
        expect(ease.adjust).toHaveBeenCalledWith(0.1)

        expect(progress.updateAfterReview).toHaveBeenCalled()

        const callArgs = (progress.updateAfterReview as jest.Mock).mock.calls[0][0]

        expect(callArgs.level).toBe(newLevel)
        expect(callArgs.stability).toBe(newStability)
        expect(callArgs.easeFactor).toBe(newEase)
        expect(callArgs.isCorrect).toBe(true)

        expect(callArgs.nextReviewAt).toBeInstanceOf(Date)
    })

    it("should reset progress correctly when answer is incorrect", () => {

        const { progress, level, stability, ease } = createMockProgress()

        const newLevel = {} as ReviewLevel
        const newStability = {} as Stability

        const adjustedEase = {
            min: jest.fn().mockReturnValue("FINAL_EASE")
        }

        level.reset = jest.fn().mockReturnValue(newLevel)
        stability.decrease = jest.fn().mockReturnValue(newStability)
        ease.adjust = jest.fn().mockReturnValue(adjustedEase)

        const now = new Date("2025-01-01")

        reviewService.review(progress, false, now)

        expect(level.reset).toHaveBeenCalled()
        expect(stability.decrease).toHaveBeenCalledWith(1)
        expect(ease.adjust).toHaveBeenCalledWith(-0.2)
        expect(adjustedEase.min).toHaveBeenCalledWith(1.3)

        expect(progress.updateAfterReview).toHaveBeenCalled()

        const callArgs = (progress.updateAfterReview as jest.Mock).mock.calls[0][0]

        expect(callArgs.level).toBe(newLevel)
        expect(callArgs.stability).toBe(newStability)
        expect(callArgs.easeFactor).toBe("FINAL_EASE")
        expect(callArgs.isCorrect).toBe(false)

        expect(callArgs.nextReviewAt).toBeInstanceOf(Date)
    })

})