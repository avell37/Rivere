import { 
    Dialog,
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "../../external/Dialog/Dialog"

interface ModalProps {
    trigger: React.ReactNode;
    title: string;
    description?: string;
    children: React.ReactNode;
}

export const Modal = ({
    trigger, 
    title, 
    description, 
    children, 
}: ModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
