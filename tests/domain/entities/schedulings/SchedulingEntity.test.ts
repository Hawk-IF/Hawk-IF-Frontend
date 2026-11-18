import { beforeEach, describe, expect, test } from "vitest";

// Entities
import Scheduling from "@/src/domain/entities/schedulings/SchedulingEntity";

// Value Objects
import UUID from "@/src/domain/valueObjects/UUID";

// Mocks
import {
    makeSchedulingCreateArgs,
    makeSchedulingReconstructArgs,
} from "./SchedulingEntity.mock";

describe("Scheduling", () => {
    let schedulingCreate: Scheduling;
    let schedulingReconstruct: Scheduling;

    beforeEach(() => {
        schedulingCreate = Scheduling.create(...makeSchedulingCreateArgs());
        schedulingReconstruct = Scheduling.reconstruct(
            ...makeSchedulingReconstructArgs()
        );
    });

    describe("create", () => {
        test("deve criar uma instância de Scheduling", () => {
            expect(schedulingCreate).toBeInstanceOf(Scheduling);
        });

        test("deve inicializar todos os atributos", () => {
            expect(schedulingCreate.user_id).toEqual(
                new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479")
            );
            expect(schedulingCreate.room_id).toEqual(
                new UUID("7b791d45-9d81-416d-afb4-87eefe075f4f")
            );
            expect(schedulingCreate.start_at).toEqual(
                new Date("2026-11-18T10:00:00.000Z")
            );
            expect(schedulingCreate.finished_at).toEqual(
                new Date("2026-11-18T11:00:00.000Z")
            );
            expect(schedulingCreate.created_by).toBeNull();
            expect(schedulingCreate.updated_by).toBeNull();
        });

        test("deve inicializar created_at e updated_at com a mesma instância de Date", () => {
            expect(schedulingCreate.created_at).toBe(
                schedulingCreate.updated_at
            );
        });
    });

    describe("reconstruct", () => {
        test("deve reconstruir uma instância de Scheduling", () => {
            expect(schedulingReconstruct).toBeInstanceOf(Scheduling);
        });

        test("deve inicializar todos os atributos", () => {
            expect(schedulingReconstruct.id).toEqual(
                new UUID("6b791d45-9d81-416d-afb4-87eefe075f4f")
            );
            expect(schedulingReconstruct.user_id).toEqual(
                new UUID("f47ac10b-58cc-4372-a567-0e02b2c3d479")
            );
            expect(schedulingReconstruct.room_id).toEqual(
                new UUID("7b791d45-9d81-416d-afb4-87eefe075f4f")
            );
            expect(schedulingReconstruct.start_at).toEqual(
                new Date("2026-11-18T10:00:00.000Z")
            );
            expect(schedulingReconstruct.finished_at).toEqual(
                new Date("2026-11-18T11:00:00.000Z")
            );
            expect(schedulingReconstruct.created_at).toEqual(
                new Date("2026-11-17T10:00:00.000Z")
            );
            expect(schedulingReconstruct.updated_at).toEqual(
                new Date("2026-11-17T10:00:00.000Z")
            );
            expect(schedulingReconstruct.created_by).toBeNull();
            expect(schedulingReconstruct.updated_by).toBeNull();
        });
    });

    describe("user_id", () => {
        test("deve atribuir um UUID ao atributo", () => {
            const userId = new UUID("a47ac10b-58cc-4372-a567-0e02b2c3d479");

            schedulingCreate.user_id = userId;

            expect(schedulingCreate.user_id).toBe(userId);
        });

        test("deve lançar uma exceção quando o atributo for null", () => {
            const cleanScheduling = new Scheduling();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanScheduling.user_id = null as any;
            }).toThrow();
        });
    });

    describe("room_id", () => {
        test("deve atribuir um UUID ao atributo", () => {
            const roomId = new UUID("b47ac10b-58cc-4372-a567-0e02b2c3d479");

            schedulingCreate.room_id = roomId;

            expect(schedulingCreate.room_id).toBe(roomId);
        });

        test("deve lançar uma exceção quando o atributo for null", () => {
            const cleanScheduling = new Scheduling();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanScheduling.room_id = null as any;
            }).toThrow();
        });
    });

    describe("start_at", () => {
        test("deve atribuir uma data ao atributo", () => {
            const startAt = new Date("2026-11-19T10:00:00.000Z");

            schedulingCreate.start_at = startAt;

            expect(schedulingCreate.start_at).toBe(startAt);
        });

        test("deve lançar uma exceção quando o atributo for null", () => {
            const cleanScheduling = new Scheduling();

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanScheduling.start_at = null as any;
            }).toThrow();
        });
    });

    describe("finished_at", () => {
        test("deve aceitar uma data posterior a start_at", () => {
            const finishedAt = new Date("2026-11-18T12:00:00.000Z");

            schedulingCreate.finished_at = finishedAt;

            expect(schedulingCreate.finished_at).toBe(finishedAt);
        });

        test("deve lançar uma exceção quando o atributo for null", () => {
            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                schedulingCreate.finished_at = null as any;
            }).toThrow();
        });

        test("deve lançar uma exceção quando start_at não estiver definido", () => {
            const cleanScheduling = new Scheduling();

            expect(() => {
                cleanScheduling.finished_at = new Date(
                    "2026-11-18T11:00:00.000Z"
                );
            }).toThrow();
        });

        test("deve lançar uma exceção quando finished_at for igual a start_at", () => {
            expect(() => {
                schedulingCreate.finished_at = new Date(
                    "2026-11-18T10:00:00.000Z"
                );
            }).toThrow();
        });

        test("deve lançar uma exceção quando finished_at for anterior a start_at", () => {
            expect(() => {
                schedulingCreate.finished_at = new Date(
                    "2026-11-18T09:00:00.000Z"
                );
            }).toThrow();
        });
    });
});
