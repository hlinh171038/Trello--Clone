"use client";

import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button"

import { useFormState } from "react-dom";

import { FormSubmit } from "@/components/form/form-button";
import { useAction } from "@/hooks/use-action";
import { FormInput } from "@/components/form/form-input";


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
               <FormInput 
                    label="Board label"
                    id="title"
                    errors={fieldErrors}
                />
               <FormSubmit >Search</FormSubmit>
         </form>
    )
}