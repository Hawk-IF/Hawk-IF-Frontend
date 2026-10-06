import type { TError } from "../exceptions/ValidatorException";
import BaseValidator from "./BaseValidator";

class CurrentDateValidator extends BaseValidator {
    public validate(field: string, value: Date) {
        const dateNow = Date.now()
        const valueTime = value.getTime() 
        const diff = Math.abs(dateNow - valueTime)

        if (diff > 1000) {
            const error: TError = {
                field: field, 
                message: "A data fornecida não corresponde ao momento atual."
            }

            return error
        }
    }
}

const currentDateValidator = new CurrentDateValidator()

export default currentDateValidator