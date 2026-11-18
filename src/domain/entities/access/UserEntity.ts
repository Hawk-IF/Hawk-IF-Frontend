// Entities
import BaseEntity from "../mixins/BaseEntity";

// Exceptions
import ValidatorException from "../../exceptions/ValidatorException";

// Validators
import notNullValidator from "../../validators/NotNullValidator";

// Value Objects
import Email from "../../valueObjects/Email";
import UUID from "../../valueObjects/UUID";

class User extends BaseEntity {
    private _name: string | undefined;
    private _photo_url: string | null | undefined;
    private _registration: string | undefined;
    private _email: Email | undefined;
    private _campus_id: UUID | undefined;
    private _last_login: Date | null | undefined;
    private _is_staff: boolean = false;

    public static create<T extends User>(
        this: new () => T,
        name: string,
        photo_url: string | null,
        registration: string,
        email: Email,
        campus_id: UUID,
        last_login: Date | null,
        is_staff: boolean,
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
        instance.photo_url = photo_url;
        instance.registration = registration;
        instance.email = email;
        instance.campus_id = campus_id;
        instance.last_login = last_login;
        instance.is_staff = is_staff;

        return instance;
    }

    public static reconstruct<T extends User>(
        this: new () => T,
        id: UUID,
        name: string,
        photo_url: string | null,
        registration: string,
        email: Email,
        campus_id: UUID,
        last_login: Date | null,
        is_staff: boolean,
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
        instance._photo_url = photo_url;
        instance._registration = registration;
        instance._email = email;
        instance._campus_id = campus_id;
        instance._last_login = last_login;
        instance._is_staff = is_staff;

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

    get photo_url(): string | null | undefined {
        return this._photo_url;
    }

    set photo_url(new_photo_url: string | null) {
        this._photo_url = new_photo_url;
    }

    get registration(): string | undefined {
        return this._registration;
    }

    set registration(new_registration: string) {
        const notNullValidate = notNullValidator.validate("registration", new_registration);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._registration = new_registration;
    }

    get email(): Email | undefined {
        return this._email;
    }

    set email(new_email: Email) {
        const notNullValidate = notNullValidator.validate("email", new_email);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._email = new_email;
    }

    get campus_id(): UUID | undefined {
        return this._campus_id;
    }

    set campus_id(new_campus_id: UUID) {
        const notNullValidate = notNullValidator.validate("campus_id", new_campus_id);
        if (notNullValidate) throw new ValidatorException([notNullValidate]);

        this._campus_id = new_campus_id;
    }

    get last_login(): Date | null | undefined {
        return this._last_login;
    }

    set last_login(new_last_login: Date | null) {
        this._last_login = new_last_login;
    }

    get is_staff(): boolean {
        return this._is_staff;
    }

    set is_staff(new_is_staff: boolean) {
        this._is_staff = new_is_staff;
    }
}

export default User;