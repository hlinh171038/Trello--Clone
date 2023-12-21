

import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@/lib/create-audit-log";
import { db } from "@/lib/db";
import { CardWithList } from "@/types";
import { auth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { error } from "console";

export const ActivityList = async () =>{
    const {orgId} = auth()

    if(!orgId) {
        redirect("/select-org");
    }

    const auditLog  = await db.audiLog.findMany({
        where: {
            orgId
        }
    })
    return (
        <ol className="space-y-4 mt-4">
            <p className="hidden last:block text-xs text-center text-muted-foreground">
                No activity found inside this organization
            </p>
            <p>
                {auditLog.map((item)=>{
                    return <ActivityItem key={item.id} data={item}/>
                })}
               
            </p>
        </ol>
    )
}

ActivityList.Skeleton = function activitySkeleton() {
    return (
        <ol className="space-y-4 mt-4">
            <Skeleton className="w-[80%] h-14"/>
            <Skeleton className="w-[50%] h-14"/>
            <Skeleton className="w-[70%] h-14"/>
            <Skeleton className="w-[80%] h-14"/>
            <Skeleton className="w-[75%] h-14"/>
        </ol>
    )
}