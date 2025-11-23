'use client'

import { ICard } from "@/entities/Card/model/types/ICard";
import { CardItem } from "@/entities/Card/ui/CardItem";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { CSS } from '@dnd-kit/utilities';

interface ColumnProps {
    id: string;
    title: string;
    cards: ICard[];
}

export const Column = ({ id, title, cards }: ColumnProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <ul 
            ref={setNodeRef}
            style={style}
            className="w-76 flex flex-col gap-3"
        >
            <div 
                className="dark:bg-neutral-900 p-4 rounded-lg shadow flex items-center gap-2 dark:text-white"
            >
                <GripVertical 
                    {...attributes}
                    {...listeners}
                    className="size-5 outline-none" 
                />
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <div className="flex flex-col gap-4">
                <SortableContext items={cards.map((card) => card.id) ?? []}>
                    {cards && (
                        cards.map((card) => 
                            <CardItem 
                                key={card.id}
                                id={card.id} 
                                title={card.title} 
                            />
                        )
                    )}
                </SortableContext>
            </div>
        </ul>
    )
}
