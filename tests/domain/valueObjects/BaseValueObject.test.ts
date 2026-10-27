import { describe, test, expect } from "vitest";
import BaseValueObject from "@domain/valueObjects/BaseValueObject";
import ValueObjectException from "@domain/exceptions/ValueObjectException";
import UUID from "@/src/domain/valueObjects/UUID";

class FakeValueObject extends BaseValueObject<string> {
    protected _brand: string = "FakeValueObject";

    protected validate(value: string): string | void {
        const rgx = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

        if (!rgx.test(value)) return `O valor '${value}' não é um FakeValueObject válido.`
    }
}

class FakeValueObject2 extends BaseValueObject<string> {
    protected _brand: string = "FakeValueObject2";

    protected validate(value: string): string | void {
        const rgx = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

        if (!rgx.test(value)) return `O valor '${value}' não é um FakeValueObject2 válido.`
    }
}

type TValueObjectClass = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueObject: new (value: any) => BaseValueObject<unknown>;
    validValue: unknown;
    invalidValue: string;
    textException: string;
}

const valueObjectsClass: TValueObjectClass[] = [
    {
        valueObject: FakeValueObject,
        validValue: "test@gmail.com",
        invalidValue: "test@gmailcom",
        textException: "O valor 'test@gmailcom' não é um FakeValueObject válido."
    },
    {
        valueObject: UUID,
        validValue: "d7d5ea77-c19e-4b78-878c-b90f9983a084",
        invalidValue: "d7d5ea77-c19e-4b78-878cb90f9983a084",
        textException: "O valor 'd7d5ea77-c19e-4b78-878cb90f9983a084' não é um UUID válido."
    },
]

describe("BaseValueObject", () => {
    describe("ValueObjects",  () => {
        test.each(valueObjectsClass)("cria instância se passar por validação e permite acessar seu valor", (
            { valueObject, validValue }
        ) => {
            const valueObjectInstance = new valueObject(validValue)
    
            expect(valueObjectInstance.value).toBe(validValue)
        })
    
        test.each(valueObjectsClass)("gera uma exceção 'ValueObjectException' caso não passe pela validação", (
            { valueObject, invalidValue, textException }
        ) => {
            expect(() => new valueObject(invalidValue)).toThrow(
                new ValueObjectException(textException)
            )
        })
    })

    test("retorna 'true' caso duas instâncias de classes e valores iguais sejam igualhadas", () => {
        const emailTest1 = new FakeValueObject("test@gmail.com")
        const emailTest2 = new FakeValueObject("test@gmail.com")

        expect(emailTest1).toEqual(emailTest2)
    })

    test("retorna 'false' caso duas instâncias de uma mesma classe e com valores diferentes sejam igualhadas", () => {
        const emailTest1 = new FakeValueObject("test@gmail.com")
        const emailTest2 = new FakeValueObject("test2@gmail.com")

        expect(emailTest1).not.toEqual(emailTest2)
    })

    test("retorna 'false' caso duas instâncias de classes diferentes (marcas distintas) e valores iguais sejam igualhadas", () => {
        const emailTest1 = new FakeValueObject("test@gmail.com")
        const emailTest2 = new FakeValueObject2("test@gmail.com")

        expect(emailTest1).not.toEqual(emailTest2)
    })
})