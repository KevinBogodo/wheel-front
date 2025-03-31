import { PropsWithChildren } from 'react'
import AppContent from './app-content'

interface Props extends PropsWithChildren {
    className: string,
    title: string
}

const PageHeader = ({children, title, ...props}: Props) => {
  return (
    <AppContent {...props}>
        <AppContent className='text-start'>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {title}
            </h4>
          </AppContent>
        {children}
    </AppContent>
  )
}

export default PageHeader