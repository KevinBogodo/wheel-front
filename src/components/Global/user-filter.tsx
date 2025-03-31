import { PropsWithChildren } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Props extends PropsWithChildren {
    newValue: string,
    setValue: (val:string) => void;
    data: any,
    className: string
}

const UserFilter = ({newValue, setValue, data, children, ...props}: Props) => {
  return (
    <div {...props}>
        <Select
            name='users'
            value={newValue}
            onValueChange={(value) => setValue(value)}
        >
            <SelectTrigger>
            <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='all'>Tous les utilisateurs</SelectItem>
                {data && data.filter((user: any) => user?.role.name === 'cashier').map((user: any) => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}

export default UserFilter