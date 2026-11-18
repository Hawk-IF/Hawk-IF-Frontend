import { describe, test, expect } from "vitest";
import BaseException, { TErrorCodes } from "@/src/domain/exceptions/BaseException";

class FakeDomainException extends BaseException {
    constructor(
        message: string = "FakeDomainException1_Message",
    ) {
        super("FakeDomainException1", message, TErrorCodes.ERR_DOMAIN)
    }
}

function ThrowNewFakeDomainException(message?: string): void {
    throw new FakeDomainException(message)
}

describe("BaseException", () => {
    test("throw lança erro de acordo com o tipo da exception", () => {
        expect(() => ThrowNewFakeDomainException()).toThrow(FakeDomainException)
    })

    test("o lançamento do erro retorna mensagem passada", () => {
        expect(() => ThrowNewFakeDomainException("test error message")).toThrow("test error message")
    })

    test("armazena código de erro conforme o tipo de exception", () => {
        const fakeDomainException = new FakeDomainException()

        expect(fakeDomainException.errorCode).toBe("ERR_DOMAIN")
    })
})