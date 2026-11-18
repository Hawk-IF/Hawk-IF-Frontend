// Entities
import BaseEntity from "../mixins/BaseEntity";

// Exceptions
import ValidatorException from "../../exceptions/ValidatorException";

// Validators
import notNullValidator from "../../validators/NotNullValidator";

// Value Objects
import UUID from "../../valueObjects/UUID";

class Campus extends BaseEntity {
    private _name: string | undefined;
    private _acronym: string | undefined;
    private _institution_id: UUID | undefined;

    public static create<T extends Campus>(
        this: new () => T,
        name: string,
        acronym: string,
        institution_id: UUID,
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
        instance.institution_id = institution_id;

        return instance;
    }

    public static reconstruct<T extends Campus>(
        this: new () => T,
        id: UUID,
        name: string,
        acronym: string,
        institution_id: UUID,
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
        instance._institution_id = institution_id;

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

    get institution_id(): UUID | undefined {
        return this._institution_id;
    }

    set institution_id(new_institution_id: UUID) {
        const notNullValidate = notNullValidator.validate("institution_id", new_institution_id);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._institution_id = new_institution_id;
    }
}

export default Campus;