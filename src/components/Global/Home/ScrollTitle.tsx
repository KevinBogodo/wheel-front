import { PropsWithChildren } from 'react'



const ScrollTitle = ({className, id, title}: PropsWithChildren<{className?:string, title?:string, id?: string}>) => {
  return (
    <ul id={id || ""} className={className}>
      <li>
        <h1>{title}</h1>
      </li>
      <li>
        <h1>{title}</h1>
      </li>
      <li>
        <h1>{title}</h1>
      </li>
      <li>
        <h1>{title}</h1>
      </li>
      <li>
        <h1>{title}</h1>
      </li>
      <li>
        <h1>{title}</h1>
      </li>
    </ul>
  )
}

export default ScrollTitle