import BaseException, { TErrorCodes } from "./BaseException";

export type TError = {
    field: string, 
    message: string
}

class ValueObjectException extends BaseException {
    constructor (
        message: string = "O valor fornecido não é válido"
    ) {
        super(
            "ValueObjectException",
            message,
            TErrorCodes.ERR_VALUE_OBJECT
        )
    }
}

export default ValueObjectException