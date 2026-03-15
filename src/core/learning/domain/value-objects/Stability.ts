
/**
 * Represents the stability of a vocabulary item
 * in the spaced repetition algorithm.
 *
 * Stability influences the review interval.
 * Higher stability leads to longer intervals.
 *
 * This is a Value Object and is immutable.
 */
export class Stability {
    private readonly value: number

    constructor(value: number) {
        if (value < 0) {
            throw new Error("Stability cannot be negative")
        }

        this.value = value
    }

    /**
     * Returns the primitive value.
     */
    getValue(): number {
        return this.value
    }

    /**
     * Returns a new Stability with increased value.
     *
     * @param amount - Amount to increase
     */
    increase(amount: number): Stability {
        if (amount < 0) {
            throw new Error("Increase amount must be positive")
        }

        return new Stability(this.value + amount)
    }

    /**
     * Returns a new Stability with decreased value.
     *
     * @param amount - Amount to decrease
     */
    decrease(amount: number): Stability {
        if (amount < 0) {
            throw new Error("Decrease amount must be positive")
        }

        return new Stability(Math.max(0, this.value - amount))
    }

    /**
     * Compares two Stability value objects.
     */
    equals(other: Stability): boolean {
        return this.value === other.value
    }
}