import { type TError } from "../exceptions/ValidatorException"

abstract class BaseValidator {
    public abstract validate(field: string, value: unknown): TError | void
}

export default BaseValidator