"use server"

import { auth } from "@clerk/nextjs"
import { DeleteBoard } from "./schema"
import { InputType,ReturnType } from "./types"
import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { AuditLog } from "@/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { decresementCount } from "@/lib/org-limit"


const handler = async (data: InputType): Promise<ReturnType> => {
    const {userId,orgId} = auth();

    if(!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const {id} = data;

    let board;

    try {
       const boardId = await db.board.findUnique({
            where: {
                id,
                orgId
            }
        })
        board = await db.board.deleteMany({
            where: {
                id,
                orgId
            }
        })

        await decresementCount()

        await AuditLog({
            entityTitle: boardId?.title as string,
            entityId: boardId?.id as string,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.DELETE
        }) 
    } catch (error) {
        return {
            error: "Failed to Deleted"
        }
    }

    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)