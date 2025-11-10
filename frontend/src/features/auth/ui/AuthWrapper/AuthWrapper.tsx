import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/external/Card/Card"
import { AuthWrapperProps } from "../../model/types/AuthWrapperProps"
import { Button } from "@/shared/ui/external/Button/Button"
import Link from "next/link"

export const AuthWrapper = ({children, btnLabel, btnHref}: AuthWrapperProps) => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <Card className='max-w-[500px] w-full p-6'>
                <CardHeader className='flex flex-col justify-center items-center gap-8 gap-x-4 pb-10'>
                    <h1 className='font-bold text-2xl'>Rivere</h1>
                </CardHeader>
                <CardContent>{children}</CardContent>
                <CardFooter>
                    {btnLabel && btnHref ? (
                        <Button 
                            type="submit" 
                            variant="ghost"
                            className='w-full mt-5'
                        >
                            <Link href={btnHref}>{btnLabel}</Link>
                        </Button>
                    ) : null}
                </CardFooter>
            </Card>
        </div>
    )
}