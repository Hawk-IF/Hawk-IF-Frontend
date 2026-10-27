import { type TErrorValidator } from "../exceptions/ValidatorException"

abstract class BaseValidator {
    public abstract validate(field: string, value: unknown): TErrorValidator | void
}

export default BaseValidator