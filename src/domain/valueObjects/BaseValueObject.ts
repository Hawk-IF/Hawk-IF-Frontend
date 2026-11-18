import ValueObjectException from "../exceptions/ValueObjectException"

abstract class BaseValueObject<T> {
    protected _value!: T
    protected abstract _brand: string

    constructor(
        value: T
    ) {
        const validateResult = this.validate(value)

        if (validateResult) {
            throw new ValueObjectException(validateResult)
        }

        this._value = typeof value === "object" && value !== null ?
            Object.freeze({ ...value }) :
            value
    }

    protected abstract validate(value: T): string | void

    get value(): T | undefined {
        return this._value
    }

    public equals(vo?: BaseValueObject<T>): boolean {
        if (vo === null || vo === undefined) return false

        if (vo.value === undefined && this.value === undefined) return true

        if (vo.value === undefined) return false

        if (this._brand !== vo._brand) return false

        if (typeof this.value === "object" && this.value !== null) {
            return JSON.stringify(this.value) === JSON.stringify(vo.value)
        }

        return vo.value === this.value
    }
}

export default BaseValueObject
