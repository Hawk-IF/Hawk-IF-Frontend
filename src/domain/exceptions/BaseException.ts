export enum TErrorCodes {
    ERR_DOMAIN = "ERR_DOMAIN",
    ERR_VALIDATOR = "ERR_VALIDATOR",
    ERR_VALUE_OBJECT = "ERR_VALUE_OBJECT"
}

abstract class BaseException extends Error{
    constructor (
        name: string,
        message: string,
        protected readonly _errorCode: TErrorCodes
    ) {
        super(message)
        this.name = name
        this._errorCode = _errorCode

        Object.setPrototypeOf(this, new.target.prototype)
    }

    get errorCode(): TErrorCodes {
        return this._errorCode
    }
}

export default BaseException