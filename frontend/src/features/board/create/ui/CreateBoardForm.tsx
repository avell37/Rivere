'use client';
import { Button, DialogClose, DialogFooter, Input } from "@/shared/ui/external";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/external/Form/Form";
import { UseFormReturn } from "react-hook-form"

interface CreateBoardFormProps {
    form: UseFormReturn<any>,
    onSubmit: (data: any) => void;
};

export const CreateBoardForm = ({form, onSubmit}: CreateBoardFormProps) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input placeholder="Название доски" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Закрыть</Button>
                    </DialogClose>

                    <Button 
                        type="submit"
                        variant="outline"
                    >
                        Сохранить
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
