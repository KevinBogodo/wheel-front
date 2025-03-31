import NavMain from '@/components/App/nav/nav-main'
import NavUser from '@/components/App/nav/nav-user'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import { updatePassword } from '@/slice/thunks';
import { AppDispatch, RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { Ban, BookText, Computer, Save, Settings2 } from 'lucide-react'
import { ComponentProps, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface SidebarProps extends ComponentProps<typeof Sidebar> {
  logout: () => void;
  closeDesk: () => void;
}

const data = {
  admin: [
    {
      title: 'Caisse',
      active: 'caisse',
      url: '#',
      icon: Computer,
      items: [
        {
          title: 'Paris',
          url: '/caisse/paris',
        },
        {
          title: 'Historique',
          url: '/caisse/historique',
        },
        {
          title: 'Lots',
          url: '/caisse/lots',
        },
      ],
    },
    {
      title: 'Rapport',
      active: 'rapport',
      url: '#',
      icon: BookText,
      items: [
        {
          title: 'Ventes',
          url: '/rapport/vente',
        },
        {
          title: 'Retraits',
          url: '/rapport/retrait',
        },
        {
          title: 'Statistics',
          url: '/rapport/statistics',
        },
      ],
    },
    {
      title: 'Paramètres',
      active: 'parametres',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Utilisateurs',
          url: '/parametres/utilisateurs',
        },
        {
          title: 'Caisses',
          url: '/parametres/caisses',
        },
        {
          title: 'Cagnottes',
          url: '/parametres/cagnottes',
        },
      ],
    },
  ],

  cashier: [
    {
      title: 'Caisse',
      active: 'caisse',
      url: '#',
      icon: Computer,
      items: [
        {
          title: 'Paris',
          url: '/caisse/paris',
        },
        {
          title: 'Retraits',
          url: '/caisse/retrait',
        },
        {
          title: 'Historique',
          url: '/caisse/historique',
        },
      ],
    }
  ],

  manager: [
    {
      title: 'Caisse',
      active: 'caisse',
      url: '#',
      icon: Computer,
      items: [
        {
          title: 'Historique',
          url: '/caisse/historique',
        },
        {
          title: 'Lots',
          url: '/caisse/lots',
        },
      ],
    },
    {
      title: 'Rapport',
      active: 'rapport',
      url: '#',
      icon: BookText,
      items: [
        {
          title: 'Ventes',
          url: '/rapport/vente',
        },
        {
          title: 'Retraits',
          url: '/rapport/retrait',
        },
        {
          title: 'Statistics',
          url: '/rapport/statistics',
        },
      ],
    }
  ],

  support: [
    {
      title: 'Paramètres',
      active: 'parametres',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Utilisateurs',
          url: '/parametres/utilisateurs',
        },
        {
          title: 'Caisses',
          url: '/parametres/caisses',
        }
      ],
    },
  ],

  Root: [
    {
      title: 'Caisse',
      active: 'caisse',
      url: '#',
      icon: Computer,
      items: [
        {
          title: 'Historique',
          url: '/caisse/historique',
        },
        {
          title: 'Lots',
          url: '/caisse/lots',
        },
      ],
    },
    {
      title: 'Rapport',
      active: 'rapport',
      url: '#',
      icon: BookText,
      items: [
        {
          title: 'Ventes',
          url: '/rapport/vente',
        },
        {
          title: 'Retraits',
          url: '/rapport/retrait',
        },
        {
          title: 'Statistics',
          url: '/rapport/statistics',
        },
      ],
    },
    {
      title: 'Paramètres',
      active: 'parametres',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Utilisateurs',
          url: '/parametres/utilisateurs',
        },
        {
          title: 'Caisses',
          url: '/parametres/caisses',
        },
        {
          title: 'Cagnottes',
          url: '/parametres/cagnottes',
        },
        // {
        //   title: 'Tirages',
        //   url: '/parametres/tirages',
        // },
        // {
        //   title: 'Générals',
        //   url: '/parametres/generals',
        // },
      ],
    },
  ],
}

const AppSidebar = ({logout, closeDesk, ...props}: SidebarProps) => {
  const dispatch:AppDispatch = useDispatch();
  const role = localStorage.getItem('role');
  const currentUserRole = role ? JSON.parse(role) : null;
  const [modal, setModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const selectLayoutState = (state:RootState) => state.Application
  const ApplicationProperties = createSelector(
    selectLayoutState,
    (app) => ({
      users: app.users,
      roles: app.roles,
      user: app.user,
      userActionSuccess: app.userActionSuccess,
      error: app.error
    })
  );
  const { user, userActionSuccess, error } = useSelector(ApplicationProperties);
  


  const toggle = useCallback(() => {    
    if (modal) {
      setModal(false);
      setPassword('');
    } else {
      setModal(true);
    }
  },[modal]);

  const handleChangePassword = useCallback(() => {
    setPassword('');
    setModal(true);
  },[password])

  const handleUpdatePassword = useCallback(() => {
      let param = {
        password: password
      };
      dispatch(updatePassword(param))
  },[password]);

  useEffect(() => {
    
    if (userActionSuccess && !error) {
      setModal(false);
      setPassword('');
    }
  },[userActionSuccess, user]);

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        {/* LotoApp */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data[currentUserRole as keyof typeof data]} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser currentUserRole={currentUserRole} logout={logout} closeDesk={closeDesk} changePassword={handleChangePassword}/>
      </SidebarFooter>

      <Dialog open={modal} onOpenChange={(open) => !open && toggle()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modification du mot de passe</DialogTitle>
            <DialogDescription> Avec ce formulaire vous pouvez modifier votre mot de passe de connexion.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <div>
              <Label htmlFor='name'>
                Nouveau mot de passe <span className='text-destructive'>*</span>
              </Label>
              <Input 
                id='name' 
                name='name' 
                value={password}
                type='text'
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect='off'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Separator className='my-3' />
          <DialogFooter>
            <div className=' w-full inline-flex justify-end gap-2'>
            <div className='col-span-2'>
              <Button type='button' variant='secondary' onClick={() => toggle()}>
                <Ban className='w-20 h-20'/>
                Annuler
              </Button>
            </div>
            <div className='col-span-2'>
              <Button type='submit' onClick={() => handleUpdatePassword()}>
                <Save className='w-20 h-20'/>
                Enregistrer
              </Button>
            </div>
            </div>
          </DialogFooter>
        </DialogContent>

      </Dialog>
    </Sidebar>
  )
}

export default AppSidebar