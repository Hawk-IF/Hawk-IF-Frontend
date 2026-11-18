import { describe, test, expect, beforeEach } from "vitest";
import Device from "@/src/domain/entities/devices/DeviceEntity";
import {
    makeDeviceData,
    makeDeviceCreateArgs,
    makeDeviceReconstructArgs
} from "./DeviceEntity.mock";
import UUID from "@/src/domain/valueObjects/UUID";
import { DevicesTypes } from "@/src/domain/entities/enums/DevicesTypes";

describe("Device", () => {
    let deviceCreate: Device;
    let deviceReconstruct: Device;

    beforeEach(() => {
        deviceCreate = Device.create(...makeDeviceCreateArgs());
        deviceReconstruct = Device.reconstruct(...makeDeviceReconstructArgs());
    });

    describe("create", () => {
        test("deve criar uma instância de Device", () => {
            expect(deviceCreate).toBeInstanceOf(Device);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedDeviceData = makeDeviceData();

            expect(deviceCreate.created_at).toBeInstanceOf(Date);
            expect(deviceCreate.updated_at).toBeInstanceOf(Date);
            expect(deviceCreate.created_by).toEqual(expectedDeviceData.created_by);
            expect(deviceCreate.updated_by).toEqual(expectedDeviceData.updated_by);
            expect(deviceCreate.name).toBe(expectedDeviceData.name);
            expect(deviceCreate.ip).toBe(expectedDeviceData.ip);
            expect(deviceCreate.mask).toBe(expectedDeviceData.mask);
            expect(deviceCreate.room_id).toEqual(expectedDeviceData.room_id);
            expect(deviceCreate.type).toBe(expectedDeviceData.type);
        });

        test("deve inicializar created_at e updated_at com a mesma instância de Date", () => {
            expect(deviceCreate.created_at).toBe(deviceCreate.updated_at);
        });
    });

    describe("reconstruct", () => {
        test("deve reconstruir uma instância de Device", () => {
            expect(deviceReconstruct).toBeInstanceOf(Device);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedDeviceData = makeDeviceData();

            expect(deviceReconstruct.id).toEqual(expectedDeviceData.id);
            expect(deviceReconstruct.created_at).toEqual(expectedDeviceData.created_at);
            expect(deviceReconstruct.updated_at).toEqual(expectedDeviceData.updated_at);
            expect(deviceReconstruct.created_by).toEqual(expectedDeviceData.created_by);
            expect(deviceReconstruct.updated_by).toEqual(expectedDeviceData.updated_by);
            expect(deviceReconstruct.name).toBe(expectedDeviceData.name);
            expect(deviceReconstruct.ip).toBe(expectedDeviceData.ip);
            expect(deviceReconstruct.mask).toBe(expectedDeviceData.mask);
            expect(deviceReconstruct.room_id).toEqual(expectedDeviceData.room_id);
            expect(deviceReconstruct.type).toBe(expectedDeviceData.type);
        });
    });

    describe("name", () => {
        test("deve definir name pelo setter", () => {
            const cleanDevice = new Device();
            const name = "Sensor de Presença";

            cleanDevice.name = name;

            expect(cleanDevice.name).toBe(name);
        });

        test("deve lançar ValidatorException quando name for null", () => {
            const cleanDevice = new Device();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanDevice.name = null as any;
            }).toThrow();
        });
    });

    describe("ip", () => {
        test("deve definir ip pelo setter", () => {
            const cleanDevice = new Device();
            const ip = "192.168.0.100";

            cleanDevice.ip = ip;

            expect(cleanDevice.ip).toBe(ip);
        });

        test("deve lançar ValidatorException quando ip for null", () => {
            const cleanDevice = new Device();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanDevice.ip = null as any;
            }).toThrow();
        });
    });

    describe("mask", () => {
        test("deve definir mask pelo setter", () => {
            const cleanDevice = new Device();
            const mask = "255.255.255.0";

            cleanDevice.mask = mask;

            expect(cleanDevice.mask).toBe(mask);
        });

        test("deve lançar ValidatorException quando mask for null", () => {
            const cleanDevice = new Device();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanDevice.mask = null as any;
            }).toThrow();
        });
    });

    describe("room_id", () => {
        test("deve definir room_id pelo setter", () => {
            const cleanDevice = new Device();
            const room_id = new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479");

            cleanDevice.room_id = room_id;

            expect(cleanDevice.room_id).toBe(room_id);
        });

        test("deve aceitar null no setter de room_id", () => {
            const cleanDevice = new Device();

            cleanDevice.room_id = null;

            expect(cleanDevice.room_id).toBeNull();
        });
    });

    describe("type", () => {
        test("deve definir type pelo setter", () => {
            const cleanDevice = new Device();
            const type = DevicesTypes.SENSORS;

            cleanDevice.type = type;

            expect(cleanDevice.type).toBe(type);
        });

        test("deve lançar ValidatorException quando type for null", () => {
            const cleanDevice = new Device();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanDevice.type = null as any;
            }).toThrow();
        });
    });
});
