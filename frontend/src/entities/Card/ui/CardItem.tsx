'use client'

interface CardItemProps {
    title: string;
    description?: string
}

export const CardItem = ({ title, description }: CardItemProps) => {
    return (
        <div className="p-6 dark:bg-neutral-900 rounded-lg shadow">
            <div className="flex flex-col gap-2 dark:text-white wrap-break-word">
                <h3 className="text-sm">{title}</h3>
                <span className="text-xs">{description}</span>
            </div>
        </div>
    )
}
