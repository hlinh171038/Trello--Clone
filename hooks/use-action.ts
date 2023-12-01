import {useState,useCallback} from 'react'

import { ActionState, FieldErrors } from '@/lib/create-safe-action'

type Action<TInput,TOutput> =(data: TInput) => 
Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
    onSuccess?: (data: TOutput) =>void;
    onError?: (error:string) => void;
    onComplete?: () => void;
};

export const useAction  = <TInput, TOutput> (
    action:Action<TInput,TOutput>,
    options: UseActionOptions<TOutput> = {}
) =>{
    const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(undefined);
    const [error,setError] = useState<TOutput | string | undefined>(undefined);
    const [data,setData] = useState<TOutput | undefined>(undefined);
    const [isLoading,setIsLoading] = useState<boolean>(false);

    const execute = useCallback(
        // accept input if we have
        async (input:TInput) => {
            setIsLoading(true);

            try {
                // pass to action and make sure it validated
                const result = await action(input);

                if(!result){
                    return;
                }
                // something went wrong with validation
               // remove it because setFeilErrors is also set both have error or not
                setFieldErrors(result.fieldErrors)
                
                // server error
                if(result.error) {
                    setError(result.error);
                    // add option callback because it the same type --> use tosat to show it
                    options.onError?.(result.error);
                }

                if(result.data) {
                    setData(result.data);
                    options.onSuccess?.(result.data);
                }
            } catch (error) {
                setIsLoading(false);
                options.onComplete?.();
            }
        },[action,options]
    );

    // return all of those
    return {
        execute,
        fieldErrors,
        error,
        data,
        isLoading
    }
}