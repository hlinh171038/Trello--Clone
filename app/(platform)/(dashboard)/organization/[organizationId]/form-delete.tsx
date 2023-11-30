"use client"
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

export const FormDeleteButton = () =>{
    const {pending} = useFormStatus();
    return (
        <Button size="sm" disabled={pending} type="submit" variant="destructive">
            Delete
        </Button>
    )
}