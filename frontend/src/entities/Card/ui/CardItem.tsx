'use client'

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

interface CardItemProps {
    id: string;
    title: string;
    description?: string
}

export const CardItem = ({ id, title, description }: CardItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <li 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="p-6 dark:bg-neutral-900 rounded-lg shadow"
        >
            <div className="flex flex-col gap-2 dark:text-white wrap-break-word">
                <h3 className="text-sm">{title}</h3>
                <span className="text-xs">{description}</span>
            </div>
        </li>
    )
}
