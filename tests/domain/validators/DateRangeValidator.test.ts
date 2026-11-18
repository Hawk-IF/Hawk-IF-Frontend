import { describe, test, expect } from "vitest";
import dateRangeValidator from "@domain/validators/DateRangeValidator";

describe("dateRangeValidator", () => {
    test(("caso a data final seja maior que a data inicial não retorna erro"), () => {
        const validateResult = dateRangeValidator.validate("dateRangeValidator", {
            startDate: new Date("2026-11-16"), 
            endDate: new Date("2026-11-17")
        })
        
        expect(validateResult).toBeUndefined()
    })

    test(("caso a data final seja igual que a data inicial retorna erro"), () => {
        const validateResult = dateRangeValidator.validate("dateRangeValidator", {
            startDate: new Date(), 
            endDate: new Date()
        })

        expect(validateResult).toStrictEqual({
            field: "dateRangeValidator", 
            message: "A data de término não pode ser anterior ou igual à data de início."
        })
    })

    test(("caso a data final seja menor que a data inicial retorna erro"), () => {
        const validateResult = dateRangeValidator.validate("dateRangeValidator", {
            startDate: new Date("2026-11-16"), 
            endDate: new Date("2026-11-15")
        })

        expect(validateResult).toStrictEqual({
            field: "dateRangeValidator", 
            message: "A data de término não pode ser anterior ou igual à data de início."
        })
    })
})