import UserGroup from "@/src/domain/entities/access/UserGroupEntity";
import UUID from "@/src/domain/valueObjects/UUID";
import { type BaseDataProps, makeBaseData } from "../mixins/BaseEntity.mock";

type UserGroupDataProps = BaseDataProps & {
    user_id: UUID;
    group_id: UUID;
};

export function makeUserGroupData(
    overrides: Partial<UserGroupDataProps> = {}
): Partial<UserGroupDataProps> {
    const baseData = makeBaseData(overrides);

    return {
        id: baseData.id,
        user_id: new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
        group_id: new UUID("a47ac10b-58cc-4372-a567-0e02b2c3d479"),
        created_at: baseData.created_at,
        updated_at: baseData.updated_at,
        created_by: baseData.created_by,
        updated_by: baseData.updated_by,
        ...overrides,
    };
}

export function makeUserGroupCreateArgs(
    overrides: Partial<UserGroupDataProps> = {}
): Parameters<typeof UserGroup.create> {
    const data = makeUserGroupData(overrides);

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    return Object.values(data) as Parameters<typeof UserGroup.create>;
}

export function makeUserGroupReconstructArgs(
    overrides: Partial<UserGroupDataProps> = {}
): Parameters<typeof UserGroup.reconstruct> {
    const data = makeUserGroupData(overrides);

    return Object.values(data) as Parameters<typeof UserGroup.reconstruct>;
}
