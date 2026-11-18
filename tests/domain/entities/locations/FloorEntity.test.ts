import { describe, test, expect, beforeEach } from "vitest";
import Floor from "@/src/domain/entities/locations/FloorEntity";
import {
    makeFloorData,
    makeFloorCreateArgs,
    makeFloorReconstructArgs,
} from "./FloorEntity.mock";
import UUID from "@/src/domain/valueObjects/UUID";

describe("Floor", () => {
    let floorCreate: Floor;
    let floorReconstruct: Floor;

    beforeEach(() => {
        floorCreate = Floor.create(...makeFloorCreateArgs());
        floorReconstruct = Floor.reconstruct(...makeFloorReconstructArgs());
    });

    describe("create", () => {
        test("deve criar uma instância de Floor", () => {
            expect(floorCreate).toBeInstanceOf(Floor);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedFloorData = makeFloorData();

            expect(floorCreate.created_at).toBeInstanceOf(Date);
            expect(floorCreate.updated_at).toBeInstanceOf(Date);
            expect(floorCreate.created_by).toEqual(expectedFloorData.created_by);
            expect(floorCreate.updated_by).toEqual(expectedFloorData.updated_by);
            expect(floorCreate.number).toBe(expectedFloorData.number);
            expect(floorCreate.section_id).toEqual(expectedFloorData.section_id);
        });

        test("deve inicializar created_at e updated_at com a mesma instância de Date", () => {
            expect(floorCreate.created_at).toBe(floorCreate.updated_at);
        });
    });

    describe("reconstruct", () => {
        test("deve reconstruir uma instância de Floor", () => {
            expect(floorReconstruct).toBeInstanceOf(Floor);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedFloorData = makeFloorData();

            expect(floorReconstruct.id).toEqual(expectedFloorData.id);
            expect(floorReconstruct.created_at).toEqual(expectedFloorData.created_at);
            expect(floorReconstruct.updated_at).toEqual(expectedFloorData.updated_at);
            expect(floorReconstruct.created_by).toEqual(expectedFloorData.created_by);
            expect(floorReconstruct.updated_by).toEqual(expectedFloorData.updated_by);
            expect(floorReconstruct.number).toBe(expectedFloorData.number);
            expect(floorReconstruct.section_id).toEqual(expectedFloorData.section_id);
        });
    });

    describe("number", () => {
        test("deve definir number pelo setter", () => {
            const cleanFloor = new Floor();
            const number = 2;

            cleanFloor.number = number;

            expect(cleanFloor.number).toBe(number);
        });
    });

    describe("section_id", () => {
        test("deve definir section_id pelo setter", () => {
            const cleanFloor = new Floor();
            const section_id = new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479");

            cleanFloor.section_id = section_id;

            expect(cleanFloor.section_id).toBe(section_id);
        });

        test("deve lançar ValidatorException quando section_id for null", () => {
            const cleanFloor = new Floor();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanFloor.section_id = null as any;
            }).toThrow();
        });
    });
});
