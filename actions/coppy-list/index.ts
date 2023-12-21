"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CoppyList } from "./schema";
import { AuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType) : Promise<ReturnType> =>{
    const {userId, orgId} = auth();

    if(!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const {id, boardId} = data;

    let list;

    try {
        const listToCoppy = await db.list.findUnique({
            where: {
                id,
                boardId,
                board: {
                    orgId
                }
            },
            include: {
                cards: true
            }
        });

        //check
        if(!listToCoppy) {
            return {
                error: "Board is not exixted !!!"
            }
        }

        // find which one is last list in this board
        const lastList = await db.list.findFirst({
            where: {boardId},
            orderBy: {order: "desc"},
            select: {order: true}
        })

        const newOrder = lastList ? lastList.order + 1 : 1;

        // 
        list = await db.list.create({
            data: {
                boardId: listToCoppy.boardId,
                title: `${listToCoppy.title} - coppy`,
                order: newOrder,
                cards:{
                    createMany: {
                        data: listToCoppy.cards.map((card)=>({
                            
                                title:card.title,
                                description: card.description,
                                order: card.order
                            
                        }))
                    }
                }
            },
            include: {
                cards: true
            }
        })

        await AuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATE
        })
    } catch (error) {
        return {
             error: "Failed to Coppy List."
        }
    }
    revalidatePath(`/board/${boardId}`)
    return {data: list}
}

export const coppyList = createSafeAction(CoppyList,handler)