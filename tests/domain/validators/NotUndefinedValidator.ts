import { describe, test, expect } from "vitest";
import notUndefinedValidator from "@domain/validators/NotUndefinedValidator";
import type { TErrorValidator } from "@/src/domain/exceptions/ValidatorException";

describe("notUndefinedValidator", () => {
    test("caso valor seja difrente de 'undefined não retorna erro", () => {
        const validateResultString = notUndefinedValidator.validate("notUndefinedValidator", "string")
        const validateResultNumber = notUndefinedValidator.validate("notUndefinedValidator", 0)
        const validateResultBoolean = notUndefinedValidator.validate("notUndefinedValidator", true)
        const validateResultNull = notUndefinedValidator.validate("notUndefinedValidator", null)

        const validateResults: Array<TErrorValidator | void> = [
            validateResultNumber, 
            validateResultString,
            validateResultBoolean,
            validateResultNull
        ]

        for (const validateResult of validateResults) {
            expect(validateResult).toBeUndefined()
        }
    })

    test("caso valor seja 'undefined' retorna erro", () => {
        const validateResult = notUndefinedValidator.validate("notUndefinedValidator", undefined)

        expect(validateResult).toStrictEqual({
            field: "notUndefinedValidator",
            message: "O valor não pode ser indefinido."
        })
    })
})