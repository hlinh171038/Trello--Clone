"use client"

import { FormInput } from "@/components/form/form-input"
import { List } from "@prisma/client"

import {useRef,useState,ElementRef} from 'react'
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { updateList } from "@/actions/update-list"
import { useAction } from "@/hooks/use-action"
import { toast } from "sonner"
import { error } from "console"
import { ListOption } from "./list-option"

interface ListHeaderProps {
    data: List
}

export const ListHeader = ({
    data
}: ListHeaderProps) =>{

    const [title,setTitle] = useState(data.title)
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

    // execute
    const {execute} = useAction(updateList, {
        onSuccess: (data) =>{
            toast.success("Changed it")
            setTitle(data.title)
            disableEditing();
        },
        onError: (error) =>{
            toast.error(error)
        }
        
    })


    // submit function
    const onSubmit = (formData: FormData) =>{
        const title = formData.get('title') as string;
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        if(title === data.title){
            return disableEditing()
        }

        execute({
            title,
            id,
            boardId
        })
    }

    const onBlur = () =>{
        formRef.current?.requestSubmit()
    }
    const onKeyDown = (e:KeyboardEvent) =>{
        if(e.key === "Escape") {
            formRef.current?.requestSubmit();
        }
    }

  
    useEventListener("keydown", onKeyDown)
  
  
    return (
        <div 
           
            className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
            {isEditing ? (
                <form 
                    onClick={enableEditing}
                    ref={formRef}
                    action={onSubmit}>
                    <input hidden id="id" name="id" value={data.id}/>
                    <input hidden id="boardId" name="boardId" value={data.boardId}/>
                    <FormInput 
                        ref={inputRef}
                        onBlur={onBlur}
                        id="title"
                        placeholder="Enter list title ..."
                        defaultValue={title}
                        className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
                    />
                    <button type="submit" hidden />
                </form>
            ):(
                <div className="text-sm font-medium border-transparent">
                 {title}
                </div>
            )}
            <ListOption 
                onAddCard={()=>{}}
                data={data}
            />
        </div>
    )
}