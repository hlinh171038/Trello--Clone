"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CoppyCard } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth()
     if(!userId || !orgId) {
        return {
            error: "Unauthozired"
        }
     }

     const {id, boardId} = data;
     let card;

     try {
        // find id exixst
        const cardToCoppy = await db.card.findUnique({
            where: {
                id: id,
                list:{
                    board:{
                        orgId
                    }
                }
            }
        })
        //check
        if(!cardToCoppy){
            return {
                error: " Card not found"
            }
        }
        // find last card
        const lastCard = await db.card.findFirst({
          
                where: {
                    listId: cardToCoppy.listId
                },
                orderBy: {order:"desc"},
                select: {order: true}
         
        })
        // update order
        const newOrder = lastCard ? lastCard.order + 1: 1;
        // coppy
        card = await db.card.create({
            data: {
                title: `${cardToCoppy.title} - Coppy`,
                description: cardToCoppy.description,
                order: newOrder,
                listId: cardToCoppy.listId
            }
        })
        
     } catch (error) {
        return {
            error: "Failed to coppy card"
        }
     }
     revalidatePath(`/board/${boardId}`)
     return {data: card}
}

export const coppyCard = createSafeAction(CoppyCard, handler)