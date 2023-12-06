"use client"

import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { Board } from "@prisma/client"
import { ElementRef, useRef, useState } from "react"
import { updateBoard } from "@/actions/upadte-board"
import { useAction } from "@/hooks/use-action"
import { toast } from "sonner"

interface BoardTitleProps {
    data: Board
}

export const BoardTitleForm = (
    {data}:
    BoardTitleProps
) =>{
    //call execute
    const {execute} = useAction(updateBoard, {
        onSuccess: (data) => {
            toast.success(`Board "${data.title}" updated!`);
            disableEditiing();
        }
    })

    const [isEditing,setIsEditing] = useState(false)
    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const enableEditing = () =>{
        // TODO: Focus inputs
        setIsEditing(true);
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    }

    const disableEditiing = () =>{
        setIsEditing(false)
    }

    const onSubmit = (formData: FormData) =>{
        const title = formData.get("title") as string;
        console.log("I am submitted", title);

        execute({
            title,
            id:data.id,
        })
    }

    // trigger before submit
    const onBlur = () =>{

    }

    if(isEditing) {
        return (
            <form action={onSubmit} ref={formRef} className="flex items-center gap-x-2">
                <FormInput 
                    ref={inputRef}
                    id="title"
                    onBlur={()=> {}}
                    defaultValue={data.title}
                    className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                />
            </form>
        )
    }
    return (
        <Button
            onClick={enableEditing}
            variant="transparent"
            className="font-bold text-lg h-auto w-auto p-1 px-1"
        >
            {data.title}
        </Button>
    )
} 