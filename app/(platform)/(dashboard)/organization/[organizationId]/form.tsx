"use client";

import { create } from "@/actions/create-board"
import { Button } from "@/components/ui/button"

import { useFormState } from "react-dom";
import { FormInput } from "./form-input";


export const Form =() =>{
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(create, initialState);
  
    return (
        <form action={dispatch}>
               <FormInput errors={state.errors}/>
                <Button type="submit" >
                    Submit
                </Button>
         </form>
    )
}