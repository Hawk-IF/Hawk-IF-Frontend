// Entities
import BaseEntity from "../mixins/BaseEntity";

// Exceptions
import ValidatorException from "../../exceptions/ValidatorException";

// Validators
import notNullValidator from "../../validators/NotNullValidator";

// Value Objects
import UUID from "../../valueObjects/UUID";

class Section extends BaseEntity {
    private _name: string | undefined;
    private _campus_id: UUID | undefined;

    public static create<T extends Section>(
        this: new () => T,
        name: string,
        campus_id: UUID,
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
        instance.campus_id = campus_id;

        return instance;
    }

    public static reconstruct<T extends Section>(
        this: new () => T,
        id: UUID,
        name: string,
        campus_id: UUID,
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
        instance._campus_id = campus_id;

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

    get campus_id(): UUID | undefined {
        return this._campus_id;
    }

    set campus_id(new_campus_id: UUID) {
        const notNullValidate = notNullValidator.validate("campus_id", new_campus_id);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._campus_id = new_campus_id;
    }
}

export default Section;