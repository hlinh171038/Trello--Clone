"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateList } from "./schema";
import { AuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

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

        await AuditLog({
            entityTitle:list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.UPDATE
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