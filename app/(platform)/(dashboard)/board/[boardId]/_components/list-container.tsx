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


// reorder by index
function reorder<T>(list: T[],startIndex: number, endIndex: number) {
    console.log(startIndex,endIndex) // 1, 0
   
    const result = Array.from(list)
  
    
    // extract remove
    const [removed] = result.splice(startIndex,1); // cut index 1 take 1 element
    console.log(removed) // 
    result.splice(endIndex, 0, removed);
    // chang position
    console.log('result2',result);

    return result;
}



const ListContainer = ({
    data,
    boardId
}: ListContainerProps) =>{

    const [orderData, setOrderData] = useState(data);

     console.log(orderData)
    useEffect(()=>{
        setOrderData(data);
    },[data])


    // handle the onDragEnd function
    const onDragEnd = (result:any) =>{
        const {destination, source, type} = result; // result is props
        //console.log(destination);// {droppableId: '6bff8698-5458-4c9a-a087-4ae8a237d838', index: 0} // index after change
        //console.log('source :', source);//{index: 3, droppableId: 'c0d1ddbe-3b9f-4254-9444-61038f87b3a2'} // first index
        //console.log(type) // list // card

        // check if detination not exist 
        if(!destination){
            return;
        }

        // when drop is the same position.
        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }


        // what happen when user moving a list
        if(type === "list") {
            const items = reorder(
                orderData,
                source.index,
                destination.index
            ).map((item,index) => ({...item, order: index}));
            // set to order data
            setOrderData(items);
        }

        // what haappen when user moving a card

        if(type ==='card') {
            // shadow coppy
            const newOrderData = [...orderData];

            // check source vs destination have in orderData
            const sourceList = newOrderData.find((list)=> list.id === source.droppableId);
            const destList = newOrderData.find((list)=>list.id ===destination.droppableId);

            if(!sourceList || !destList) {
                return;
            }

            // check if card exist in source list
            if(!sourceList.cards) {
                sourceList.cards = []
            }

            // check if cards exist in destination list
            if(!destList.cards){
                destList.cards = [];
            }
            
            // move card in same list
            if(source.droppableId === destination.droppableId) {
                const reorderedCards = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index,
                );

                reorderedCards.forEach((card,idx) =>{
                    card.order = idx;
                });

                sourceList.cards = reorderedCards;

                setOrderData(newOrderData);

                //TODO:trigger sever action
                // move the card in the another list
            } else {
                // remove card from the source list
                const [removed] = sourceList.cards.splice(source.index, 1)
                // assign the new listId to removed card
                removed.listId = destination.droppableId;
                // add card to the destination list
                destList.cards.splice(destination.index, 0, removed);
                // put new card to position (bot,top,mid) source
                sourceList.cards.forEach((item,idx)=>{
                    item.order = idx;
                })
                // updata the orther for each card in destination list
                destList.cards.forEach((item,idx)=>{
                    item.order = idx;
                })
                // set order data to new 
                setOrderData(newOrderData)
                //TODO:trigger sever action
            }
        }
    } 

    return (
        <DragDropContext onDragEnd={onDragEnd}>
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