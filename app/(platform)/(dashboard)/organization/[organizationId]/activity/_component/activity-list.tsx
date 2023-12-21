"use client"

import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@/lib/create-audit-log";
import { db } from "@/lib/db";
import { CardWithList } from "@/types";
import { auth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios'
import { error } from "console";

interface ActivityListProps {
    data: any
}

export const ActivityList = ({data}:ActivityListProps) =>{
    console.log(data)
    return (
        <ol className="space-y-4 mt-4">
            <p className="hidden last:block text-xs text-center text-muted-foreground">
                No activity found inside this organization
            </p>
            <p>
                {/* {auditLog.map((item)=>{
                    return <ActivityItem key={item.id} data={item}/>
                })} */}
                {data && data.map((item: any) =>{
                    return <ActivityItem key={item} data={item} />
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