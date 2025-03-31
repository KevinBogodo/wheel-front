import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    className?: string;
    ref?: any
}

const AppContent = ({children, ...props }: Props) => {
  return (
    <div {...props}>
        {children}
    </div>
  )
}

export default AppContent;