"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal"
import { fectcher } from "@/lib/fetcher"
import { CardWithList } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Header } from "./header"
import { Description } from "./description"
import { Actions } from "./actions"

import { AudiLog } from "@prisma/client"
import { Activity } from "./activity"


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

    const {data: auditLogData} = useQuery<AudiLog[]>({
        queryKey:["card-logs",id],
        queryFn: () =>fectcher(`/api/cards/${id}/logs`)
    })
   
    return (
        // apply 
        <Dialog
            open={cardModal.isOpen}
            onOpenChange={cardModal.onClose}
        >
            <DialogContent>
                {!cardData
                ?<>
                    <Header.Skeleton />
                    
                </>

                :
                <>
                    < Header data={cardData}/>
                    
                </>
                }
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            {!cardData
                            ? <Description.Skeleton />
                            : <Description data={cardData} />
                            }
                            {!auditLogData
                            ? <Activity.Skeleton />
                            : <Activity items={auditLogData} />
                            }
                        </div>
                    </div>
                    {!cardData
                        ?<Actions.Skeleton />
                        :<Actions data={cardData} />
                    }
                </div>
            </DialogContent>

        </Dialog>
    )
}