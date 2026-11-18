import { describe, test, expect } from "vitest";
import notNullValidator from "@domain/validators/NotNullValidator";
import type { TErrorValidator } from "@/src/domain/exceptions/ValidatorException";

describe("notNullValidator", () => {
    test("caso valor seja difrente de null não retorna erro", () => {
        const validateResultString = notNullValidator.validate("notNullValidator", "string")
        const validateResultNumber = notNullValidator.validate("notNullValidator", 0)
        const validateResultBoolean = notNullValidator.validate("notNullValidator", true)

        const validateResults: Array<TErrorValidator | void> = [
            validateResultNumber, 
            validateResultString,
            validateResultBoolean
        ]

        for (const validateResult of validateResults) {
            expect(validateResult).toBeUndefined()
        }
    })

    test("caso valor seja null retorna erro", () => {
        const validateResult = notNullValidator.validate("notNullValidator", null)

        expect(validateResult).toStrictEqual({
            field: "notNullValidator",
            message: "O valor não pode ser nulo."
        })
    })
})