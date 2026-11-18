import { describe, test, expect, beforeEach } from "vitest";
import Campus from "@/src/domain/entities/locations/CampusEntity";
import {
    makeCampusData,
    makeCampusCreateArgs,
    makeCampusReconstructArgs,
} from "./CampusEntity.mock";
import UUID from "@/src/domain/valueObjects/UUID";

describe("Campus", () => {
    let campusCreate: Campus;
    let campusReconstruct: Campus;

    beforeEach(() => {
        campusCreate = Campus.create(...makeCampusCreateArgs());
        campusReconstruct = Campus.reconstruct(...makeCampusReconstructArgs());
    });

    describe("create", () => {
        test("deve criar uma instância de Campus", () => {
            expect(campusCreate).toBeInstanceOf(Campus);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedCampusData = makeCampusData();

            expect(campusCreate.created_at).toBeInstanceOf(Date);
            expect(campusCreate.updated_at).toBeInstanceOf(Date);
            expect(campusCreate.created_by).toEqual(expectedCampusData.created_by);
            expect(campusCreate.updated_by).toEqual(expectedCampusData.updated_by);
            expect(campusCreate.name).toBe(expectedCampusData.name);
            expect(campusCreate.acronym).toBe(expectedCampusData.acronym);
            expect(campusCreate.institution_id).toEqual(expectedCampusData.institution_id);
        });

        test("deve inicializar created_at e updated_at com a mesma instância de Date", () => {
            expect(campusCreate.created_at).toBe(campusCreate.updated_at);
        });
    });

    describe("reconstruct", () => {
        test("deve reconstruir uma instância de Campus", () => {
            expect(campusReconstruct).toBeInstanceOf(Campus);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedCampusData = makeCampusData();

            expect(campusReconstruct.id).toEqual(expectedCampusData.id);
            expect(campusReconstruct.created_at).toEqual(expectedCampusData.created_at);
            expect(campusReconstruct.updated_at).toEqual(expectedCampusData.updated_at);
            expect(campusReconstruct.created_by).toEqual(expectedCampusData.created_by);
            expect(campusReconstruct.updated_by).toEqual(expectedCampusData.updated_by);
            expect(campusReconstruct.name).toBe(expectedCampusData.name);
            expect(campusReconstruct.acronym).toBe(expectedCampusData.acronym);
            expect(campusReconstruct.institution_id).toEqual(expectedCampusData.institution_id);
        });
    });

    describe("name", () => {
        test("deve definir name pelo setter", () => {
            const cleanCampus = new Campus();
            const name = "Campus Central";

            cleanCampus.name = name;

            expect(cleanCampus.name).toBe(name);
        });

        test("deve lançar ValidatorException quando name for null", () => {
            const cleanCampus = new Campus();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanCampus.name = null as any;
            }).toThrow();
        });
    });

    describe("acronym", () => {
        test("deve definir acronym pelo setter", () => {
            const cleanCampus = new Campus();
            const acronym = "CC";

            cleanCampus.acronym = acronym;

            expect(cleanCampus.acronym).toBe(acronym);
        });

        test("deve lançar ValidatorException quando acronym for null", () => {
            const cleanCampus = new Campus();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanCampus.acronym = null as any;
            }).toThrow();
        });
    });

    describe("institution_id", () => {
        test("deve definir institution_id pelo setter", () => {
            const cleanCampus = new Campus();
            const institution_id = new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479");

            cleanCampus.institution_id = institution_id;

            expect(cleanCampus.institution_id).toBe(institution_id);
        });

        test("deve lançar ValidatorException quando institution_id for null", () => {
            const cleanCampus = new Campus();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanCampus.institution_id = null as any;
            }).toThrow();
        });
    });
});
