import BaseException, { TErrorCodes } from "./BaseException";

export type TErrorValidator = {
    field: string, 
    message: string
}

class ValidatorException extends BaseException {
    constructor (
        errors: TErrorValidator[] = [],
        message: string = "Falha na validação."
    ) {
        const customMessage: string = errors.length > 0 
            ? `${message} - ${
                errors.map(error => `${error.field}: ${error.message}`)
                .join(" | ")
            }` 
            : message

        super(
            "ValidatorException",
            customMessage,
            TErrorCodes.ERR_VALIDATOR
        )
    }
}

export default ValidatorException