// Entities
import BaseEntity from "../mixins/BaseEntity";

// Exceptions
import ValidatorException from "../../exceptions/ValidatorException";

// Validators
import notNullValidator from "../../validators/NotNullValidator";

// Value Objects
import UUID from "../../valueObjects/UUID";

class Floor extends BaseEntity {
    private _number: number = 0;
    private _section_id: UUID | undefined;

    public static create<T extends Floor>(
        this: new () => T,
        number: number,
        section_id: UUID,
        created_by: UUID | null,
        updated_by: UUID | null,
    ): T {
        const instance = new this();

        const dateNow = new Date();

        instance.created_at = dateNow;
        instance.updated_at = dateNow;
        instance.created_by = created_by;
        instance.updated_by = updated_by;
        instance.number = number;
        instance.section_id = section_id;

        return instance;
    }

    public static reconstruct<T extends Floor>(
        this: new () => T,
        id: UUID,
        number: number,
        section_id: UUID,
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
        instance._number = number;
        instance._section_id = section_id;

        return instance;
    }

    get number(): number {
        return this._number;
    }

    set number(new_number: number) {
        this._number = new_number;
    }

    get section_id(): UUID | undefined {
        return this._section_id;
    }

    set section_id(new_section_id: UUID) {
        const notNullValidate = notNullValidator.validate("section_id", new_section_id);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._section_id = new_section_id;
    }
}

export default Floor;