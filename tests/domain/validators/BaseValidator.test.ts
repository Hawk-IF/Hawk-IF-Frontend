import { describe, test, expect } from "vitest";
import { type TErrorValidator } from "@domain/exceptions/ValidatorException";
import BaseValidator from "@domain/validators/BaseValidator";

class FakeValidator extends BaseValidator {
    public validate(field: string, value: string): TErrorValidator | void {
        if (value.includes("NotFakeValidator")) return {
            field: field,
            message: "Valor não corresponde ao esperado."
        }
    }
}

const fakeValidator = new FakeValidator()

describe("BaseValidator", () => {
    test(("ao passar pela validação não retorna nenhum erro"), () => {
        expect(fakeValidator.validate("BaseValidator", "FakeValidator")).toBeUndefined()
    })

    test(("ao não passar pela validação retorna erro"), () => {
        expect(fakeValidator.validate("BaseValidator", "NotFakeValidator")).toStrictEqual({
            field: "BaseValidator",
            message: "Valor não corresponde ao esperado."
        })
    })
})