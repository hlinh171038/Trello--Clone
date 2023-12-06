"use server"

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  // check have userId or not 
  const {userId,orgId } = auth();

  if(!userId || !orgId) {
    return {
      error: "Unauthorized"
    }
  }

  const {title,image} = data;

  // .split because in (form-picker image contain |)
  const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName
  ] = image.split("|");

  console.log({
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName
  })

  if(!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName){
    return {
      error: "Missing fields. Failed to create board."
    }
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageLinkHTML,
        imageUserName,
       imageFullUrl,
      }
    });
  } catch (error) {
    return {
      error: "Failed to create"
    }
  }
    revalidatePath(`/board/${board.id}`);
    return { data: board}
};

export const createBoard = createSafeAction(CreateBoard,handler)