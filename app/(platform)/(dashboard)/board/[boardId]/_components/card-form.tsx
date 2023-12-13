"use client"

import { FormSubmit } from "@/components/form/form-button";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams } from "next/navigation";

interface CardFormProps {
    listId: string;
    enableEditing: () =>void;
    disableEditing: () => void;
    isEditing: boolean;
};

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
    listId,
    enableEditing,
    disableEditing,
    isEditing
},ref) =>{

    const params = useParams()
    const formRef = useRef<ElementRef<'form'>>(null);
    const {execute,fieldErrors} = useAction(createCard, {
        onSuccess: (data) =>{
            toast.success(`${data.title} is created.`);
            formRef.current?.reset();
        },
        onError: (error) =>{
            toast.error(error)
        }
    });

    const onKeyDown = (e:KeyboardEvent) =>{
        if(e.key === 'Escape') {
            disableEditing();
        }
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener("keydown", onKeyDown)

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) =>{
        if(e.key ==="Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    };

    const onSubmit = (formData: FormData) =>{
        const title = formData.get("title") as string
        const listId = formData.get("listId") as string
        const boardId = params.boardId as string


        console.log({
            title,
            boardId,
            listId
        })
        execute({title, listId, boardId})
     }

    if(isEditing) {
        return (
            <form
                ref={formRef}
                action={onSubmit}
                className="m-1 py-0.5 px-1 space-y-4"
            >
                <FormTextarea 
                    id="title"
                    onKeyDown={onTextareaKeyDown}
                    ref={ref}
                    errors={fieldErrors}
                    placeholder="Enter a title this cards..."
                />
                <input hidden id="listId" name="listId" value={listId} />
                <div className="flex items-center gap-x-1 m-2">
                    <FormSubmit
                       
                    >
                        Add Card
                    </FormSubmit>
                    <Button onClick={disableEditing} size="sm" variant="ghost">
                        <X className="w-4 h-4"/>
                    </Button>
                </div>
            </form>
        )
    }
    return (
        <div>
            <Button
                onClick={enableEditing}
                className="h-auto w-full px-2 py-1.5 justify-start text-muted-foreground text-sm"
                size="sm"
                variant="ghost"
            >
                <Plus className="h-4 w-4 mr-2"/>
                Add to card
            </Button>
        </div>
    )
});

CardForm.displayName = "CardForm"