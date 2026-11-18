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

    get id(): UUID | undefined {
        return this._id
    }

    get created_at(): Date | undefined {
        return this._created_at
    }

    set created_at(new_created_at: Date) {
        const notNullValidate = notNullValidator.validate("created_at", new_created_at)
        if (notNullValidate) throw new ValidatorException([notNullValidate])

        const currentDateValidate = currentDateValidator.validate("created_at", new_created_at)
        if (currentDateValidate) throw new ValidatorException([currentDateValidate])

        this._created_at = new_created_at
    }

    get updated_at(): Date | undefined {
        return this._updated_at
    }

    set updated_at(new_updated_at: Date) {
        const notNullValidate = notNullValidator.validate("updated_at", new_updated_at)
        if (notNullValidate) throw new ValidatorException([notNullValidate])

        const currentDateValidate = currentDateValidator.validate("updated_at", new_updated_at)
        if (currentDateValidate) throw new ValidatorException([currentDateValidate])

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