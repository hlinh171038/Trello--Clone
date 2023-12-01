"use client";

import { 
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger
 } from "../ui/popover";

 import { useAction } from "@/hooks/use-action";
 import { CreateBoard } from "@/actions/create-board/schema";

 import { FormInput } from "./form-input";
 import { FormSubmit } from "./form-button";
import { X } from "lucide-react";
import { Button } from "../ui/button";

 interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
 }

 export const FormPopover = ({
    children,
    side="bottom",
    align,
    sideOffset=0
 }: FormPopoverProps) =>{
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                side={side}
                sideOffset={sideOffset}
                className="w-80 pt-3"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create board
                </div>
            <PopoverClose asChild>
                <Button
                    className="h-auto w-auto p-2 absolute top-2 right-2 border-0"
                    variant="ghost"
                >
                    <X className="w-4 h-4" />
                </Button>
            </PopoverClose>
            </PopoverContent>
        </Popover>
    )
 }