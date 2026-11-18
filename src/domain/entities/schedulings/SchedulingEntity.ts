// Entities
import BaseEntity from "../mixins/BaseEntity";

// Exceptions
import ValidatorException from "../../exceptions/ValidatorException";

// Validators
import notUndefinedValidator from "../../validators/NotUndefinedValidator";
import notNullValidator from "../../validators/NotNullValidator";
import dateRangeValidator from "../../validators/DateRangeValidator";

// Value Objects
import UUID from "../../valueObjects/UUID";

class Scheduling extends BaseEntity {
    private _user_id: UUID | undefined;
    private _room_id: UUID | undefined;
    private _start_at: Date | undefined;
    private _finished_at: Date | undefined;

    public static create<T extends Scheduling>(
        this: new () => T,
        user_id: UUID,
        room_id: UUID,
        start_at: Date,
        finished_at: Date,
        created_by: UUID | null,
        updated_by: UUID | null,
    ): T {
        const instance = new this();

        const dateNow = new Date();

        instance.created_at = dateNow;
        instance.updated_at = dateNow;
        instance.created_by = created_by;
        instance.updated_by = updated_by;
        instance.user_id = user_id;
        instance.room_id = room_id;
        instance.start_at = start_at;
        instance.finished_at = finished_at;

        return instance;
    }

    public static reconstruct<T extends Scheduling>(
        this: new () => T,
        id: UUID,
        user_id: UUID,
        room_id: UUID,
        start_at: Date,
        finished_at: Date,
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
        instance._user_id = user_id;
        instance._room_id = room_id;
        instance._start_at = start_at;
        instance._finished_at = finished_at;

        return instance;
    }

    get user_id(): UUID | undefined {
        return this._user_id;
    }

    set user_id(new_user_id: UUID) {
        const notNullValidate = notNullValidator.validate("user_id", new_user_id);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._user_id = new_user_id;
    }

    get room_id(): UUID | undefined {
        return this._room_id;
    }

    set room_id(new_room_id: UUID) {
        const notNullValidate = notNullValidator.validate("room_id", new_room_id);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._room_id = new_room_id;
    }

    get start_at(): Date | undefined {
        return this._start_at;
    }

    set start_at(new_start_at: Date) {
        const notNullValidate = notNullValidator.validate("start_at", new_start_at);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._start_at = new_start_at;
    }

    get finished_at(): Date | undefined {
        return this._finished_at;
    }

    set finished_at(new_finished_at: Date) {
        const notUndefinedValidate = notUndefinedValidator.validate("start_at", this.start_at);
        if (notUndefinedValidate) throw new ValidatorException([notUndefinedValidate]);

        const notNullValidate = notNullValidator.validate("finished_at", new_finished_at);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        const dateRangeValidate = dateRangeValidator.validate("finished_at", { startDate: this.start_at as Date, endDate: new_finished_at });
        if (dateRangeValidate) throw new ValidatorException([dateRangeValidate]);

        this._finished_at = new_finished_at;
    }
}

export default Scheduling;