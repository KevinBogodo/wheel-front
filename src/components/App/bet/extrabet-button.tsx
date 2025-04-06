import { Button } from '@/components/ui/button'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    disableAdd: boolean,
    editBet: any
    className?: string,
    bgColor?: string,
    textColor?: string,
    value?: any
}

const ExtrabetButton = ({children, disableAdd, editBet, className, bgColor, textColor, value}: Props) => {
  return (
    <button
        className={className}
        style={{ backgroundColor: bgColor, color: textColor }}
        disabled={disableAdd}
        onClick={
          () => {
            (typeof(value) === 'number') ?
              editBet(value)
            : 
              editBet(0, 'add', value)
          }
        }
    >
        {children}
    </button>
  )
}

export default ExtrabetButton