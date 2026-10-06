// Value Objects
import UUID from "../../valueObjects/UUID"

// Exceptions
import ValidatorException from "../../exceptions/ValidatorException"

// Validators
import currentDateValidator from "../../validators/CurrentDateValidator"
import notNullValidator from "../../validators/NotNullValidator"

abstract class BaseEntity {
    protected _id: UUID | undefined
    protected _created_at: Date | undefined
    protected _updated_at: Date | undefined
    protected _created_by: UUID | null | undefined
    protected _updated_by: UUID | null | undefined

    protected constructor() {}

    public static create<T extends BaseEntity>(
        this: new () => T,
        created_by: UUID | null,
        updated_by: UUID | null,
    ): T {
        const instance = new this()

        const dateNow = new Date()

        instance.created_at = dateNow
        instance.updated_at = dateNow
        instance.created_by = created_by
        instance.updated_by = updated_by

        return instance
    }

    public static reconstruct<T extends BaseEntity>(
        this: new () => T,
        id: UUID,
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

        return instance
    }
    get id(): UUID | undefined {
        return this._id
    }

    get created_at(): Date | undefined {
        return this._created_at
    }

    set created_at(new_created_at: Date) {
        const currentDateValidate = currentDateValidator.validate("created_at", new_created_at)
        if (currentDateValidate) throw new ValidatorException([currentDateValidate])

        const notNullValidate = notNullValidator.validate("created_at", new_created_at)
        if (notNullValidate) throw new ValidatorException([notNullValidate])

        this._created_at = new_created_at
    }

    get updated_at(): Date | undefined {
        return this._updated_at
    }

    set updated_at(new_updated_at: Date) {
        const currentDateValidate = currentDateValidator.validate("updated_at", new_updated_at)
        if (currentDateValidate) throw new ValidatorException([currentDateValidate])

        const notNullValidate = notNullValidator.validate("updated_at", new_updated_at)
        if (notNullValidate) throw new ValidatorException([notNullValidate])

        this._updated_at = new_updated_at
    }

    get created_by(): UUID | null | undefined {
        return this._created_by
    }

    set created_by(new_created_by: UUID | null) {
        this._created_by = new_created_by
    }

    get updated_by(): UUID | null | undefined {
        return this._updated_by
    }

    set updated_by(new_updated_by: UUID | null) {
        this._updated_by = new_updated_by
    }
 }

export default BaseEntity 