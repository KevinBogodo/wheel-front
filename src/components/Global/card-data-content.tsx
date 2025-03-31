import { PropsWithChildren } from "react"
import { Card, CardContent, CardTitle } from "../ui/card"


interface Props extends PropsWithChildren {
    title: string,
    className: string,
}

const CardDataContent = ({children, title, ...props}: Props) => {
  return (
    <Card {...props}>
        <CardContent className='m-auto py-[4%]'>
            <CardTitle className='text-md'>{title}</CardTitle>
            <p className='font-medium text-xl'>
                {children}
            </p>
        </CardContent>
    </Card>
  )
}

export default CardDataContent