import type { TErrorValidator } from "../exceptions/ValidatorException";
import BaseValidator from "./BaseValidator";

class NotUndefinedValidator extends BaseValidator {
    public validate(field: string, value: unknown): TErrorValidator | void {
        if (value === undefined) {
            const error: TErrorValidator = {
                field: field, 
                message: "O valor não pode ser indefinido."
            }

            return error
        }
    }
}

const notUndefinedValidator = new NotUndefinedValidator()

export default notUndefinedValidator