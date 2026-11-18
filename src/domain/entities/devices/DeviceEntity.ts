// Entities
import BaseEntity from "../mixins/BaseEntity";

// Exceptions
import ValidatorException from "../../exceptions/ValidatorException";

// Validators
import notNullValidator from "../../validators/NotNullValidator";

// Value Objects
import UUID from "../../valueObjects/UUID";

// Enuns
import type { DevicesTypes } from "../enums/DevicesTypes";

class Device extends BaseEntity {
    private _name: string | undefined;
    private _ip: string | undefined;
    private _mask: string | undefined;
    private _room_id: UUID | null | undefined;
    private _type: DevicesTypes | undefined;

    public static create<T extends Device>(
        this: new () => T,
        name: string,
        ip: string,
        mask: string,
        room_id: UUID | null,
        type: DevicesTypes,
        created_by: UUID | null,
        updated_by: UUID | null,
    ): T {
        const instance = new this();

        const dateNow = new Date();

        instance.created_at = dateNow;
        instance.updated_at = dateNow;
        instance.created_by = created_by;
        instance.updated_by = updated_by;
        instance.name = name;
        instance.ip = ip;
        instance.mask = mask;
        instance.room_id = room_id;
        instance.type = type;

        return instance;
    }

    public static reconstruct<T extends Device>(
        this: new () => T,
        id: UUID,
        name: string,
        ip: string,
        mask: string,
        room_id: UUID | null,
        type: DevicesTypes,
        created_at: Date,
        updated_at: Date,
        created_by: UUID | null,
        updated_by: UUID | null,
    ): T {
        const instance = new this();

        instance._id = id;
        instance._created_at = created_at;
        instance._updated_at = updated_at;
        instance._created_by = created_by;
        instance._updated_by = updated_by;
        instance._name = name;
        instance._ip = ip;
        instance._mask = mask;
        instance._room_id = room_id;
        instance._type = type;

        return instance;
    }

    get name(): string | undefined {
        return this._name;
    }

    set name(new_name: string) {
        const notNullValidate = notNullValidator.validate("name", new_name);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._name = new_name;
    }

    get ip(): string | undefined {
        return this._ip;
    }

    set ip(new_ip: string) {
        const notNullValidate = notNullValidator.validate("ip", new_ip);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._ip = new_ip;
    }

    get mask(): string | undefined {
        return this._mask;
    }

    set mask(new_mask: string) {
        const notNullValidate = notNullValidator.validate("mask", new_mask);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._mask = new_mask;
    }

    get room_id(): UUID | null | undefined {
        return this._room_id;
    }

    set room_id(new_room_id: UUID | null) {
        this._room_id = new_room_id;
    }

    get type(): DevicesTypes | undefined {
        return this._type;
    }

    set type(new_type: DevicesTypes) {
        const notNullValidate = notNullValidator.validate("type", new_type);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._type = new_type;
    }
}

export default Device;