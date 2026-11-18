import { describe, test, expect, beforeEach } from "vitest";
import User from "@/src/domain/entities/access/UserEntity";
import {
    makeUserData,
    makeUserCreateArgs,
    makeUserReconstructArgs
} from "./UserEntity.mock";
import UUID from "@/src/domain/valueObjects/UUID";
import Email from "@/src/domain/valueObjects/Email";

describe("User", () => {
    let userCreate: User;
    let userReconstruct: User;

    beforeEach(() => {
        userCreate = User.create(...makeUserCreateArgs());
        userReconstruct = User.reconstruct(...makeUserReconstructArgs());
    });

    describe("create", () => {
        test("deve criar uma instância de User", () => {
            expect(userCreate).toBeInstanceOf(User);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedUserData = makeUserData();

            expect(userCreate.created_at).toBeInstanceOf(Date);
            expect(userCreate.updated_at).toBeInstanceOf(Date);
            expect(userCreate.created_by).toEqual(expectedUserData.created_by);
            expect(userCreate.updated_by).toEqual(expectedUserData.updated_by);
            expect(userCreate.name).toBe(expectedUserData.name);
            expect(userCreate.photo_url).toBe(expectedUserData.photo_url);
            expect(userCreate.registration).toBe(expectedUserData.registration);
            expect(userCreate.is_staff).toBe(expectedUserData.is_staff);
            expect(userCreate.email).toEqual(expectedUserData.email);
            expect(userCreate.campus_id).toEqual(expectedUserData.campus_id);
            expect(userCreate.last_login).toEqual(expectedUserData.last_login);
        });

        test("deve inicializar created_at e updated_at com a mesma instância de Date", () => {
            expect(userCreate.created_at).toBe(userCreate.updated_at);
        });
    });

    describe("reconstruct", () => {
        test("deve reconstruir uma instância de User", () => {
            expect(userReconstruct).toBeInstanceOf(User);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedUserData = makeUserData();

            expect(userReconstruct.id).toEqual(expectedUserData.id);
            expect(userReconstruct.created_at).toEqual(expectedUserData.created_at);
            expect(userReconstruct.updated_at).toEqual(expectedUserData.updated_at);
            expect(userReconstruct.created_by).toEqual(expectedUserData.created_by);
            expect(userReconstruct.updated_by).toEqual(expectedUserData.updated_by);
            expect(userReconstruct.name).toBe(expectedUserData.name);
            expect(userReconstruct.photo_url).toBe(expectedUserData.photo_url);
            expect(userReconstruct.registration).toBe(expectedUserData.registration);
            expect(userReconstruct.email).toEqual(expectedUserData.email);
            expect(userReconstruct.campus_id).toEqual(expectedUserData.campus_id);
            expect(userReconstruct.last_login).toEqual(expectedUserData.last_login);
            expect(userReconstruct.is_staff).toBe(expectedUserData.is_staff);
        });
    });

    describe("name", () => {
        test("deve definir name pelo setter", () => {
            const cleanUser = new User();
            const name = "John Doe";

            cleanUser.name = name;

            expect(cleanUser.name).toBe(name);
        });

        test("deve lançar ValidatorException quando name for null", () => {
            const cleanUser = new User();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanUser.name = null as any;
            }).toThrow();
        });
    });

    describe("photo_url", () => {
        test("deve definir photo_url pelo setter", () => {
            const cleanUser = new User();
            const photo_url = "https://example.com/photo.png";

            cleanUser.photo_url = photo_url;

            expect(cleanUser.photo_url).toBe(photo_url);
        });

        test("deve aceitar null no setter de photo_url", () => {
            const cleanUser = new User();

            cleanUser.photo_url = null;

            expect(cleanUser.photo_url).toBeNull();
        });
    });

    describe("registration", () => {
        test("deve definir registration pelo setter", () => {
            const cleanUser = new User();
            const registration = "20241014000000";

            cleanUser.registration = registration;

            expect(cleanUser.registration).toBe(registration);
        });

        test("deve lançar ValidatorException quando registration for null", () => {
            const cleanUser = new User();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanUser.registration = null as any;
            }).toThrow();
        });
    });

    describe("email", () => {
        test("deve definir email pelo setter", () => {
            const cleanUser = new User();
            const email = new Email("user@example.com");

            cleanUser.email = email;

            expect(cleanUser.email).toBe(email);
        });

        test("deve lançar ValidatorException quando email for null", () => {
            const cleanUser = new User();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanUser.email = null as any;
            }).toThrow();
        });
    });

    describe("campus_id", () => {
        test("deve definir campus_id pelo setter", () => {
            const cleanUser = new User();
            const campus_id = new UUID("6b791d45-9d81-416d-afb4-87eefe075f4f");

            cleanUser.campus_id = campus_id;

            expect(cleanUser.campus_id).toBe(campus_id);
        });

        test("deve lançar ValidatorException quando campus_id for null", () => {
            const cleanUser = new User();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanUser.campus_id = null as any;
            }).toThrow();
        });
    });

    describe("last_login", () => {
        test("deve definir last_login pelo setter", () => {
            const cleanUser = new User();
            const last_login = new Date();

            cleanUser.last_login = last_login;

            expect(cleanUser.last_login).toBe(last_login);
        });

        test("deve aceitar null no setter de last_login", () => {
            const cleanUser = new User();

            cleanUser.last_login = null;

            expect(cleanUser.last_login).toBeNull();
        });
    });

    describe("is_staff", () => {
        test("deve definir is_staff pelo setter", () => {
            const cleanUser = new User();
            const is_staff = true;

            cleanUser.is_staff = is_staff;

            expect(cleanUser.is_staff).toBe(is_staff);
        });

        test("o valor padrão de is_staff é false", () => {
            const cleanUser = new User();

            expect(cleanUser.is_staff).toBeFalsy();
        });
    });
});