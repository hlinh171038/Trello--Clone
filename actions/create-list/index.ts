"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";

const handler = async (data:InputType): Promise<ReturnType> =>{
    const {userId,orgId} = auth();

    if(!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const {title, boardId} = data;
    let lists;

    try {
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId
            }
        });
        // check exist board
        if(!board){
            return {
                error: "board not existed!"
            }
        }

        // find last list inside that board
        const lastList = await db.list.findFirst({
            where: {boardId: boardId},
            orderBy: {order: "desc"},
            select: {order: true}
        });

        const newOrder = lastList ? lastList.order +1 : 1
        lists = await db.list.create({
            data: {
                title,
                boardId,
                order: newOrder
            }
        })
    } catch (error) {
        return {
            error: "Failed to create."
        }
    }

    revalidatePath(`/board/${boardId}`);
    return {data: lists}
}

export const createList = createSafeAction(CreateList, handler)