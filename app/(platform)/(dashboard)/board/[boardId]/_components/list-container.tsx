'use client'

import { ListWithCards } from "@/types"

import {DragDropContext, Droppable} from '@hello-pangea/dnd'
import { List } from "@prisma/client"
import ListForm from "./list-form"
import { useEffect, useState } from "react"
import { ListItem } from "./list-item"

interface ListContainerProps {
    data: ListWithCards[],
    boardId: string
}

const ListContainer = ({
    data,
    boardId
}: ListContainerProps) =>{

    const [orderData, setOrderData] = useState(data);

    useEffect(()=>{
        setOrderData(data);
    },[data])
    return (
        <DragDropContext onDragEnd={()=>{}}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) =>(
                <ol 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex space-x-3 h-full m-2"
                >
                    {orderData.map((item,index)=>{
                        return <ListItem  key={item.id} index={index} data={item}/>
                    })}
                    {provided.placeholder}
                    <ListForm />
                    <div className="flex-shrink-1 w-1"/>
                </ol>
            )}
            </Droppable>
        </DragDropContext>
    )
}

export default ListContainer