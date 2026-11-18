import { describe, test, expect, beforeEach } from "vitest";
import Institution from "@/src/domain/entities/locations/InstitutionEntity";
import {
    makeInstitutionData,
    makeInstitutionCreateArgs,
    makeInstitutionReconstructArgs,
} from "./InstitutionEntity.mock";

describe("Institution", () => {
    let institutionCreate: Institution;
    let institutionReconstruct: Institution;

    beforeEach(() => {
        institutionCreate = Institution.create(...makeInstitutionCreateArgs());
        institutionReconstruct = Institution.reconstruct(...makeInstitutionReconstructArgs());
    });

    describe("create", () => {
        test("deve criar uma instância de Institution", () => {
            expect(institutionCreate).toBeInstanceOf(Institution);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedInstitutionData = makeInstitutionData();

            expect(institutionCreate.created_at).toBeInstanceOf(Date);
            expect(institutionCreate.updated_at).toBeInstanceOf(Date);
            expect(institutionCreate.created_by).toEqual(expectedInstitutionData.created_by);
            expect(institutionCreate.updated_by).toEqual(expectedInstitutionData.updated_by);
            expect(institutionCreate.name).toBe(expectedInstitutionData.name);
            expect(institutionCreate.acronym).toBe(expectedInstitutionData.acronym);
        });

        test("deve inicializar created_at e updated_at com a mesma instância de Date", () => {
            expect(institutionCreate.created_at).toBe(institutionCreate.updated_at);
        });
    });

    describe("reconstruct", () => {
        test("deve reconstruir uma instância de Institution", () => {
            expect(institutionReconstruct).toBeInstanceOf(Institution);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedInstitutionData = makeInstitutionData();

            expect(institutionReconstruct.id).toEqual(expectedInstitutionData.id);
            expect(institutionReconstruct.created_at).toEqual(expectedInstitutionData.created_at);
            expect(institutionReconstruct.updated_at).toEqual(expectedInstitutionData.updated_at);
            expect(institutionReconstruct.created_by).toEqual(expectedInstitutionData.created_by);
            expect(institutionReconstruct.updated_by).toEqual(expectedInstitutionData.updated_by);
            expect(institutionReconstruct.name).toBe(expectedInstitutionData.name);
            expect(institutionReconstruct.acronym).toBe(expectedInstitutionData.acronym);
        });
    });

    describe("name", () => {
        test("deve definir name pelo setter", () => {
            const cleanInstitution = new Institution();
            const name = "Instituto Federal do Rio Grande do Norte";

            cleanInstitution.name = name;

            expect(cleanInstitution.name).toBe(name);
        });

        test("deve lançar ValidatorException quando name for null", () => {
            const cleanInstitution = new Institution();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanInstitution.name = null as any;
            }).toThrow();
        });
    });

    describe("acronym", () => {
        test("deve definir acronym pelo setter", () => {
            const cleanInstitution = new Institution();
            const acronym = "IFRN";

            cleanInstitution.acronym = acronym;

            expect(cleanInstitution.acronym).toBe(acronym);
        });

        test("deve lançar ValidatorException quando acronym for null", () => {
            const cleanInstitution = new Institution();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanInstitution.acronym = null as any;
            }).toThrow();
        });
    });
});
