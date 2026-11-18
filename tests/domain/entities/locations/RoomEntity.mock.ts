import Room from "@/src/domain/entities/locations/RoomEntity";
import UUID from "@/src/domain/valueObjects/UUID";
import { RoomsStatus } from "@/src/domain/entities/enums/RoomsStatus";
import { RoomsTypes } from "@/src/domain/entities/enums/RoomsTypes";
import { type BaseDataProps, makeBaseData } from "../mixins/BaseEntity.mock";

type RoomDataProps = BaseDataProps & {
    name: string;
    floor_id: UUID;
    number: number;
    status: RoomsStatus;
    type: RoomsTypes;
    capacity: number | null;
};

export function makeRoomData(
    overrides: Partial<RoomDataProps> = {}
): Partial<RoomDataProps> {
    const baseData = makeBaseData(overrides);

    return {
        id: baseData.id,
        name: "Laboratório de Informática",
        floor_id: new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
        number: 101,
        status: RoomsStatus.FREE,
        type: RoomsTypes.LABORATORY,
        capacity: 30,
        created_at: baseData.created_at,
        updated_at: baseData.updated_at,
        created_by: baseData.created_by,
        updated_by: baseData.updated_by,
        ...overrides,
    };
}

export function makeRoomCreateArgs(
    overrides: Partial<RoomDataProps> = {}
): Parameters<typeof Room.create> {
    const data = makeRoomData(overrides);

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    return Object.values(data) as Parameters<typeof Room.create>;
}

export function makeRoomReconstructArgs(
    overrides: Partial<RoomDataProps> = {}
): Parameters<typeof Room.reconstruct> {
    const data = makeRoomData(overrides);

    return Object.values(data) as Parameters<typeof Room.reconstruct>;
}
