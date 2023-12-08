"use client"

import { FormSubmit } from "@/components/form/form-button";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { forwardRef } from "react";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";
import { toast } from "sonner";

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

    const {execute} = useAction(createCard, {
        onSuccess: (data) =>{
            toast.success(`${data.title} is created.`);
        },
        onError: (error) =>{
            toast.error(error)
        }
    })

    if(isEditing) {
        return (
            <form>
                <FormTextarea 
                    id="title"
                    onKeyDown={()=>{}}
                    ref={ref}
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