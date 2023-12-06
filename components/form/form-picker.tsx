"use client"

import {useState, useEffect} from 'react';
import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { defaultImage } from '@/constants/images';
import Link from 'next/link';
import { FormErrors } from './form-error';

interface FormPickerProps {
    id:string;
    errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({
    id,
    errors
}: FormPickerProps) => {
    //what is pending use for?
    const {pending} = useFormStatus();

    // why Record ??/
    const [images,setImages] = useState<Array<Record<string, any>>>(defaultImage);
    const [isLoading,setIsLoading] = useState(true);
    const [selectedImageId, setSelectedImageId] = useState(null)

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
            setImages(defaultImage);
        }finally {
            setIsLoading(false)
        }
      }

      fetchImages();
    },[])

    if(isLoading) {
        return (
            <div className='p-6 flex items-center justify-center'>
                <Loader2 className='h-6 w-6 text-sky-700 animate-spin'/>
            </div>
        )
    }
    return (
        <div className="relative">
            <div className='grid grid-cols-3 gap-2 mb-2'>
                {images.map((image)=>{
                   return (
                    <div
                        key={image.id}
                        className={cn(
                            "curcor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                            pending && "opacity-50 hover:opacity-50 curcor-auto"
                        )}

                        onClick={()=>{
                            if(pending) return;
                            setSelectedImageId(image.id)
                        }}
                    >
                        <input 
                            type="radio"
                            id={id}
                            name={id}
                            className='hidden'
                            checked={selectedImageId === image.id}
                            disabled={pending}
                            value={`${image.id} | ${image.urls.thumb} | ${image.urls.full} | ${image.links.html} | ${image.user.name}`}
                        />
                        <Image
                            fill
                            alt="Unsplash image"
                            className="object-cover rounded-sm"
                            src={image.urls.thumb}
                        />
                        {selectedImageId === image.id && (
                            <div className='absolute h-full w-full inset-y-0 bg-black/30 flex items-center justify-center'>
                                <Check className='h-4 w-4 text-white'/>
                            </div>
                        )}
                        <Link
                            href={image.links.html}
                            target='_blank'
                            className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'
                        >
                            {image.user.name}
                        </Link>
                    </div>
                   )
                })}
            </div>
            <FormErrors 
             id="image"
             errors={errors}
            />
        </div>
    )
}

 
