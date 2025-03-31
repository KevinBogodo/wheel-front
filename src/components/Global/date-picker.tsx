import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Calendar } from '../ui/calendar'
import { Label } from '../ui/label'

type Props = {
    label: string,
    title: string,
    type?: string,
    value: any,
    minDate?: string,
    limitDate?: string,
    onChange: (val: any) => void,
    onBlur?: (val: any) => void,
} 

const DatePicker = ({label, title, type, value, minDate, limitDate, onChange, ...props}: Props) => {
    const [open, setOpen] = useState(false)

    return (
        <div className='flex flex-col'>
            <Label className='p-2'>
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className='w-full' asChild>
                    <Button
                        variant='outline'
                        className={'w-full justify-start text-left font-normal'+ !value && "text-muted-foreground"}
                    >
                        <CalendarIcon />
                        {type === 'month' ?
                            value ?
                                format(value, "MMMM yyyy", { locale: fr })
                                : <span> {title}</span>
                            : value ?
                                format(value, "dd MMMM yyyy", { locale: fr })
                                : <span> {title}</span>
                        }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(val) => {
                        onChange(val);
                        setOpen(false);
                    }}
                    initialFocus
                    disabled={(day) => 
                        (minDate ? day < new Date(minDate) : false) || 
                        (limitDate ? day > new Date(limitDate) : day > new Date())
                    }
                    captionLayout="dropdown-buttons"
                    fromYear={2025}
                    {...props}
                />
                </PopoverContent>
            </Popover>
        </div>
  )
}

export default DatePicker