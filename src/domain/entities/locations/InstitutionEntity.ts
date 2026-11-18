// Entities
import BaseEntity from "../mixins/BaseEntity";

// Exceptions
import ValidatorException from "../../exceptions/ValidatorException";

// Validators
import notNullValidator from "../../validators/NotNullValidator";

// Value Objects
import UUID from "../../valueObjects/UUID";

class Institution extends BaseEntity {
    private _name: string | undefined;
    private _acronym: string | undefined;

    public static create<T extends Institution>(
        this: new () => T,
        name: string,
        acronym: string,
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
        instance.acronym = acronym;

        return instance;
    }

    public static reconstruct<T extends Institution>(
        this: new () => T,
        id: UUID,
        name: string,
        acronym: string,
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
        instance._acronym = acronym;

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

    get acronym(): string | undefined {
        return this._acronym;
    }

    set acronym(new_acronym: string) {
        const notNullValidate = notNullValidator.validate("acronym", new_acronym);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._acronym = new_acronym;
    }
}

export default Institution;