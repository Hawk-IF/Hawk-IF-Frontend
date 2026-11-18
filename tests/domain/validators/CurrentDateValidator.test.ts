import { describe, test, expect, beforeEach, vi } from "vitest";
import currentDateValidator from "@domain/validators/CurrentDateValidator";

describe("currentDateValidator", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    test(("caso diferença entre os tempos seja menor que 1 segundo é válido"), () => {
        const date = new Date()
        const validateResult = currentDateValidator.validate("currentDateValidator", date)
        
        expect(validateResult).toBeUndefined()
        
        vi.advanceTimersByTime(999)
        const validateResult2 = currentDateValidator.validate("currentDateValidator", date)
        expect(validateResult2).toBeUndefined()
    })

    test(("caso diferença entre os tempos seja igual que 1 segundo é válido"), () => {
        const date = new Date()
        vi.advanceTimersByTime(1000)

        const validateResult = currentDateValidator.validate("currentDateValidator", date)

        expect(validateResult).toBeUndefined()
    })

    test(("caso diferença entre os tempos seja maior que 1 segundo não é válido"), () => {
        const date = new Date()
        vi.advanceTimersByTime(1001)

        const validateResult = currentDateValidator.validate("currentDateValidator", date)

        expect(validateResult).toStrictEqual({
            field: "currentDateValidator", 
            message: "A data fornecida não corresponde ao momento atual."
        })
    })
})