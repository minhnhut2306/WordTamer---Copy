

import { ReviewService } from "../../domain/services/ReviewService"
import { VocabularyRepository } from "../../domain/repositories/VocabularyRepository"
import { UserVocabularyRepository } from "../../domain/repositories/UserVocabularyRepository"
export class ReviewVocabularyUseCase {

    constructor(
        private readonly userVocabularyRepo: UserVocabularyRepository,
        private readonly vocabularyRepo: VocabularyRepository,
        private readonly reviewService: ReviewService
    ) {}

    async execute(params: {
        userId: string
        vocabularyId: string
        userAnswer: string
    }) {

        const { userId, vocabularyId, userAnswer } = params

        // 1️⃣ Lấy Vocabulary
        const vocabulary = await this.vocabularyRepo.findById(vocabularyId)
        if (!vocabulary) {
            throw new Error("Vocabulary not found")
        }

        // 2️⃣ Lấy tiến độ user
        const progress = await this.userVocabularyRepo.findByUserAndVocab(
            userId,
            vocabularyId
        )

        if (!progress) {
            throw new Error("User progress not found")
        }

        // 3️⃣ So sánh đáp án
        const isCorrect = vocabulary.isCorrectAnswer(userAnswer)

        console.log(`${isCorrect}`)

        // // 4️⃣ Tính thuật toán
        // const updatedProgress = this.reviewService.review(
        //     progress,
        //     isCorrect
        // )

        // // 5️⃣ Lưu lại
        // await this.userVocabularyRepo.save(updatedProgress)

        return {
            // correct: isCorrect,
            // nextReviewAt: updatedProgress.nextReviewAt,
            // level: updatedProgress.level
        }
    }
}