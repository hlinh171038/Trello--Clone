"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Copy, Delete } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { coppyCard } from "@/actions/coppy-card";
import { deleteCard } from "@/actions/delete-card";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface ActionsProps {
    data: CardWithList
}

export const Actions = ({data}:ActionsProps) =>{

    const params = useParams()

    const {execute:executeCoppyCard} = useAction(coppyCard, {
        onSuccess: (data) =>{
            toast.success("coppied card")
        },
        onError: (err) =>{
            toast.error(err)
        }
    })

    const {execute: executeDeleteCard} = useAction(deleteCard, {
        onSuccess: (data) => {
            toast.success('deleted card')
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onCoppy = () => {
        executeCoppyCard({
            id:data.id,
            boardId: params.boardId as string,
        })
    }

    const onDelete = () =>{
        executeDeleteCard({
            id:data.id,
            boardId: params.boardId as string,
        })
    }
    return (
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">
                Actions
            </p>
            <Button
                onClick={onCoppy}
                variant="secondary"
                className="w-full justify-start"
            >
                <Copy className="w-4 h-4 mr-2"/>
                Copy
            </Button>
            <Button
                onClick={onDelete}
                variant="secondary"
                className="w-full justify-start"
                size="sm"
            >
                <Delete className="w-4 h-4 mr-2"/>
                Delete
            </Button>
        </div>
    )
}

Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200"/>
            <Skeleton className="w-full h-8 bg-neutral-200"/>
            <Skeleton className="w-full h-8 bg-neutral-200"/>
        </div>
    )
}