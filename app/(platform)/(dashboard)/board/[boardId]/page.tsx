import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import ListContainer from "./_components/list-container"


interface BoardPageProps {
    params: {
        boardId: string
    }
}

const BoardIdpage = async({
 params
}:BoardPageProps) =>{
    const {orgId} = auth();

    if(!orgId) {
        redirect('/select-org');
    }

    const lists = await db.list.findMany({
        where: {
            boardId:params.boardId,
            board: {
                orgId
            }
        },
        include: {
            cards: {
                orderBy: {
                    order: "asc"
                }
            }
        },
        orderBy: {
            order: "asc"
        }
    })
    return (
        <div className="h-full w-full overflow-auto">
            <ListContainer 
                data={lists}
                boardId={params.boardId}
            />
        </div>
    )
}

export default BoardIdpage