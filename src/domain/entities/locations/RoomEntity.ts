// Entities
import BaseEntity from "../mixins/BaseEntity";

// Exceptions
import ValidatorException from "../../exceptions/ValidatorException";

// Validators
import notNullValidator from "../../validators/NotNullValidator";

// Value Objects
import UUID from "../../valueObjects/UUID";

// Enuns
import { RoomsStatus } from "../enums/RoomsStatus";
import { RoomsTypes } from "../enums/RoomsTypes";

class Room extends BaseEntity {
    private _name: string | undefined;
    private _floor_id: UUID | undefined;
    private _number: number | undefined;
    private _status: RoomsStatus = RoomsStatus.INACCESSIBLE;
    private _type: RoomsTypes = RoomsTypes.CLASSROOM;
    private _capacity: number | null | undefined;

    public static create<T extends Room>(
        this: new () => T,
        name: string,
        floor_id: UUID,
        number: number,
        status: RoomsStatus,
        type: RoomsTypes,
        capacity: number,
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
        instance.floor_id = floor_id;
        instance.number = number;
        instance.status = status;
        instance.type = type;
        instance.capacity = capacity;

        return instance;
    }

    public static reconstruct<T extends Room>(
        this: new () => T,
        id: UUID,
        name: string,
        floor_id: UUID,
        number: number,
        status: RoomsStatus,
        type: RoomsTypes,
        capacity: number,
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
        instance._floor_id = floor_id;
        instance._number = number;
        instance._status = status;
        instance._type = type;
        instance._capacity = capacity;

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

    get floor_id(): UUID | undefined {
        return this._floor_id;
    }

    set floor_id(new_floor_id: UUID) {
        const notNullValidate = notNullValidator.validate("floor_id", new_floor_id);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._floor_id = new_floor_id;
    }

    get number(): number | undefined {
        return this._number;
    }

    set number(new_number: number) {
        const notNullValidate = notNullValidator.validate("number", new_number);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._number = new_number;
    }

    get status(): RoomsStatus {
        return this._status;
    }

    set status(new_status: RoomsStatus) {
        this._status = new_status;
    }

    get type(): RoomsTypes {
        return this._type;
    }

    set type(new_type: RoomsTypes) {
        this._type = new_type;
    }

    get capacity(): number | null | undefined {
        return this._capacity;
    }

    set capacity(new_capacity: number | null) {
        this._capacity = new_capacity;
    }
}

export default Room;