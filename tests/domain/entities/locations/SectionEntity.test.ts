import { describe, test, expect, beforeEach } from "vitest";
import Section from "@/src/domain/entities/locations/SectionEntity";
import {
    makeSectionData,
    makeSectionCreateArgs,
    makeSectionReconstructArgs,
} from "./SectionEntity.mock";
import UUID from "@/src/domain/valueObjects/UUID";

describe("Section", () => {
    let sectionCreate: Section;
    let sectionReconstruct: Section;

    beforeEach(() => {
        sectionCreate = Section.create(...makeSectionCreateArgs());
        sectionReconstruct = Section.reconstruct(...makeSectionReconstructArgs());
    });

    describe("create", () => {
        test("deve criar uma instância de Section", () => {
            expect(sectionCreate).toBeInstanceOf(Section);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedSectionData = makeSectionData();

            expect(sectionCreate.created_at).toBeInstanceOf(Date);
            expect(sectionCreate.updated_at).toBeInstanceOf(Date);
            expect(sectionCreate.created_by).toEqual(expectedSectionData.created_by);
            expect(sectionCreate.updated_by).toEqual(expectedSectionData.updated_by);
            expect(sectionCreate.name).toBe(expectedSectionData.name);
            expect(sectionCreate.campus_id).toEqual(expectedSectionData.campus_id);
        });

        test("deve inicializar created_at e updated_at com a mesma instância de Date", () => {
            expect(sectionCreate.created_at).toBe(sectionCreate.updated_at);
        });
    });

    describe("reconstruct", () => {
        test("deve reconstruir uma instância de Section", () => {
            expect(sectionReconstruct).toBeInstanceOf(Section);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedSectionData = makeSectionData();

            expect(sectionReconstruct.id).toEqual(expectedSectionData.id);
            expect(sectionReconstruct.created_at).toEqual(expectedSectionData.created_at);
            expect(sectionReconstruct.updated_at).toEqual(expectedSectionData.updated_at);
            expect(sectionReconstruct.created_by).toEqual(expectedSectionData.created_by);
            expect(sectionReconstruct.updated_by).toEqual(expectedSectionData.updated_by);
            expect(sectionReconstruct.name).toBe(expectedSectionData.name);
            expect(sectionReconstruct.campus_id).toEqual(expectedSectionData.campus_id);
        });
    });

    describe("name", () => {
        test("deve definir name pelo setter", () => {
            const cleanSection = new Section();
            const name = "Bloco Administrativo";

            cleanSection.name = name;

            expect(cleanSection.name).toBe(name);
        });

        test("deve lançar ValidatorException quando name for null", () => {
            const cleanSection = new Section();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanSection.name = null as any;
            }).toThrow();
        });
    });

    describe("campus_id", () => {
        test("deve definir campus_id pelo setter", () => {
            const cleanSection = new Section();
            const campus_id = new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479");

            cleanSection.campus_id = campus_id;

            expect(cleanSection.campus_id).toBe(campus_id);
        });

        test("deve lançar ValidatorException quando campus_id for null", () => {
            const cleanSection = new Section();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanSection.campus_id = null as any;
            }).toThrow();
        });
    });
});
