import BaseValueObject from "./BaseValueObject";
import type { UUID as UUIDCrypto } from "crypto";

type TUUID = UUIDCrypto

class UUID extends BaseValueObject<TUUID> {
    protected _brand: string = "UUID";

    protected validate(value: TUUID): string | void {
        const rgx = new RegExp(
            "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$",
            "i",
        );

        if (!rgx.test(value)) return `O valor '${value}' não é um UUID válido.`
    }
}

export default UUID