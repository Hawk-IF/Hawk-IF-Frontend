import { type TError } from "../exceptions/ValidatorException"

abstract class BaseValidator {
    protected constructor() {}

    public abstract validate(field: string, value: unknown): TError | void
}

export default BaseValidator