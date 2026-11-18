import UUID from "@/src/domain/valueObjects/UUID";

export type BaseDataProps = {
    id: UUID;
    created_at: Date;
    updated_at: Date;
    created_by: UUID | null;
    updated_by: UUID | null;
};

export function makeBaseData(
    overrides: Partial<BaseDataProps> = {}
): Partial<BaseDataProps> {
    return {
        id: new UUID("6b791d45-9d81-416d-afb4-87eefe075f4f"),
        created_at: new Date("2026-11-17T10:00:00.000Z"),
        updated_at: new Date("2026-11-17T10:00:00.000Z"),
        created_by: null,
        updated_by: null,
        ...overrides,
    };
}