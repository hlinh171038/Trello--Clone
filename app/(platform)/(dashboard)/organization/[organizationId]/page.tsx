

import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"


import { Info } from "./_components/info";


const OrganizationIdPage = async () =>{
    const boards = await db.board.findMany();
    return (
        <div className="w-full mb-20">
           <Info />
        </div>
    )
}

export default OrganizationIdPage