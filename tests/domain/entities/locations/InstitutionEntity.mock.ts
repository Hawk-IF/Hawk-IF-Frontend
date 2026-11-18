import Institution from "@/src/domain/entities/locations/InstitutionEntity";
import { type BaseDataProps, makeBaseData } from "../mixins/BaseEntity.mock";

type InstitutionDataProps = BaseDataProps & {
    name: string;
    acronym: string;
};

export function makeInstitutionData(
    overrides: Partial<InstitutionDataProps> = {}
): Partial<InstitutionDataProps> {
    const baseData = makeBaseData(overrides);

    return {
        id: baseData.id,
        name: "Instituto Federal do Rio Grande do Norte",
        acronym: "IFRN",
        created_at: baseData.created_at,
        updated_at: baseData.updated_at,
        created_by: baseData.created_by,
        updated_by: baseData.updated_by,
        ...overrides,
    };
}

export function makeInstitutionCreateArgs(
    overrides: Partial<InstitutionDataProps> = {}
): Parameters<typeof Institution.create> {
    const data = makeInstitutionData(overrides);

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    return Object.values(data) as Parameters<typeof Institution.create>;
}

export function makeInstitutionReconstructArgs(
    overrides: Partial<InstitutionDataProps> = {}
): Parameters<typeof Institution.reconstruct> {
    const data = makeInstitutionData(overrides);

    return Object.values(data) as Parameters<typeof Institution.reconstruct>;
}
