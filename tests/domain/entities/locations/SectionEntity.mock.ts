import Section from "@/src/domain/entities/locations/SectionEntity";
import UUID from "@/src/domain/valueObjects/UUID";
import { type BaseDataProps, makeBaseData } from "../mixins/BaseEntity.mock";

type SectionDataProps = BaseDataProps & {
    name: string;
    campus_id: UUID;
};

export function makeSectionData(
    overrides: Partial<SectionDataProps> = {}
): Partial<SectionDataProps> {
    const baseData = makeBaseData(overrides);

    return {
        id: baseData.id,
        name: "Bloco Administrativo",
        campus_id: new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
        created_at: baseData.created_at,
        updated_at: baseData.updated_at,
        created_by: baseData.created_by,
        updated_by: baseData.updated_by,
        ...overrides,
    };
}

export function makeSectionCreateArgs(
    overrides: Partial<SectionDataProps> = {}
): Parameters<typeof Section.create> {
    const data = makeSectionData(overrides);

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    return Object.values(data) as Parameters<typeof Section.create>;
}

export function makeSectionReconstructArgs(
    overrides: Partial<SectionDataProps> = {}
): Parameters<typeof Section.reconstruct> {
    const data = makeSectionData(overrides);

    return Object.values(data) as Parameters<typeof Section.reconstruct>;
}
