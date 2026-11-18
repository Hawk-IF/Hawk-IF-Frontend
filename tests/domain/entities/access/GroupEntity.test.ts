import { describe, test, expect, beforeEach } from "vitest";
import Group from "@/src/domain/entities/access/GroupEntity";
import {
    makeGroupData,
    makeGroupCreateArgs,
    makeGroupReconstructArgs
} from "./GroupEntity.mock";

describe("Group", () => {
    let groupCreate: Group;
    let groupReconstruct: Group;

    beforeEach(() => {
        groupCreate = Group.create(...makeGroupCreateArgs());
        groupReconstruct = Group.reconstruct(...makeGroupReconstructArgs());
    });

    describe("create", () => {
        test("deve criar uma instância de Group", () => {
            expect(groupCreate).toBeInstanceOf(Group);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedGroupData = makeGroupData();

            expect(groupCreate.created_at).toBeInstanceOf(Date);
            expect(groupCreate.updated_at).toBeInstanceOf(Date);
            expect(groupCreate.created_by).toEqual(expectedGroupData.created_by);
            expect(groupCreate.updated_by).toEqual(expectedGroupData.updated_by);
            expect(groupCreate.name).toBe(expectedGroupData.name);
        });

        test("deve inicializar created_at e updated_at com a mesma instância de Date", () => {
            expect(groupCreate.created_at).toBe(groupCreate.updated_at);
        });
    });

    describe("reconstruct", () => {
        test("deve reconstruir uma instância de Group", () => {
            expect(groupReconstruct).toBeInstanceOf(Group);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedGroupData = makeGroupData();

            expect(groupReconstruct.id).toEqual(expectedGroupData.id);
            expect(groupReconstruct.created_at).toEqual(expectedGroupData.created_at);
            expect(groupReconstruct.updated_at).toEqual(expectedGroupData.updated_at);
            expect(groupReconstruct.created_by).toEqual(expectedGroupData.created_by);
            expect(groupReconstruct.updated_by).toEqual(expectedGroupData.updated_by);
            expect(groupReconstruct.name).toBe(expectedGroupData.name);
        });
    });

    describe("name", () => {
        test("deve definir name pelo setter", () => {
            const cleanGroup = new Group();
            const name = "Grupo de Teste";

            cleanGroup.name = name;

            expect(cleanGroup.name).toBe(name);
        });

        test("deve lançar ValidatorException quando name for null", () => {
            const cleanGroup = new Group();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanGroup.name = null as any;
            }).toThrow();
        });
    });
});
