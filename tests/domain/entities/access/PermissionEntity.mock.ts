import Permission from "@/src/domain/entities/access/PermissionEntity";
import { type BaseDataProps, makeBaseData } from "../mixins/BaseEntity.mock";

type PermissionDataProps = BaseDataProps & {
    name: string;
};

export function makePermissionData(
    overrides: Partial<PermissionDataProps> = {}
): Partial<PermissionDataProps> {
    const baseData = makeBaseData(overrides);

    return {
        id: baseData.id,
        name: "Gerenciar Usuários",
        created_at: baseData.created_at,
        updated_at: baseData.updated_at,
        created_by: baseData.created_by,
        updated_by: baseData.updated_by,
        ...overrides,
    };
}

export function makePermissionCreateArgs(
    overrides: Partial<PermissionDataProps> = {}
): Parameters<typeof Permission.create> {
    const data = makePermissionData(overrides);

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    return Object.values(data) as Parameters<typeof Permission.create>;
}

export function makePermissionReconstructArgs(
    overrides: Partial<PermissionDataProps> = {}
): Parameters<typeof Permission.reconstruct> {
    const data = makePermissionData(overrides);

    return Object.values(data) as Parameters<typeof Permission.reconstruct>;
}
