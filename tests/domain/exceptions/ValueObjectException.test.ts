import { describe, test, expect } from "vitest";
import ValueObjectException from "@/src/domain/exceptions/ValueObjectException";
import { TErrorCodes } from "@/src/domain/exceptions/BaseException";

describe("ValueObjectException", () => {
    test("throw lança erro 'ValueObjectException'", () => {
        const valueObjectException = new ValueObjectException()

        expect(() => {throw valueObjectException}).toThrow(ValueObjectException)
    })

    test("o lançamento do erro retorna uma mensagem de erro", () => { 
        const valueObjectException = new ValueObjectException("Valor não corresponde ao esperado")

        expect(() => {throw valueObjectException}).toThrow("Valor não corresponde ao esperado")
    })

    test("caso não seja passado nenhum parâmetro para o construtor, o erro lançado retorna uma mensagem padrão", () => { 
        const valueObjectException = new ValueObjectException()

        expect(() => {throw valueObjectException}).toThrow("O valor fornecido não é válido")
    })

    test("código de erro corresponde à exception", () => { 
        const valueObjectException = new ValueObjectException()

        expect(valueObjectException.errorCode).toBe(TErrorCodes.ERR_VALUE_OBJECT)
    })
})