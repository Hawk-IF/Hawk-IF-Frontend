import Scheduling from "@/src/domain/entities/schedulings/SchedulingEntity";
import UUID from "@/src/domain/valueObjects/UUID";
import { type BaseDataProps, makeBaseData } from "../mixins/BaseEntity.mock";

type SchedulingDataProps = BaseDataProps & {
    user_id: UUID;
    room_id: UUID;
    start_at: Date;
    finished_at: Date;
};

export function makeSchedulingData(
    overrides: Partial<SchedulingDataProps> = {}
): Partial<SchedulingDataProps> {
    const baseData = makeBaseData(overrides);

    return {
        id: baseData.id,
        user_id: new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
        room_id: new UUID("7b791d45-9d81-416d-afb4-87eefe075f4f"),
        start_at: new Date("2026-11-18T10:00:00.000Z"),
        finished_at: new Date("2026-11-18T11:00:00.000Z"),
        created_at: baseData.created_at,
        updated_at: baseData.updated_at,
        created_by: baseData.created_by,
        updated_by: baseData.updated_by,
        ...overrides,
    };
}

export function makeSchedulingCreateArgs(
    overrides: Partial<SchedulingDataProps> = {}
): Parameters<typeof Scheduling.create> {
    const data = makeSchedulingData(overrides);

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    return Object.values(data) as Parameters<typeof Scheduling.create>;
}

export function makeSchedulingReconstructArgs(
    overrides: Partial<SchedulingDataProps> = {}
): Parameters<typeof Scheduling.reconstruct> {
    const data = makeSchedulingData(overrides);

    return Object.values(data) as Parameters<typeof Scheduling.reconstruct>;
}
