import {z} from 'zod'

export const CoppyList = z.object({
    id: z.string(),
    boardId: z.string()
})