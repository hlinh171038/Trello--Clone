

import { Separator } from "@/components/ui/separator"
import { Info } from "../_components/info"
import { Suspense, useEffect, useState } from "react"
import { ActivityList } from "./_component/activity-list"


const Activitypage = () =>{
    
 
    return (
        <div className="w-full">
           <Info />
           <Separator className="my-2" />
           <Suspense fallback={<ActivityList.Skeleton/>}>
                <ActivityList />
           </Suspense>
           
               
          
        </div>
    )
}
export default Activitypage