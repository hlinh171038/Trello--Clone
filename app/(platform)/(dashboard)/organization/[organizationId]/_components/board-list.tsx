
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { FormPopover } from "@/components/form/form-popover"
import { Hint } from "@/components/hint"
import { Divide, HelpCircle, User2 } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { MAX_FREE_BOARDS } from "@/constants/boards"
import { getAvailableCount } from "@/lib/org-limit"


export const BoardList = async () =>{
    const {orgId} = auth()

    if(!orgId) {
        return redirect('/select-org')
    }

    // call data api
    const boards = await db.board.findMany({
        where: {
            orgId,
        },
        orderBy:{
            createdAt: "desc"
        }
    });

    const availableCount = await getAvailableCount();
    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2" />
                Your Boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {boards.map((board)=>{
                    return (<Link
                                key={board.id}
                                href={`/board/${board.id}`}
                                className="group relative aspect-video bg-no-repeat bg-center bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
                                style={{backgroundImage: `url(${board.imageThumbUrl})`}}
                            >
                               <div className="bg-black/30 inset-0 absolute group-hover:bg-black/40 transition p-2">
                                    <p className="text-white relative text-sm capitalize">{board.title}</p>
                               </div>
                            </Link>)
                })}
                <FormPopover sideOffset={10} side="right">
                <div
                    role="button"
                    className=" p-2 aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                >
                    <p className="text-sm ">Create new board</p>
                    <span className="text-xs">
                       {`${MAX_FREE_BOARDS - availableCount}`}
                    </span>
                    <Hint
                        sideOffset={20}
                        description={`Free workspaces can have up to 5 open  boards. For unlimited boards upgrade this workspace.`}
                    >
                        <HelpCircle 
                            className="absolute bottom-2 right-2 h-[14px] w-[14px]"
                        />
                    </Hint>
                </div>
                </FormPopover>
            </div>
        </div>
    )
}

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 ">
            <Skeleton className="aspect-video w-full h-full p-2"/>
            <Skeleton className="aspect-video w-full h-full p-2"/>
            <Skeleton className="aspect-video w-full h-full p-2"/>
            <Skeleton className="aspect-video w-full h-full p-2"/>
            <Skeleton className="aspect-video w-full h-full p-2"/>
            <Skeleton className="aspect-video w-full h-full p-2"/>
            <Skeleton className="aspect-video w-full h-full p-2"/>
            <Skeleton className="aspect-video w-full h-full p-2"/>
        </div>
    )
}