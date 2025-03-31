import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { fr } from 'date-fns/locale'
import { Calendar } from '../ui/calendar'
import { Label } from '../ui/label'
import { format, setHours, setMinutes, getHours, getMinutes } from "date-fns";

type Props = {
    label: string,
    title: string,
    type?: "date" | "datetime",
    value: any,
    name: string,
    onChange: (event: { target: { name: string; value: Date } }) => void;
    onBlur?: (event: { target: { name: string } }) => void;
}

const DatePickerForm = ({label, title, type, value, onChange, onBlur, ...props}: Props) => {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<any | null>(value || null);
    const [selectedHour, setSelectedHour] = useState<number>(getHours(value || new Date()));
    const [selectedMinute, setSelectedMinute] = useState<number>(getMinutes(value || new Date()));

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            const updatedDate = setMinutes(setHours(date, selectedHour), selectedMinute);
            setSelectedDate(updatedDate);
            onChange({ target: { name: props.name, value: updatedDate } });
            setOpen(false);
        }
    };

    const handleTimeChange = (hour: number, minute: number) => {
        if (selectedDate) {
            const updatedDate = setMinutes(setHours(selectedDate, hour), minute);
            setSelectedDate(updatedDate);
            setSelectedHour(hour);
            setSelectedMinute(minute);
            onChange({ target: { name: props.name, value: updatedDate } });
        }
    };

    return (
        <div className='flex flex-col'>
            <Label className='p-2'>
                {label}
            </Label>
            <div className='inline-flex gap-2'>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger className='w-full' asChild>
                        <Button
                            variant='outline'
                            className={'w-full justify-start text-left font-normal'+ !value && "text-muted-foreground"}
                        >
                            <CalendarIcon />
                            {type === 'date' ?
                                value ?
                                    format(value, "dd MMMM yyyy", { locale: fr })
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
                        selected={selectedDate}
                        onSelect={handleDateChange}
                        initialFocus
                        disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                        captionLayout="dropdown-buttons"
                        fromYear={2025}
                        {...props}
                    />
                    </PopoverContent>
                </Popover>
                {type === "datetime" && selectedDate && (
                    <div className="flex space-x-2 items-center bg-background border rounded-md px-1">
                        <ClockIcon className="w-5 h-5" />
                        <select
                            value={selectedHour}
                            onChange={(e) => handleTimeChange(Number(e.target.value), selectedMinute)}
                            className="border rounded-md p-1 bg-background"
                        >
                            {Array.from({ length: 24 }, (_, i) => (
                                <option key={i} value={i}>
                                    {i.toString().padStart(2, "0")}
                                </option>
                            ))}
                        </select>
                        <span>:</span>
                        <select
                            value={selectedMinute}
                            onChange={(e) => handleTimeChange(selectedHour, Number(e.target.value))}
                            className="border rounded-md p-1 bg-background"
                        >
                            {Array.from({ length: 60 }, (_, i) => (
                                <option key={i} value={i}>
                                    {i.toString().padStart(2, "0")}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DatePickerForm