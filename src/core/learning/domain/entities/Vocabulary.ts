/**
 * Vocabulary Entity
 *
 * Đại diện một từ vựng trong hệ thống.
 * Không chứa logic học tập (SRS).
 * Chỉ quản lý trạng thái và tính toàn vẹn dữ liệu của chính nó.
 */

export interface VocabularyProps {
    readonly id: string
    readonly word: string
    readonly meaning: string
    readonly example?: string
    readonly createdAt: Date
}

export class Vocabulary {
     constructor(private readonly props: VocabularyProps) { }

    /**
     * Factory method dùng khi tạo mới từ vựng.
     * Tự động gán createdAt.
     */
    static create(
        props: Omit<VocabularyProps, "createdAt">
    ): Vocabulary {
        if (!props.word.trim()) {
            throw new Error("Word cannot be empty")
        }

        if (!props.meaning.trim()) {
            throw new Error("Meaning cannot be empty")
        }

        return new Vocabulary({
            ...props,
            createdAt: new Date(),
        })
    }
    isCorrectAnswer(userAnser:string):boolean{
        return true
    }

    /**
     * Rehydrate dùng khi load từ database.
     * Không thay đổi dữ liệu.
     */
    static rehydrate(props: VocabularyProps): Vocabulary {
        return new Vocabulary(props)
    }

    // ======================
    // Getters
    // ======================

    get id(): string {
        return this.props.id
    }

    get word(): string {
        return this.props.word
    }

    get meaning(): string {
        return this.props.meaning
    }

    get example(): string | undefined {
        return this.props.example
    }

    get createdAt(): Date {
        return this.props.createdAt
    }

    /**
     * So sánh entity theo identity.
     */
    equals(other: Vocabulary): boolean {
        return this.id === other.id
    }

    /**
     * Trả về plain object để lưu trữ.
     */
    toJSON(): VocabularyProps {
        return { ...this.props }
    }
}