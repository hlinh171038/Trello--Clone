"use client"

import { FormSubmit } from "@/components/form/form-button"
import { FormTextarea } from "@/components/form/form-textarea"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CardWithList } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { AlignLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

interface DescriptionProps{
    data: CardWithList
}

export const Description = ({data}: DescriptionProps) =>{

    // editing
    const [editing,setEditing] = useState(false)
    //text areaRef and formRef
    const textareaRef = useRef<ElementRef<"textarea">>(null);
    const formRef = useRef<ElementRef<"form">>(null)
    // queryClient
    const queryClient = useQueryClient()
    //params
    const params = useParams()


    // enableEditing 
    const enableEditing = () =>{
        setEditing(true);
        setTimeout(()=>{
            textareaRef.current?.focus();
        });
    }

    // disable Editing
    const disableEditing = () =>{
        setEditing(false)
    }


    //keydown
    const onKeyDown = (e: KeyboardEvent) =>{
        if(e.key == "Escape"){
            disableEditing()
        }
    }

    //use event listioner and onClickOutSide
    useEventListener('keydown', onKeyDown);
    useOnClickOutside(formRef, disableEditing)

    //onSubmit
    const onSubmit = (formData: FormData) =>{
        const description = formData.get("description") as string;
        const boardId = params.boardId;

        // execute
    }

    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700"/>
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Description
                </p>
                {editing ? (
                    <form
                        ref={formRef}
                        className="space-y-2"
                    >
                        <FormTextarea 
                            id="description"
                            className="w-full mt-2"
                            placeholder="Add a more detailed description"
                        />
                        <div className="flex items-center gap-x-2">
                            <FormSubmit>
                                Save
                            </FormSubmit>
                            <Button
                                type="button"
                                onClick ={disableEditing}
                                size="sm"
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ): (
                    <div
                        onClick={enableEditing}
                        role="button"
                        className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
                    >
                        {data.description || "Add a more detailed description "}
                    </div>
                )}
               
            </div>
            
        </div>
    )
}

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="w-6 h-6 bg-neutral-200 " />
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
                <Skeleton className="w-full h-[78px] mb-2 bg-neutral-200" />
            </div>
        </div>
    )
}