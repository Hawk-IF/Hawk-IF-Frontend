// Entities
import BaseEntity from "../mixins/BaseEntity";

// Exceptions
import ValidatorException from "../../exceptions/ValidatorException";

// Validators
import notNullValidator from "../../validators/NotNullValidator";

// Value Objects
import UUID from "../../valueObjects/UUID";

class Group extends BaseEntity {
    private _name: string | undefined;

    public static create<T extends Group>(
        this: new () => T,
        name: string,
        created_by: UUID | null,
        updated_by: UUID | null,
    ): T {
        const instance = new this()

        const dateNow = new Date()

        instance.created_at = dateNow
        instance.updated_at = dateNow
        instance.created_by = created_by
        instance.updated_by = updated_by
        instance.name = name

        return instance
    }

    public static reconstruct<T extends Group>(
        this: new () => T,
        id: UUID,
        name: string,
        created_at: Date,
        updated_at: Date,
        created_by: UUID | null,
        updated_by: UUID | null,
    ): T { 
        const instance = new this()

        instance._id = id
        instance._created_at = created_at
        instance._updated_at = updated_at
        instance._created_by = created_by
        instance._updated_by = updated_by
        instance._name = name

        return instance
    }

    get name(): string | undefined {
        return this._name;
    }

    set name(new_name: string) {
        const notNullValidate = notNullValidator.validate("name", new_name);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._name = new_name;
    }
}

export default Group;