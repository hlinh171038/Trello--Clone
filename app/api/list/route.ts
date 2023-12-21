import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(request:Request){
    
    try {
        const {userId, orgId} = auth();

        if(!userId || !orgId) {
            return new NextResponse("unauthorized", {status: 400})
        }

        const activity = await db.audiLog.findMany({
            where: {
               orgId
            }
        })

        return NextResponse.json(activity)

    } catch (error) {
        return new NextResponse("internal Error", {status: 500})
    }
}
