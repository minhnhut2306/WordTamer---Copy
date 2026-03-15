
/**
 * Represents the review level of a vocabulary item.
 *
 * Level increases with correct answers
 * and resets when the user answers incorrectly.
 *
 * This is a Value Object and is immutable.
 */
export class ReviewLevel {
    private readonly value: number

    constructor(value: number) {
        if (value < 0) {
            throw new Error("ReviewLevel cannot be negative")
        }

        this.value = value
    }

    /**
     * Returns the primitive level value.
     */
    getValue(): number {
        return this.value
    }

    /**
     * Returns the next review level.
     */
    next(): ReviewLevel {
        return new ReviewLevel(this.value + 1)
    }

    /**
     * Resets level to zero.
     */
    reset(): ReviewLevel {
        return new ReviewLevel(0)
    }

    /**
     * Compares two ReviewLevel instances.
     */
    equals(other: ReviewLevel): boolean {
        return this.value === other.value
    }
}