
// domain/repositories/VocabularyRepository.ts

import { Vocabulary } from "../entities/Vocabulary"

/**
 * VocabularyRepository
 *
 * Contract định nghĩa cách truy cập Vocabulary từ storage.
 * Domain layer chỉ biết interface này.
 * Infrastructure layer sẽ implement nó.
 */
export interface VocabularyRepository {

    /**
     * Tìm Vocabulary theo id
     */
    findById(id: string): Promise<Vocabulary | null>

    /**
     * Lấy danh sách Vocabulary theo nhiều id
     */
    findByIds(ids: string[]): Promise<Vocabulary[]>

    /**
     * Lấy danh sách từ theo topic
     */
    findByTopic(topicId: string): Promise<Vocabulary[]>

    /**
     * Lưu Vocabulary (dùng cho admin hoặc seed data)
     */
    save(vocabulary: Vocabulary): Promise<void>
}