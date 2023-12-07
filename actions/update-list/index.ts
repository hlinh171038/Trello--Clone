"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateList } from "./schema";

const handler = async (data:InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth();

    if(!userId || !orgId){
        return {
            error: "Unauthorized"
        }
    }

    const {title,boardId,id} = data
    let list;

    try {

        const board = await db.board.findUnique({
            where:{
                id:boardId,
                orgId
            }
        })

        if(!boardId){
            return {
                error: "board id not existed !"
            }
        }
        list = await db.list.update({
            where: {
                id:id,
                boardId
            },
            data:{
                title
            }
        })
    } catch (error) {
        return {
            error: "Failed to updated."
        }
    }
    revalidatePath(`/board/${boardId}`)
    return {data:list}
}

export const updateList = createSafeAction(UpdateList, handler)