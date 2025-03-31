import { CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { Collapsible } from '@radix-ui/react-collapsible';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
    items: {
        title: string;
        active: string;
        url: string;
        icon?: LucideIcon;
        items?: {
            title: string;
            url: string;
        }[];
    }[]
}

const NavMain = ({ items }: Props) => {
    const location = useLocation();
    const path = location.pathname.split('/')

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarMenu>
                {items && items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={path[1] === item.active}
                        className='group/collapsible'
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.title}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                <Link
                                                    to={subItem.url} 
                                                    className={path[2] === subItem.url.split('/')[2] ? 'bg-accent text-primary': ''}>
                                                    <span>{subItem.title}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}

export default NavMain