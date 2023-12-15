"use client"

import { FormInput } from "@/components/form/form-input"
import { Skeleton } from "@/components/ui/skeleton"
import { CardWithList } from "@/types"
import { useQueryClient } from "@tanstack/react-query"

import { Layout } from "lucide-react"
import { useParams } from "next/navigation"
import { ElementRef, useRef, useState } from "react"

interface HeaderProps {
    data: CardWithList
}

export const Header = ({
    data
}: HeaderProps) =>{
    const queryClient = useQueryClient();
    const params = useParams();
    const inputRef = useRef<ElementRef<"input">>(null)

    const onBlur = () =>{
        inputRef.current?.form?.requestSubmit()
    }

    const onSubmit = (formData:FormData) =>{
        console.log(formData.get("title"))
    }

    const [title,setTitle] = useState(data.title)
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