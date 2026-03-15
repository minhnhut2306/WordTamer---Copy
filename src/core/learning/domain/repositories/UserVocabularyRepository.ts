// domain/repositories/UserVocabularyRepository.ts

import { UserVocabularyProgress } from "../entities/UserVocabularyProgress"

export interface UserVocabularyRepository {
    findByUserAndVocab(userId: string, vocabId: string):any 
    save(progress: UserVocabularyProgress): Promise<void>
}