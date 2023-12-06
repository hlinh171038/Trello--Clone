"use client"

import { Button } from "@/components/ui/button";
import { Popover,PopoverTrigger,PopoverContent,PopoverClose } from "@/components/ui/popover";
import { MoreHorizontal, X } from "lucide-react";

interface BoardOpotionsProps {
    id:string;
}
export const  BoardOpotionsProps = ({id}: BoardOpotionsProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2 " variant="transparent">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                className="px-0 pt-3 pb-3"
                side="bottom"
                align="start"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Board actions
                </div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="w-4 h-4"/>
                    </Button>
                </PopoverClose>
                <Button
                    variant="ghost"
                    onClick={() =>{}}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                >
                    Delete this board
                </Button>
            </PopoverContent>
            
        </Popover>
    )
}