"use client";

import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button"

import { useFormState } from "react-dom";
import { FormInput } from "./form-input";
import { FormButton } from "./form-button";
import { useAction } from "@/hooks/use-action";


export const Form =() =>{
    // use action hook to take execute and field error
    const {execute, fieldErrors} = useAction(createBoard,{
        onSuccess: (data) =>{
            console.log(data, "SUCCESS!")
        }
    });

    const onSubmit = (formData:FormData) => {
        const title = formData.get('title') as string;

        execute({title});
    }
  
    return (
        <form action={onSubmit}>
               <FormInput errors={fieldErrors}/>
               <FormButton/>
         </form>
    )
}