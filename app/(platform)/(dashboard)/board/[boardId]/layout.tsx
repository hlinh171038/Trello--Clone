import { startCase } from "lodash";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/BoardNavbar";

export async function generateMetadata({params}:{params: {boardId:string}}) {
    // check orgId
    const {orgId} = auth();

    if(!orgId) {
        return {
            title: "Board",
        }
    }
    // take name 
    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    });

    return {
        title: board?.title || 'Board',
    }
}

const BoardIdLayout = async(
    {
        children,
        params
    }
    :{
        children:React.ReactNode,
        params: {boardId: string}
    }) =>{

    // take org id
    const {orgId} = auth();

    if(!orgId) {
        redirect('select-org');
    }

    // fetch
    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    })

    // check board
    if(!board){
        notFound()
    }

    return (
        <div
        className="relative bg-no-repeat bg-cover h-full bg-center"
         style={{backgroundImage: `url(${board.imageFullUrl})`}}
        >
            <BoardNavbar 
                data={board}
            />
            <div className="absolute inset-0 bg-black/10"/>
            <main className="relative pt-28 h-full">
             {children}
            </main>
        </div>
    )
}

export default BoardIdLayout