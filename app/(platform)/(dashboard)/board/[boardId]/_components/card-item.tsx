"use client"

import { useCardModal } from "@/hooks/use-card-modal"
import { Draggable } from "@hello-pangea/dnd"
import { Card } from "@prisma/client"


interface CardItemProps {
    index: number,
    card: Card
}
export const CardItem = ({
    index,
    card
}:CardItemProps) =>{

    const cardModal = useCardModal();
    return (
        <Draggable draggableId={card.id} index={index}>
           {(provided)=>(
            <div 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                onClick={()=> cardModal.onOpen(card.id)}
                role="button"
                className="border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-sm shadow-sm truncate"
            >
                {card.title}
            </div>
            )}
        </Draggable>
    )
}