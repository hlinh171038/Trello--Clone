import {z} from 'zod'

export const CoppyCard = z.object({
    id: z.string(),
    boardId: z.string()
})