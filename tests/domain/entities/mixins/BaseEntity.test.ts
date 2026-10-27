import { describe, test, expect, vi, beforeEach } from "vitest";
import BaseEntity from "@/src/domain/entities/mixins/BaseEntity";
import UUID from "@/src/domain/valueObjects/UUID";

class FakeBaseEntity extends BaseEntity {}

describe("BaseEntity", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    test("'reconstruct' cria e retorna objeto sem realizar nenhuma validação", () => {
        const uuid = new UUID("6b791d45-9d81-416d-afb4-87eefe075f4f")
        const created_at = new Date('2026-10-27T10:30:00')
        const updated_at = new Date('2026-10-27T10:30:00')

        const cleanEntity = FakeBaseEntity.reconstruct(
            uuid,
            created_at,
            updated_at,
            null,
            null
        )

        expect(cleanEntity.id).toBe(uuid)
        expect(cleanEntity.created_at).toBe(created_at)
        expect(cleanEntity.updated_at).toBe(updated_at)
        expect(cleanEntity.created_by).toBe(null)
        expect(cleanEntity.updated_by).toBe(null)
    })
    
    test("'create' cria objeto realizando validação, e retorna objeto se não houver erros", () => {
        const cleanEntity = FakeBaseEntity.create(
            null,
            null
        )
        
        const dateNow = new Date()

        
        expect(cleanEntity.id).toBeUndefined()
        expect(cleanEntity.created_at).not.toBeUndefined()
        expect(cleanEntity.updated_at).not.toBeUndefined()

        if (cleanEntity.created_at && cleanEntity.updated_at) {
            expect(cleanEntity.created_at.getTime() - dateNow.getTime()).toBeLessThan(1000)
            expect(cleanEntity.updated_at.getTime() - dateNow.getTime()).toBeLessThan(1000)
        }

        expect(cleanEntity.created_by).toBe(null)
        expect(cleanEntity.updated_by).toBe(null)
    })

    test("validação do 'setter' gera um erro quando não passa", () => {
        const uuid = new UUID("6b791d45-9d81-416d-afb4-87eefe075f4f")
        const created_at = new Date('2026-10-27T10:30:00')
        const updated_at = new Date('2026-10-27T10:30:00')
        const dateNow = new Date()

        const cleanEntity = FakeBaseEntity.reconstruct(
            uuid,
            created_at,
            updated_at,
            null,
            null
        )

        vi.advanceTimersByTime(1001)

        expect(() => {
            cleanEntity.created_at = dateNow
        }).toThrow()
    })
})