
import Floor from "@/src/domain/entities/locations/FloorEntity";
import UUID from "@/src/domain/valueObjects/UUID";
import { type BaseDataProps, makeBaseData } from "../mixins/BaseEntity.mock";

type FloorDataProps = BaseDataProps & {
    number: number;
    section_id: UUID;
};

export function makeFloorData(
    overrides: Partial<FloorDataProps> = {}
): Partial<FloorDataProps> {
    const baseData = makeBaseData(overrides);

    return {
        id: baseData.id,
        number: 2,
        section_id: new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
        created_at: baseData.created_at,
        updated_at: baseData.updated_at,
        created_by: baseData.created_by,
        updated_by: baseData.updated_by,
        ...overrides,
    };
}

export function makeFloorCreateArgs(
    overrides: Partial<FloorDataProps> = {}
): Parameters<typeof Floor.create> {
    const data = makeFloorData(overrides);

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    return Object.values(data) as Parameters<typeof Floor.create>;
}

export function makeFloorReconstructArgs(
    overrides: Partial<FloorDataProps> = {}
): Parameters<typeof Floor.reconstruct> {
    const data = makeFloorData(overrides);

    return Object.values(data) as Parameters<typeof Floor.reconstruct>;
}
