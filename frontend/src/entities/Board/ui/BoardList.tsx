'use client'
import { useQuery } from "@tanstack/react-query"
import { fetchUserBoards } from "../model/api/boardApi"
import { BoardItem } from "./BoardItem"
import { CreateBoardModal } from "@/features/manage-board/create/ui/CreateBoardModal"
import { IBoard } from "../model/types/IBoard"

export const BoardList = () => {
    const { data: boards, isPending } = useQuery({
        queryKey: ['boards'],
        queryFn: fetchUserBoards
    })
    
    return (
        <div className="flex flex-wrap gap-4">
            {!isPending && boards.map((board: IBoard) => (
                <div key={board.id}>
                    <BoardItem
                        id={board.id}
                        title={board.title}
                        members={board.members.length}
                        background={board.background}
                    />
                </div>
            ))}
            <CreateBoardModal />
        </div>
    )
}
