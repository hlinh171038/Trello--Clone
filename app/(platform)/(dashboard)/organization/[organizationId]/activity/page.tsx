"use client"

import { Separator } from "@/components/ui/separator"
import { Info } from "../_components/info"
import { Suspense, useEffect, useState } from "react"
import { ActivityList } from "./_component/activity-list"
import axios from "axios"

const Activitypage = () =>{
    const [dataActivity,setDataActivity] = useState([])


        axios.get('/api/list')
        .then((res:any)=>{
            console.log
            setDataActivity(res.data)
        })
        .catch((err:any)=>{
            console.log(err)
        })
 
    return (
        <div className="w-full">
           <Info />
           <Separator className="my-2" />
           
                <ActivityList data={dataActivity}/>
           
               
          
        </div>
    )
}
export default Activitypage