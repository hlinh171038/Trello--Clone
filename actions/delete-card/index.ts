"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";
import { AuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data:InputType):Promise<ReturnType> =>{
    const {userId, orgId} = auth();

    if(!userId || !orgId){
        return {
            error: "Unauthozired"
        }
    }

    const {id,boardId} = data;
    let card

    try {
        // find and check id
        const cardById = await db.card.findUnique({
            where: {
                id: id,
                list:{
                    board: {
                        orgId
                    }
                }
            }
        })

        if(!cardById){
            return {
                error: "card Id not found"
            }
        }
        // delete 
        card = await db.card.delete({
            where: {
                id:id,
                list: {
                    board: {
                        orgId
                    }
                }
            }
        });

        await AuditLog({
            entityTitle:card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.DELETE
        }) 
        
    } catch (error) {
        return {
            error: "Failed to DeleteCard"
        }
    }

    revalidatePath(`/board/${boardId}`);
    return {data: card}

}

export const deleteCard = createSafeAction(DeleteCard, handler)