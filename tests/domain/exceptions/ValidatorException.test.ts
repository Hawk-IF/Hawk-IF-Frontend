import { describe, test, expect } from "vitest";
import ValidatorException, { type TErrorValidator } from "@/src/domain/exceptions/ValidatorException";
import { TErrorCodes } from "@/src/domain/exceptions/BaseException";

const FakeErros: TErrorValidator[] = [
    {field: "FakeField_1", message: "FakeMessage_1"},
    {field: "FakeField_2", message: "FakeMessage_2"}
]

describe("ValidatorException", () => {
    test("throw lança erro 'ValidationException'", () => {
        const validatorException = new ValidatorException()

        expect(() => {throw validatorException}).toThrow(ValidatorException)
    })

    test("o lançamento do erro retorna as mensagens do erro concatedanas ao serem passadas no construtor", () => { 
        const validatorException = new ValidatorException(FakeErros, "Erro na validação")

        expect(() => {throw validatorException})
            .toThrow("Erro na validação - FakeField_1: FakeMessage_1 | FakeField_2: FakeMessage_2")
    })

    test("caso não seja passado nenhum parâmetro para o construtor, o erro lançado retorna uma mensagem padrão", () => { 
        const validatorException = new ValidatorException()

        expect(() => {throw validatorException}).toThrow("Falha na validação.")
    })

    test("código de erro corresponde à exception", () => { 
        const validatorException = new ValidatorException()

        expect(validatorException.errorCode).toBe(TErrorCodes.ERR_VALIDATOR)
    })
})