import { describe, test, expect, beforeEach } from "vitest";
import UserGroup from "@/src/domain/entities/access/UserGroupEntity";
import {
    makeUserGroupData,
    makeUserGroupCreateArgs,
    makeUserGroupReconstructArgs
} from "./UserGroupEntity.mock";
import UUID from "@/src/domain/valueObjects/UUID";

describe("UserGroup", () => {
    let userGroupCreate: UserGroup;
    let userGroupReconstruct: UserGroup;

    beforeEach(() => {
        userGroupCreate = UserGroup.create(...makeUserGroupCreateArgs());
        userGroupReconstruct = UserGroup.reconstruct(...makeUserGroupReconstructArgs());
    });

    describe("create", () => {
        test("deve criar uma instância de UserGroup", () => {
            expect(userGroupCreate).toBeInstanceOf(UserGroup);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedUserGroupData = makeUserGroupData();

            expect(userGroupCreate.created_at).toBeInstanceOf(Date);
            expect(userGroupCreate.updated_at).toBeInstanceOf(Date);
            expect(userGroupCreate.created_by).toEqual(expectedUserGroupData.created_by);
            expect(userGroupCreate.updated_by).toEqual(expectedUserGroupData.updated_by);
            expect(userGroupCreate.user_id).toEqual(expectedUserGroupData.user_id);
            expect(userGroupCreate.group_id).toEqual(expectedUserGroupData.group_id);
        });

        test("deve inicializar created_at e updated_at com a mesma instância de Date", () => {
            expect(userGroupCreate.created_at).toBe(userGroupCreate.updated_at);
        });
    });

    describe("reconstruct", () => {
        test("deve reconstruir uma instância de UserGroup", () => {
            expect(userGroupReconstruct).toBeInstanceOf(UserGroup);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedUserGroupData = makeUserGroupData();

            expect(userGroupReconstruct.id).toEqual(expectedUserGroupData.id);
            expect(userGroupReconstruct.created_at).toEqual(expectedUserGroupData.created_at);
            expect(userGroupReconstruct.updated_at).toEqual(expectedUserGroupData.updated_at);
            expect(userGroupReconstruct.created_by).toEqual(expectedUserGroupData.created_by);
            expect(userGroupReconstruct.updated_by).toEqual(expectedUserGroupData.updated_by);
            expect(userGroupReconstruct.user_id).toEqual(expectedUserGroupData.user_id);
            expect(userGroupReconstruct.group_id).toEqual(expectedUserGroupData.group_id);
        });
    });

    describe("user_id", () => {
        test("deve definir user_id pelo setter", () => {
            const cleanUserGroup = new UserGroup();
            const user_id = new UUID("6b791d45-9d81-416d-afb4-87eefe075f4f");

            cleanUserGroup.user_id = user_id;

            expect(cleanUserGroup.user_id).toBe(user_id);
        });

        test("deve lançar ValidatorException quando user_id for null", () => {
            const cleanUserGroup = new UserGroup();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanUserGroup.user_id = null as any;
            }).toThrow();
        });
    });

    describe("group_id", () => {
        test("deve definir group_id pelo setter", () => {
            const cleanUserGroup = new UserGroup();
            const group_id = new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479");

            cleanUserGroup.group_id = group_id;

            expect(cleanUserGroup.group_id).toBe(group_id);
        });

        test("deve lançar ValidatorException quando group_id for null", () => {
            const cleanUserGroup = new UserGroup();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanUserGroup.group_id = null as any;
            }).toThrow();
        });
    });
});
