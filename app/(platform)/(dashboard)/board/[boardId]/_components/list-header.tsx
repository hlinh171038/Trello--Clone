"use client"

import { List } from "@prisma/client"

interface ListHeaderProps {
    data: List
}

export const ListHeader = ({
    data
}: ListHeaderProps) =>{
    return (
        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
            <div className="text-sm font-medium border-transparent">
                 {data && data.title}
            </div>
        </div>
    )
}