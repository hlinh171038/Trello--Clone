"use client"

import { FormInput } from "@/components/form/form-input"
import { List } from "@prisma/client"

import {useRef,useState,ElementRef} from 'react'
import { useEventListener, useOnClickOutside } from "usehooks-ts"

interface ListHeaderProps {
    data: List
}

export const ListHeader = ({
    data
}: ListHeaderProps) =>{

    const [isEditing,setIsEditing] = useState(false);
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const enableEditing = () =>{
        setIsEditing(true);
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    }

    const disableEditing = () =>{
        setIsEditing(false);
    }

    const onKeyDown = (e:KeyboardEvent) =>{
        if(e.key === "Escape") {
            formRef.current?.requestSubmit();
        }
    }

  
    useEventListener("keydown", onKeyDown)
  
  
    return (
        <div 
            onClick={enableEditing}
            className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
            {isEditing ? (
                <form>
                    <input hidden id="id" name="id" value={data.id}/>
                    <input hidden id="boardId" name="boardId" value={data.boardId}/>
                    <FormInput 
                        ref={inputRef}
                        onBlur={()=>{}}
                        id="title"
                        placeholder="Enter list title ..."
                        defaultValue={data.title}
                        className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
                    />
                </form>
            ):(
                <div className="text-sm font-medium border-transparent">
                 {data && data.title}
                </div>
            )}
            
        </div>
    )
}