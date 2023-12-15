"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal"
import { useState } from "react"

export const CardModal = () =>{
    // connect use -card-modal hook
    // const id = useCardModal((state) => state.id);
    // const isOpen = useCardModal((state) => state.isOpen);
    // const onClose = useCardModal((state) => state.onClose);
    const cardModal = useCardModal()
   
    return (
        // apply 
        <Dialog
            open={cardModal.isOpen}
            onOpenChange={cardModal.onClose}
        >
            <DialogContent>
                I am modal
            </DialogContent>
        </Dialog>
    )
}