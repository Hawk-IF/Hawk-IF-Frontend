import { describe, test, expect, beforeEach } from "vitest";
import Room from "@/src/domain/entities/locations/RoomEntity";
import {
    makeRoomData,
    makeRoomCreateArgs,
    makeRoomReconstructArgs,
} from "./RoomEntity.mock";
import UUID from "@/src/domain/valueObjects/UUID";
import { RoomsStatus } from "@/src/domain/entities/enums/RoomsStatus";
import { RoomsTypes } from "@/src/domain/entities/enums/RoomsTypes";

describe("Room", () => {
    let roomCreate: Room;
    let roomReconstruct: Room;

    beforeEach(() => {
        roomCreate = Room.create(...makeRoomCreateArgs());
        roomReconstruct = Room.reconstruct(...makeRoomReconstructArgs());
    });

    describe("create", () => {
        test("deve criar uma instância de Room", () => {
            expect(roomCreate).toBeInstanceOf(Room);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedRoomData = makeRoomData();

            expect(roomCreate.created_at).toBeInstanceOf(Date);
            expect(roomCreate.updated_at).toBeInstanceOf(Date);
            expect(roomCreate.created_by).toEqual(expectedRoomData.created_by);
            expect(roomCreate.updated_by).toEqual(expectedRoomData.updated_by);
            expect(roomCreate.name).toBe(expectedRoomData.name);
            expect(roomCreate.floor_id).toEqual(expectedRoomData.floor_id);
            expect(roomCreate.number).toBe(expectedRoomData.number);
            expect(roomCreate.status).toBe(expectedRoomData.status);
            expect(roomCreate.type).toBe(expectedRoomData.type);
            expect(roomCreate.capacity).toBe(expectedRoomData.capacity);
        });

        test("deve inicializar created_at e updated_at com a mesma instância de Date", () => {
            expect(roomCreate.created_at).toBe(roomCreate.updated_at);
        });
    });

    describe("reconstruct", () => {
        test("deve reconstruir uma instância de Room", () => {
            expect(roomReconstruct).toBeInstanceOf(Room);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedRoomData = makeRoomData();

            expect(roomReconstruct.id).toEqual(expectedRoomData.id);
            expect(roomReconstruct.created_at).toEqual(expectedRoomData.created_at);
            expect(roomReconstruct.updated_at).toEqual(expectedRoomData.updated_at);
            expect(roomReconstruct.created_by).toEqual(expectedRoomData.created_by);
            expect(roomReconstruct.updated_by).toEqual(expectedRoomData.updated_by);
            expect(roomReconstruct.name).toBe(expectedRoomData.name);
            expect(roomReconstruct.floor_id).toEqual(expectedRoomData.floor_id);
            expect(roomReconstruct.number).toBe(expectedRoomData.number);
            expect(roomReconstruct.status).toBe(expectedRoomData.status);
            expect(roomReconstruct.type).toBe(expectedRoomData.type);
            expect(roomReconstruct.capacity).toBe(expectedRoomData.capacity);
        });
    });

    describe("name", () => {
        test("deve definir name pelo setter", () => {
            const cleanRoom = new Room();
            const name = "Laboratório de Informática";

            cleanRoom.name = name;

            expect(cleanRoom.name).toBe(name);
        });

        test("deve lançar ValidatorException quando name for null", () => {
            const cleanRoom = new Room();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanRoom.name = null as any;
            }).toThrow();
        });
    });

    describe("floor_id", () => {
        test("deve definir floor_id pelo setter", () => {
            const cleanRoom = new Room();
            const floor_id = new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479");

            cleanRoom.floor_id = floor_id;

            expect(cleanRoom.floor_id).toBe(floor_id);
        });

        test("deve lançar ValidatorException quando floor_id for null", () => {
            const cleanRoom = new Room();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanRoom.floor_id = null as any;
            }).toThrow();
        });
    });

    describe("number", () => {
        test("deve definir number pelo setter", () => {
            const cleanRoom = new Room();
            const number = 101;

            cleanRoom.number = number;

            expect(cleanRoom.number).toBe(number);
        });

        test("deve lançar ValidatorException quando number for null", () => {
            const cleanRoom = new Room();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanRoom.number = null as any;
            }).toThrow();
        });
    });

    describe("status", () => {
        test("deve definir status pelo setter", () => {
            const cleanRoom = new Room();
            const status = RoomsStatus.FREE;

            cleanRoom.status = status;

            expect(cleanRoom.status).toBe(status);
        });

        test("deve definir como padrão o valor INACCESSIBLE", () => {
            const cleanRoom = new Room();

            expect(cleanRoom.status).toBe(RoomsStatus.INACCESSIBLE);
        });
    });

    describe("type", () => {
        test("deve definir type pelo setter", () => {
            const cleanRoom = new Room();
            const type = RoomsTypes.LABORATORY;

            cleanRoom.type = type;

            expect(cleanRoom.type).toBe(type);
        });

        test("deve definir como padrão o valor CLASSROOM", () => {
            const cleanRoom = new Room();

            expect(cleanRoom.type   ).toBe(RoomsTypes.CLASSROOM);
        });
    });

    describe("capacity", () => {
        test("deve definir capacity pelo setter", () => {
            const cleanRoom = new Room();
            const capacity = 30;

            cleanRoom.capacity = capacity;

            expect(cleanRoom.capacity).toBe(capacity);
        });

        test("deve aceitar null no setter de capacity", () => {
            const cleanRoom = new Room();

            cleanRoom.capacity = null;

            expect(cleanRoom.capacity).toBeNull();
        });
    });
});
