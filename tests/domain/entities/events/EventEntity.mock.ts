import Event from "@/src/domain/entities/events/EventEntity";
import UUID from "@/src/domain/valueObjects/UUID";
import { type BaseDataProps, makeBaseData } from "../mixins/BaseEntity.mock";

type EventDataProps = BaseDataProps & {
    name: string;
    description: string | null;
    scheduling_id: UUID;
};

export function makeEventData(
    overrides: Partial<EventDataProps> = {}
): Partial<EventDataProps> {
    const baseData = makeBaseData(overrides);

    return {
        id: baseData.id,
        name: "Evento de Integração",
        description: "Descrição do evento",
        scheduling_id: new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
        created_at: baseData.created_at,
        updated_at: baseData.updated_at,
        created_by: baseData.created_by,
        updated_by: baseData.updated_by,
        ...overrides,
    };
}

export function makeEventCreateArgs(
    overrides: Partial<EventDataProps> = {}
): Parameters<typeof Event.create> {
    const data = makeEventData(overrides);

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    return Object.values(data) as Parameters<typeof Event.create>;
}

export function makeEventReconstructArgs(
    overrides: Partial<EventDataProps> = {}
): Parameters<typeof Event.reconstruct> {
    const data = makeEventData(overrides);

    return Object.values(data) as Parameters<typeof Event.reconstruct>;
}
