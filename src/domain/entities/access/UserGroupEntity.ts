// Entities
import BaseEntity from "../mixins/BaseEntity";

// Exceptions
import ValidatorException from "../../exceptions/ValidatorException";

// Validators
import notNullValidator from "../../validators/NotNullValidator";

// Value Objects
import UUID from "../../valueObjects/UUID";

class UserGroup extends BaseEntity {
    private _user_id: UUID | undefined;
    private _group_id: UUID | undefined;

    public static create<T extends UserGroup>(
        this: new () => T,
        user_id: UUID,
        group_id: UUID,
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
        instance.group_id = group_id;

        return instance;
    }

    public static reconstruct<T extends UserGroup>(
        this: new () => T,
        id: UUID,
        user_id: UUID,
        group_id: UUID,
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
        instance._group_id = group_id;

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

    get group_id(): UUID | undefined {
        return this._group_id;
    }

    set group_id(new_group_id: UUID) {
        const notNullValidate = notNullValidator.validate("group_id", new_group_id);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._group_id = new_group_id;
    }
}

export default UserGroup;