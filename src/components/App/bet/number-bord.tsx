import { Button } from "@/components/ui/button"
import { PropsWithChildren } from "react"


interface Props extends PropsWithChildren  {
    isDisabled?: boolean,
    onClick?: () => void,
    className?: string,
}

const NumberBord = ({children, isDisabled, className, ...props}: Props) => {
  return (
    <div className='w-full h-full text-center content-center'>
        <Button 
            disabled={isDisabled}
            className={className+" w-full h-full scroll-m-20 border-4 tracking-tight px-auto mb-0"}
            {...props}
        >
            {children}
        </Button>
    </div>
  )
}

export default NumberBord