"use client"

import { toast } from "sonner"

import { Plus, X } from "lucide-react"
import { ListWrapper } from "./list-wrapper"
import{ useState, useRef, ElementRef} from 'react'

import { createList } from "@/actions/create-list"
import { useAction } from "@/hooks/use-action"

import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-button";
import { Button } from "@/components/ui/button";

const ListForm = () =>{

    const router = useRouter()
    const params = useParams()

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

    const {execute, fieldErrors} = useAction(createList, {
        onSuccess: (data) =>{
            toast.success(`List "${data.title}" created!`)
            disableEditing();
            router.refresh()
        },
         onError: (error) =>{
            toast.error(error)
         }
    })

    // onsubmit
    const onSubmit = (formData: FormData) =>{
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;

        execute({
            title,
            boardId
        })
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
                    action={onSubmit}
                    ref={formRef}
                    className="w-full p-3 rounded-md bg-white space-y-4 shadow-sm"
                    >
                    <FormInput 
                        ref={inputRef}
                        id="title"
                        className="text-sm font-medium px-3 py-1 h-7 border-transparent hover:border-input focus:border-input transition"
                        placeholder="Enter list title ... "
                    />
                    <input 
                        hidden
                        value={params.boardId}
                        name="boardId"
                    />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>
                            Add list
                        </FormSubmit>
                        <Button
                            onClick={disableEditing}
                            size="sm"
                            variant="ghost"
                        >
                            <X  className="h-5 w-5"/>
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }
    return (
        <ListWrapper>
            <button 
             onClick={enableEditing}
             className="w-full rounded-sm bg-white/75  text-start text-sm flex gap-2 items-center p-2 hover:bg-white/25 transition">
                <Plus className="w-4 h-4" />
                Add some text
            </button>
        </ListWrapper>
    )
}

export default ListForm