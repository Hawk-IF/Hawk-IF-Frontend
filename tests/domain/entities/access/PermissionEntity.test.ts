import { describe, test, expect, beforeEach } from "vitest";
import Permission from "@/src/domain/entities/access/PermissionEntity";
import {
    makePermissionData,
    makePermissionCreateArgs,
    makePermissionReconstructArgs
} from "./PermissionEntity.mock";

describe("Permission", () => {
    let permissionCreate: Permission;
    let permissionReconstruct: Permission;

    beforeEach(() => {
        permissionCreate = Permission.create(...makePermissionCreateArgs());
        permissionReconstruct = Permission.reconstruct(...makePermissionReconstructArgs());
    });

    describe("create", () => {
        test("deve criar uma instância de Permission", () => {
            expect(permissionCreate).toBeInstanceOf(Permission);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedPermissionData = makePermissionData();

            expect(permissionCreate.created_at).toBeInstanceOf(Date);
            expect(permissionCreate.updated_at).toBeInstanceOf(Date);
            expect(permissionCreate.created_by).toEqual(expectedPermissionData.created_by);
            expect(permissionCreate.updated_by).toEqual(expectedPermissionData.updated_by);
            expect(permissionCreate.name).toBe(expectedPermissionData.name);
        });

        test("deve inicializar created_at e updated_at com a mesma instância de Date", () => {
            expect(permissionCreate.created_at).toBe(permissionCreate.updated_at);
        });
    });

    describe("reconstruct", () => {
        test("deve reconstruir uma instância de Permission", () => {
            expect(permissionReconstruct).toBeInstanceOf(Permission);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedPermissionData = makePermissionData();

            expect(permissionReconstruct.id).toEqual(expectedPermissionData.id);
            expect(permissionReconstruct.created_at).toEqual(expectedPermissionData.created_at);
            expect(permissionReconstruct.updated_at).toEqual(expectedPermissionData.updated_at);
            expect(permissionReconstruct.created_by).toEqual(expectedPermissionData.created_by);
            expect(permissionReconstruct.updated_by).toEqual(expectedPermissionData.updated_by);
            expect(permissionReconstruct.name).toBe(expectedPermissionData.name);
        });
    });

    describe("name", () => {
        test("deve definir name pelo setter", () => {
            const cleanPermission = new Permission();
            const name = "Gerenciar Usuários";

            cleanPermission.name = name;

            expect(cleanPermission.name).toBe(name);
        });

        test("deve lançar ValidatorException quando name for null", () => {
            const cleanPermission = new Permission();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanPermission.name = null as any;
            }).toThrow();
        });
    });
});
