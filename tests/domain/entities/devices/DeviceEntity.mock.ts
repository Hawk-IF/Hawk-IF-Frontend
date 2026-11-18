import Device from "@/src/domain/entities/devices/DeviceEntity";
import UUID from "@/src/domain/valueObjects/UUID";
import { DevicesTypes } from "@/src/domain/entities/enums/DevicesTypes";
import { type BaseDataProps, makeBaseData } from "../mixins/BaseEntity.mock";

type DeviceDataProps = BaseDataProps & {
    name: string;
    ip: string;
    mask: string;
    room_id: UUID | null;
    type: DevicesTypes;
};

export function makeDeviceData(
    overrides: Partial<DeviceDataProps> = {}
): Partial<DeviceDataProps> {
    const baseData = makeBaseData(overrides);

    return {
        id: baseData.id,
        name: "Sensor de Presença",
        ip: "192.168.0.100",
        mask: "255.255.255.0",
        room_id: new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
        type: DevicesTypes.SENSORS,
        created_at: baseData.created_at,
        updated_at: baseData.updated_at,
        created_by: baseData.created_by,
        updated_by: baseData.updated_by,
        ...overrides,
    };
}

export function makeDeviceCreateArgs(
    overrides: Partial<DeviceDataProps> = {}
): Parameters<typeof Device.create> {
    const data = makeDeviceData(overrides);

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    return Object.values(data) as Parameters<typeof Device.create>;
}

export function makeDeviceReconstructArgs(
    overrides: Partial<DeviceDataProps> = {}
): Parameters<typeof Device.reconstruct> {
    const data = makeDeviceData(overrides);

    return Object.values(data) as Parameters<typeof Device.reconstruct>;
}
