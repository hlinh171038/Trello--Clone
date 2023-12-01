"use client";

import { 
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger
 } from "../ui/popover";

 import { useAction } from "@/hooks/use-action";
 import { CreateBoard } from "@/actions/create-board/schema";

 import { FormInput } from "./form-input";
 import { FormSubmit } from "./form-button";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";

 interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
 }

 export const FormPopover = ({
    children,
    side="bottom",
    align,
    sideOffset=0
 }: FormPopoverProps) =>{

    const {execute,fieldErrors} = useAction(createBoard, {
        onSuccess: (data) =>{
            console.log({data})
            toast.success("Board created!")
        },
        onError: (error) =>{
            console.log({error})
            toast.error("Board error !")
        }
    })

    const Submit = (formData:FormData) =>{
        const title = formData.get("title") as string;

        execute({title});
    }
     return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                side={side}
                sideOffset={sideOffset}
                className="w-80 pt-3"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create board
                </div>
            <PopoverClose asChild>
                <Button
                    className="h-auto w-auto p-2 absolute top-2 right-2 border-0"
                    variant="ghost"
                >
                    <X className="w-4 h-4" />
                </Button>
            </PopoverClose>
            <form className="space-y-4" action={Submit}>
                <div className="space-y-4">
                    <FormInput 
                        id="title"
                        label="Board title"
                        type="text"
                        errors={fieldErrors}
                    />
                </div>
                <FormSubmit className="w-full">Create</FormSubmit>
            </form>
            </PopoverContent>
        </Popover>
    )
 }