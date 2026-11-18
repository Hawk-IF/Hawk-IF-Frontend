import Campus from "@/src/domain/entities/locations/CampusEntity";
import UUID from "@/src/domain/valueObjects/UUID";
import { type BaseDataProps, makeBaseData } from "../mixins/BaseEntity.mock";

type CampusDataProps = BaseDataProps & {
    name: string;
    acronym: string;
    institution_id: UUID;
};

export function makeCampusData(
    overrides: Partial<CampusDataProps> = {}
): Partial<CampusDataProps> {
    const baseData = makeBaseData(overrides);

    return {
        id: baseData.id,
        name: "Campus Central",
        acronym: "CC",
        institution_id: new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
        created_at: baseData.created_at,
        updated_at: baseData.updated_at,
        created_by: baseData.created_by,
        updated_by: baseData.updated_by,
        ...overrides,
    };
}

export function makeCampusCreateArgs(
    overrides: Partial<CampusDataProps> = {}
): Parameters<typeof Campus.create> {
    const data = makeCampusData(overrides);

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    return Object.values(data) as Parameters<typeof Campus.create>;
}

export function makeCampusReconstructArgs(
    overrides: Partial<CampusDataProps> = {}
): Parameters<typeof Campus.reconstruct> {
    const data = makeCampusData(overrides);

    return Object.values(data) as Parameters<typeof Campus.reconstruct>;
}
