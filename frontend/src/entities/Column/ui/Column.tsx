'use client'

import { ICard } from "@/entities/Card/model/types/ICard";
import { CardItem } from "@/entities/Card/ui/CardItem";
import { GripVertical } from "lucide-react";

interface ColumnProps {
    title: string;
    cards: ICard[];
}

export const Column = ({ title, cards }: ColumnProps) => {
    return (
        <div className="w-76 flex flex-col gap-3">
            <div className="dark:bg-neutral-900 p-4 rounded-lg shadow flex items-center gap-2 dark:text-white">
                <GripVertical className="size-5" />
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <div className="flex flex-col gap-4">
                {cards && (
                    cards.map((card) => <CardItem key={card.id} title={card.title} />)
                )}
            </div>
        </div>
    )
}
