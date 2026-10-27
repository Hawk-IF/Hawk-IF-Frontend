import type { TErrorValidator } from "../exceptions/ValidatorException";
import BaseValidator from "./BaseValidator";

class NotNullValidator extends BaseValidator {
    public validate(field: string, value: unknown): TErrorValidator | void {
        if (value === null) {
            const error: TErrorValidator = {
                field: field, 
                message: "O valor não pode ser nulo."
            }

            return error
        }
    }
}

const notNullValidator = new NotNullValidator()

export default notNullValidator