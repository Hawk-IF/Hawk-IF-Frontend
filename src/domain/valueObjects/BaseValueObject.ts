import ValueObjectException from "../exceptions/ValueObjectException"

abstract class BaseValueObject<T> {
    protected _value!: T

    protected constructor() {}

    public static create<T, TInstance extends BaseValueObject<T>>(
        this: new () => TInstance,
        value: T
    ): TInstance {
        const instance = new this()
        
        const validateResult = instance.validate(value)
        
        if (validateResult) {
            throw new ValueObjectException(validateResult)
        }

        instance._value = typeof value === "object" && value !== null ?
            Object.freeze({...value}) :
            value

        return instance
    }

    public static reconstruct<T, TInstance extends BaseValueObject<T>>(
        this: new () => TInstance,
        value: T
    ): TInstance {
        const instance = new this()
        instance._value = value
        return instance
    }

    protected abstract validate(value: T): string | void

    get value(): T | undefined {
        return this._value
    }

    public equals(vo?: BaseValueObject<T>): boolean {
        if (vo === null || vo === undefined) return false

        if (vo.value === undefined && this.value === undefined) return true

        if (vo.value === undefined) return false

        if (typeof this.value === "object" && this.value !== null) {
            return JSON.stringify(this.value) === JSON.stringify(vo.value)
        }

        return vo.value === this.value
    }
}

export default BaseValueObject
