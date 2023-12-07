import { ListWithCards } from "@/types"
import { List } from "@prisma/client"

interface ListContainerProps {
    data: ListWithCards[],
    boardId: string
}

const ListContainer = ({
    data,
    boardId
}: ListContainerProps) =>{
    return (
        <div>list container</div>
    )
}

export default ListContainer