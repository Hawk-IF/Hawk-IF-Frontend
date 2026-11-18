import Group from "@/src/domain/entities/access/GroupEntity";
import { type BaseDataProps, makeBaseData } from "../mixins/BaseEntity.mock";

type GroupDataProps = BaseDataProps & {
    name: string;
};

export function makeGroupData(
    overrides: Partial<GroupDataProps> = {}
): Partial<GroupDataProps> {
    const baseData = makeBaseData(overrides);

    return {
        id: baseData.id,
        name: "Grupo de Teste",
        created_at: baseData.created_at,
        updated_at: baseData.updated_at,
        created_by: baseData.created_by,
        updated_by: baseData.updated_by,
        ...overrides,
    };
}

export function makeGroupCreateArgs(
    overrides: Partial<GroupDataProps> = {}
): Parameters<typeof Group.create> {
    const data = makeGroupData(overrides);

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    return Object.values(data) as Parameters<typeof Group.create>;
}

export function makeGroupReconstructArgs(
    overrides: Partial<GroupDataProps> = {}
): Parameters<typeof Group.reconstruct> {
    const data = makeGroupData(overrides);

    return Object.values(data) as Parameters<typeof Group.reconstruct>;
}
