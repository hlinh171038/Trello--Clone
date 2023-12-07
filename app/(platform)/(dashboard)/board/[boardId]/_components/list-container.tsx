'use client'

import { ListWithCards } from "@/types"
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
        <ol className="flex space-x-3 h-full m-2">
            {orderData.map((item,index)=>{
                return <ListItem  key={item.id} index={index} data={item}/>
            })}
            <ListForm />
            <div className="flex-shrink-1 w-1"/>
        </ol>
    )
}

export default ListContainer