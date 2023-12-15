import {z} from 'zod'

export const UpdateCard = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"

    }).min(3,{
        message: "Tile too short"
    }),
    boardId: z.string(),
    id: z.string(),
    description: z.optional(
        z.string({
            required_error:"Description is required",
            invalid_type_error: "DEscription is required"
        }).min(3, {
            message: " Description id too short"
        })
    )
})