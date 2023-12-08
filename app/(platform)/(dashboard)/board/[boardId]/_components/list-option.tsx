"use client"

import { FormSubmit } from "@/components/form/form-button";
import { Button } from "@/components/ui/button";
import { List } from "@prisma/client";
import { Popover,PopoverTrigger,PopoverContent,PopoverClose } from "@radix-ui/react-popover";
import { MoreHorizontal, X } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-list";
import { coppyList } from "@/actions/coppy-list";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ElementRef, useRef } from "react";


interface ListOptionProps {
    data: List;
    onAddCard:() => void
}

export const ListOption = ({
    data,
    onAddCard
}: ListOptionProps) =>{
    const closeRef = useRef<ElementRef<"button">>(null)
    const router = useRouter()

    const {execute: executeDelete} = useAction(deleteList, {
        onSuccess:(data) =>{
            toast.success("Deleted !!");
            console.log('success');
            closeRef.current?.click()
            router.refresh();
        },
        onError: (error) =>{
            toast.error(error)
            console.log('error')

        }
    });

    //coppy actiion
    const {execute:executeCoppy} = useAction(coppyList, {
        onSuccess: (data) =>{
            toast.success(`${data.title} - is coppied`);
            router.refresh();
            closeRef.current?.click()
        },
        onError: (error) =>{
            toast.error(error);

        }
    })

    const onDelete = (formData:FormData) =>{
        console.log('ok')
    
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string

        executeDelete({
            id,
            boardId
        })
    }

    const onCoppy = (formData:FormData) =>{
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        executeCoppy({
            id,
            boardId
        })
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="w-4 h-4"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[275px] px-0 pt-3 pb-3 bg-slate-300 p-2" side="bottom" align="start" sideOffset={10}>
                <div className="text-sm font-medium text-center">
                    list opotions
                </div>
                <PopoverClose ref={closeRef} asChild >
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className="rounded-sm w-full h-auto p-2 px-5 font-normal text-sm justify-start"
                    variant="ghost"
                >
                    Add Card...
                </Button>
                <form
                    action={onCoppy}
                >
                    
                    {/* hidden id, board */}
                    <input hidden id="id" name="id" value={data.id}/>
                    <input hidden id="boardId" name="boardId" value={data.boardId} />
                    {/* form submit */}
                    <FormSubmit
                        variant="ghost"
                        className="rounded-sm w-full h-auto p-2 px-5 font-normal text-sm justify-start"
                    >
                        Copy list...
                    </FormSubmit>
                    <input type="submit" hidden />
                </form>
                <hr/>
                <form action={onDelete}>
                
                    {/* hidden id, board */}
                    <input hidden id="id" name="id" value={data.id}/>
                    <input hidden id="boardId" name="boardId" value={data.boardId} />
                    {/* form submit */}
                    <FormSubmit
                        variant="ghost"
                        className="rounded-sm w-full h-auto p-2 px-5 font-normal text-sm justify-start"
                    >
                        Delete list...
                    </FormSubmit>
                    <input type="submit" hidden />
                </form>
            </PopoverContent>
        </Popover>
    )
}