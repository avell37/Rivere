'use client'

import { Column } from "@/entities/Column/ui/Column";
import { useBoard } from "../model/hooks/useBoard";
import { IColumn } from "@/entities/Column/model/types/IColumn";

interface BoardViewProps {
    id: string;
}

export const BoardView = ({ id }: BoardViewProps) => {
    const { data: board, isLoading } = useBoard(id);
    
    if (isLoading) return <div>Loading...</div>

    return (
        <div className="flex flex-col gap-6 p-4">
            <h1 className="font-bold">{board?.title}</h1>
            <div className="flex gap-4">
                {board?.columns?.map((column: IColumn) => (
                    <Column 
                        key={column.id}
                        title={column.title}
                        cards={column.cards}
                    />
                ))}
            </div>
        </div>
    )
}
