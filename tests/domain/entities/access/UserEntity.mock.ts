import User from "@/src/domain/entities/access/UserEntity";
import Email from "@/src/domain/valueObjects/Email";
import UUID from "@/src/domain/valueObjects/UUID";
import { type BaseDataProps, makeBaseData } from "../mixins/BaseEntity.mock";

type UserDataProps = BaseDataProps & {
    name: string;
    photo_url: string | null;
    registration: string;
    email: Email;
    campus_id: UUID;
    last_login: Date | null;
    is_staff: boolean;
};

export function makeUserData(
    overrides: Partial<UserDataProps> = {}
): Partial<UserDataProps> {
    const baseData = makeBaseData(overrides);

    return {
        id: baseData.id,
        name: "Usuário Testador",
        photo_url: "https://exemplo.com",
        registration: "202610450012",
        email: new Email("test.user@academico.edu.br"),
        campus_id: new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
        last_login: new Date("2026-11-17T10:30:00.000Z"),
        is_staff: false,
        created_at: baseData.created_at,
        updated_at: baseData.updated_at,
        created_by: baseData.created_by,
        updated_by: baseData.updated_by,
        ...overrides,
    };
}

export function makeUserCreateArgs(
    overrides: Partial<UserDataProps> = {}
): Parameters<typeof User.create> {
    const data = makeUserData(overrides);
    delete data.id
    delete data.created_at
    delete data.updated_at

    return Object.values(data) as Parameters<typeof User.create>;
}

export function makeUserReconstructArgs(
    overrides: Partial<UserDataProps> = {}
): Parameters<typeof User.reconstruct> {
    const data = makeUserData(overrides);
    return Object.values(data) as Parameters<typeof User.reconstruct>;
}
