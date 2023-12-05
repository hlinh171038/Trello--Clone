"use client"

import {useState, useEffect} from 'react';
import { unsplash } from "@/lib/unsplash";

interface FormPickerProps {
    id:string;
    errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({
    id,
    errors
}: FormPickerProps) => {
    // why Record ??/
    const [images,setImages] = useState<Array<Record<string, any>>>([]);

    useEffect(() =>{
      const fetchImages = async () =>{
        try {
            const result = await unsplash.photos.getRandom({
                collectionIds: ["317099"],
                count: 9,
            });

            // check result
            if(result && result.response){
                const newImages = (result.response as Array<Record<string,any>>);
                setImages(newImages);
            }else {
                console.error("Failed to get images from Unsplash");
            }
        } catch (error) {
            console.log(error);
            setImages([]);
        }
      }

      fetchImages();
    },[])

    return (
        <div>
            Form Picker!
        </div>
    )
}

 
