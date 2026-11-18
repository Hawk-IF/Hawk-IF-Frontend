import BaseValueObject from "./BaseValueObject";

type TEmail = `${string}@${string}`

class Email extends BaseValueObject<TEmail> {
    protected _brand: string = "EMAIL";

    protected validate(value: TEmail): string | void {
        const rgx = new RegExp(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        );

        if (!rgx.test(value)) return `O valor '${value}' não é um Email válido.`
    }
}

export default Email