import { Avatar } from '@/components/ui/avatar';
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronsUpDown, CircleUser, ComputerIcon, LogOut, ShieldCheck } from 'lucide-react';

type Props = {
    logout: () => void,
    closeDesk: () => void,
    changePassword: () => void,
    currentUserRole: string
}

const NavUser = ({ logout, closeDesk, changePassword, currentUserRole }: Props) => {
    const cashDesk = localStorage.getItem('cashDesk');
    const username = localStorage.getItem('username');
    const currentUsername = username ? JSON.parse(username) : null;

    const { isMobile } = useSidebar();

    return (
        <SidebarMenu> 
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='data-[state=open]: bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                        >
                            <Avatar className='h-8 w-8 rounded-lg'>
                                <CircleUser size={30} />
                            </Avatar>
                            <div className='grip flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-semibold'>{currentUsername}</span>
                            </div>
                            <ChevronsUpDown className='ml-auto size-4' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                        side={isMobile ? 'bottom' : 'right'}
                        align='end'
                        sideOffset={4}
                    >
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>

                            {currentUserRole === 'cashier' &&<DropdownMenuItem onClick={() => closeDesk()}>
                                <ComputerIcon />
                                <span className='font-bold'>{cashDesk} <span className='text-destructive'>(Fermer)</span></span>
                            </DropdownMenuItem>}
                            
                            <DropdownMenuItem onClick={() => changePassword()}>
                                <ShieldCheck />
                                Modifier le mot de passe
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        {currentUserRole !== 'cashier' && <DropdownMenuItem onClick={() => logout()}>
                            <LogOut />
                            Déconnexion
                        </DropdownMenuItem>}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
};

export default NavUser;