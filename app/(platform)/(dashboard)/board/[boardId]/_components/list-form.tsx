"use client"

import { Plus } from "lucide-react"
import { ListWrapper } from "./list-wrapper"
import{ useState, useRef, ElementRef} from 'react'
import { Input } from "@/components/ui/input";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";

const ListForm = () =>{

    const [isEditing,setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const enableEditing = () =>{
        setIsEditing(true);
        setTimeout(()=>{
            inputRef?.current?.focus();
        })
    }

    const disableEditing = () =>{
        setIsEditing(false)
    }

    const onKeyDown = (e: KeyboardEvent) =>{
        if(e.key === 'Escape') {
            disableEditing();
        }
    }

    // when click outside box call disableEditing
    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);
    if(isEditing) {
        return (
            <ListWrapper>
                <form 
                    ref={formRef}
                    className="w-full p-3 rounded-md bg-white space-y-4 shadow-sm"
                    >
                    <FormInput 
                        ref={inputRef}
                        id="title"
                        className="text-sm font-medium px-3 py-1 h-7 border-transparent hover:border-input focus:border-input transition"
                        placeholder="Enter list title ... "
                    />
                </form>
            </ListWrapper>
        )
    }
    return (
        <ListWrapper>
            <button 
             onClick={enableEditing}
             className="w-full rounded-sm bg-white/75 m-2 text-start text-sm flex gap-2 items-center p-2 hover:bg-white/25 transition">
                <Plus className="w-4 h-4" />
                Add some text
            </button>
        </ListWrapper>
    )
}

export default ListForm