import { PropsWithChildren } from 'react'

interface RowBordProps extends PropsWithChildren {
  className?: string;
}

const RowBord = ({ children, className }: RowBordProps) => {
  return (
    <li>
        <ol className={'inline-flex w-full h-full gap-1'+className}>
            {children}
        </ol>
    </li>
  )
}

export default RowBord