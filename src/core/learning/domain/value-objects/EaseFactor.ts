
/**
 * Represents the ease factor in spaced repetition.
 *
 * Ease factor determines how aggressively
 * the interval increases after a correct review.
 *
 * Minimum value is typically 1.3 (SM-2 standard).
 *
 * This is a Value Object and is immutable.
 */
export class EaseFactor {
    private readonly value: number
    private static readonly MIN = 1.3

    constructor(value: number) {
        if (value < EaseFactor.MIN) {
            throw new Error(
                `EaseFactor cannot be lower than ${EaseFactor.MIN}`
            )
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
     * Returns a new EaseFactor adjusted by delta.
     *
     * @param delta - Adjustment value (can be negative)
     */
    adjust(delta: number): EaseFactor {
        const next = this.value + delta
        return new EaseFactor(
            Math.max(EaseFactor.MIN, next)
        )
    }

    /**
     * Compares two EaseFactor instances.
     */
    equals(other: EaseFactor): boolean {
        return this.value === other.value
    }
}