import { PropsWithChildren } from 'react'


const Section = ({className, id, children}: PropsWithChildren<{className?:string, id?: string}>) => {
  return (
    <section id={id || ""} className={'m-auto '+className}>
        {children}
    </section>
  )
}

export default Section