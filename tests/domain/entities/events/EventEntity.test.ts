import { describe, test, expect, beforeEach } from "vitest";
import Event from "@/src/domain/entities/events/EventEntity";
import {
    makeEventData,
    makeEventCreateArgs,
    makeEventReconstructArgs,
} from "./EventEntity.mock";
import UUID from "@/src/domain/valueObjects/UUID";

describe("Event", () => {
    let eventCreate: Event;
    let eventReconstruct: Event;

    beforeEach(() => {
        eventCreate = Event.create(...makeEventCreateArgs());
        eventReconstruct = Event.reconstruct(...makeEventReconstructArgs());
    });

    describe("create", () => {
        test("deve criar uma instância de Event", () => {
            expect(eventCreate).toBeInstanceOf(Event);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedEventData = makeEventData();

            expect(eventCreate.created_at).toBeInstanceOf(Date);
            expect(eventCreate.updated_at).toBeInstanceOf(Date);
            expect(eventCreate.created_by).toEqual(expectedEventData.created_by);
            expect(eventCreate.updated_by).toEqual(expectedEventData.updated_by);
            expect(eventCreate.name).toBe(expectedEventData.name);
            expect(eventCreate.description).toBe(expectedEventData.description);
            expect(eventCreate.scheduling_id).toEqual(expectedEventData.scheduling_id);
        });

        test("deve inicializar created_at e updated_at com a mesma instância de Date", () => {
            expect(eventCreate.created_at).toBe(eventCreate.updated_at);
        });
    });

    describe("reconstruct", () => {
        test("deve reconstruir uma instância de Event", () => {
            expect(eventReconstruct).toBeInstanceOf(Event);
        });

        test("deve inicializar todos os atributos", () => {
            const expectedEventData = makeEventData();

            expect(eventReconstruct.id).toEqual(expectedEventData.id);
            expect(eventReconstruct.created_at).toEqual(expectedEventData.created_at);
            expect(eventReconstruct.updated_at).toEqual(expectedEventData.updated_at);
            expect(eventReconstruct.created_by).toEqual(expectedEventData.created_by);
            expect(eventReconstruct.updated_by).toEqual(expectedEventData.updated_by);
            expect(eventReconstruct.name).toBe(expectedEventData.name);
            expect(eventReconstruct.description).toBe(expectedEventData.description);
            expect(eventReconstruct.scheduling_id).toEqual(expectedEventData.scheduling_id);
        });
    });

    describe("name", () => {
        test("deve definir name pelo setter", () => {
            const cleanEvent = new Event();
            const name = "Evento de Integração";

            cleanEvent.name = name;

            expect(cleanEvent.name).toBe(name);
        });

        test("deve lançar ValidatorException quando name for null", () => {
            const cleanEvent = new Event();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanEvent.name = null as any;
            }).toThrow();
        });
    });

    describe("description", () => {
        test("deve definir description pelo setter", () => {
            const cleanEvent = new Event();
            const description = "Descrição do evento";

            cleanEvent.description = description;

            expect(cleanEvent.description).toBe(description);
        });

        test("deve aceitar null no setter de description", () => {
            const cleanEvent = new Event();

            cleanEvent.description = null;

            expect(cleanEvent.description).toBeNull();
        });
    });

    describe("scheduling_id", () => {
        test("deve definir scheduling_id pelo setter", () => {
            const cleanEvent = new Event();
            const scheduling_id = new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479");

            cleanEvent.scheduling_id = scheduling_id;

            expect(cleanEvent.scheduling_id).toBe(scheduling_id);
        });

        test("deve lançar ValidatorException quando scheduling_id for null", () => {
            const cleanEvent = new Event();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanEvent.scheduling_id = null as any;
            }).toThrow();
        });
    });
});
