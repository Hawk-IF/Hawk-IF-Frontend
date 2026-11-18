import { describe, test, expect, vi, beforeEach } from "vitest";
import BaseEntity from "@/src/domain/entities/mixins/BaseEntity";
import UUID from "@/src/domain/valueObjects/UUID";

class FakeBaseEntity extends BaseEntity { }

describe("BaseEntity", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    describe("created_at", () => {
        test("deve definir created_at pelo setter", () => {
            const cleanEntity = new FakeBaseEntity()
            const dateNow = new Date()

            cleanEntity.created_at = dateNow

            expect(cleanEntity.created_at).toBe(dateNow)
        });

        test("deve lançar ValidatorException quando created_at for null", () => {
            const cleanEntity = new FakeBaseEntity()

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanEntity.created_at = null as any
            }).toThrow()
        });

        test("deve lançar ValidatorException quando created_at estiver fora da janela de tempo permitida", () => {
            const cleanEntity = new FakeBaseEntity()
            const dateNow = new Date()
            
            vi.advanceTimersByTime(1001)

            expect(() => {
                cleanEntity.created_at = dateNow
            }).toThrow()
        });
    });

    describe("updated_at", () => {
        test("deve definir updated_at pelo setter", () => {
            const cleanEntity = new FakeBaseEntity()
            const dateNow = new Date()

            cleanEntity.updated_at = dateNow

            expect(cleanEntity.updated_at).toBe(dateNow)
        });

        test("deve lançar ValidatorException quando updated_at for null", () => {
            const cleanEntity = new FakeBaseEntity()

            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cleanEntity.updated_at = null as any
            }).toThrow()
        });

        test("deve lançar ValidatorException quando updated_at estiver fora da janela de tempo permitida", () => {
            const cleanEntity = new FakeBaseEntity()
            const dateNow = new Date()
            
            vi.advanceTimersByTime(1001)

            expect(() => {
                cleanEntity.updated_at = dateNow
            }).toThrow()
        });
    });

    describe("created_by", () => {
        test("deve definir created_by pelo setter", () => {
            const user_uuid = new UUID("6b791d45-9d81-416d-afb4-87eefe075f4f")
            const cleanEntity = new FakeBaseEntity()

            cleanEntity.created_by = user_uuid

            expect(cleanEntity.created_by).toBe(user_uuid)
        });

        test("deve aceitar null no setter de created_by", () => {
            const cleanEntity = new FakeBaseEntity()

            cleanEntity.created_by = null

            expect(cleanEntity.created_by).toBeNull()
        });
    });

    describe("updated_by", () => {
        test("deve definir updated_by pelo setter", () => {
            const user_uuid = new UUID("6b791d45-9d81-416d-afb4-87eefe075f4f")
            const cleanEntity = new FakeBaseEntity()

            cleanEntity.updated_by = user_uuid

            expect(cleanEntity.updated_by).toBe(user_uuid)
        });

        test("deve aceitar null no setter de updated_by", () => {
            const cleanEntity = new FakeBaseEntity()

            cleanEntity.updated_by = null

            expect(cleanEntity.updated_by).toBeNull()
        });
    });
})