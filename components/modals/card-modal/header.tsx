"use client"

import { FormInput } from "@/components/form/form-input"
import { Skeleton } from "@/components/ui/skeleton"
import { CardWithList } from "@/types"
import { useQueryClient } from "@tanstack/react-query"

import { Layout } from "lucide-react"
import { useParams } from "next/navigation"
import { ElementRef, useRef, useState } from "react"

import { useAction } from "@/hooks/use-action"
import { updateCard } from "@/actions/update-card"
import { toast } from "sonner"

interface HeaderProps {
    data: CardWithList
}

export const Header = ({
    data
}: HeaderProps) =>{
    const queryClient = useQueryClient();
    const params = useParams();
    const inputRef = useRef<ElementRef<"input">>(null)
    const [title,setTitle] = useState(data.title)

    const {execute} = useAction(updateCard, {
        onSuccess: (data) =>{
            queryClient.invalidateQueries({
                queryKey: ['card', data.id]
            })
            toast.success("card is updated.")
            setTitle(data.title)
        },
        onError: (err) =>{
            toast.error(err)
        }
    })

   


    console.log(params)

    const onBlur = () =>{
        inputRef.current?.form?.requestSubmit()
    }

    const onSubmit = (formData:FormData) =>{
       const title = formData.get("title") as string;

       execute({
        title,
        id: data.id,
        boardId: params.boardId as string
       })
    }

    return (
        <div className="flex items-start gap-x-3 mb-6 w-full">
            <Layout className="h-5 w-5 mt-1 text-neutral-700" />
            <div className="full">
                <form action ={onSubmit} >
                    <FormInput 
                      ref={inputRef}
                       id="title"
                       defaultValue={title}
                       onBlur={onBlur}
                       className="text-neutral-700 border-transparent font-semibold text-xl px-1 bg-transparent  focus-visible:border-input focus-visible:bg-white truncate"
                    />
                </form>
            </div>
            <p className="text-sm text-muted-foreground">
                in list <span className="underline">{data.list.title}</span>
            </p>
        </div>
    )
}

Header.Skeleton = function HeaderSkeleton() {
    return (
        <div className="flex items-start gap-x-3 mb-6 ">
            <Skeleton className="w-5 h-5 bg-neutral-200"/>
            <Skeleton className="w-full h-5 bg-neutral-200"/>
        </div>
    )
}