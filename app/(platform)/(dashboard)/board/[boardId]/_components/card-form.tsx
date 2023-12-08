"use client"

interface CardFormProps {
    listId: string;
    enableEditing: () =>void;
    disableEditing: () => void;
    isEditing: boolean;
};

export const CardForm = ({
    listId,
    enableEditing,
    disableEditing,
    isEditing
}:CardFormProps) =>{
    return (
        <div>
            card form
        </div>
    )
}