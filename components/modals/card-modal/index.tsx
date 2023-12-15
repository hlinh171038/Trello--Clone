"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal"
import { fectcher } from "@/lib/fetcher"
import { CardWithList } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Header } from "./header"

export const CardModal = () =>{
    // connect use -card-modal hook
     const id = useCardModal((state) => state.id);
    // const isOpen = useCardModal((state) => state.isOpen);
    // const onClose = useCardModal((state) => state.onClose);
    const cardModal = useCardModal();

    const {data: cardData} =useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fectcher(`/api/cards/${id}`)
    })
   
    return (
        // apply 
        <Dialog
            open={cardModal.isOpen}
            onOpenChange={cardModal.onClose}
        >
            <DialogContent>
                {!cardData
                ?<Header.Skeleton />
                :< Header data={cardData}/>}
            </DialogContent>
        </Dialog>
    )
}