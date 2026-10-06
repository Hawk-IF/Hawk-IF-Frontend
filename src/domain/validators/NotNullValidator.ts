import type { TError } from "../exceptions/ValidatorException";
import BaseValidator from "./BaseValidator";

class NotNullValidator extends BaseValidator {
    public validate(field: string, value: Date) {
        if (value === null) {
            const error: TError = {
                field: field, 
                message: "O valor não pode ser nulo."
            }

            return error
        }
    }
}

const notNullValidator = new NotNullValidator()

export default notNullValidator