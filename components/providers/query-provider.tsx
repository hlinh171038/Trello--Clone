"use client"

import { useState} from 'react';

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const QueryProvider = ({children}:{children:React.ReactNode}) =>{
    const [queryClient] = useState(()=> new QueryClient());
    console.log(queryClient)

    return (
        <QueryClientProvider client={queryClient}>
                {children}
        </QueryClientProvider>
    )
}