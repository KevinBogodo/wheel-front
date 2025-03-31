import { useCallback, useEffect, useMemo, useState } from 'react';
import { getRoles, getUsers, createUser, updateUser, deleteUser, resetUserPassword } from '@/slice/thunks';
import { AppDispatch } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup'

import { pagedObject, role, user } from '@/helper/global_interface';

import { Ban, CirclePlus, KeyRound, Pencil, RefreshCcwDot, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DataTable from '@/components/Global/DataTable';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import ConfirmDialog from '@/components/Global/Home/ConfirmDialog';
import AppContent from '@/components/Global/app-content';

interface RootState {
  Application: {
      users: pagedObject,
      roles: Array<role>,
      user: user,
      userActionSuccess: boolean,
      error:string,
  }
};

const UserSetting = () => {
  const currentUserRole = JSON.parse(localStorage.getItem('role') || '');
  const dispatch:AppDispatch = useDispatch();
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
  const { users, roles, user, userActionSuccess, error } = useSelector(ApplicationProperties);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [resetPasswordDialog, setResetPasswordDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState<user>();


  const loadRole = useCallback(() => {
    dispatch(getRoles());
  },[]);

  const loadUsers = useCallback((page?:number, size?:number) => {
      let config = {
        page: (page || 1).toString(),
        size: (size || 10).toString(),
      };
      dispatch(getUsers(config))
  },[]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: currentUser?.name || '',
      lastName: currentUser?.lastName || '',
      username: currentUser?.username || '',
      password: '',
      roleId: currentUser?.role?.id || ''
    },

    validationSchema: Yup.object({
      name: Yup.string().required("le nom d'utilisateur est obligatoire"),
      username: Yup.string().required("l'identifiant est obligatoire"),
      roleId: Yup.string().required('le role est obligatoire'),
    }),

    onSubmit: (values) => {
      if (isEdit) {
        let param = {
          id: currentUser?.id || '',
          body: {
            name : values.name,
            lastName: values.lastName,
            username: values.username,
            roleId: values.roleId
          }
        }
        
        dispatch(updateUser(param));

      } else {
        let param = {
          name : values.name,
          lastName: values.lastName,
          username: values.username,
          password: values.username,
          roleId: values.roleId
        }
        dispatch(createUser(param))
      }
    }
  });

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentUser(undefined);
    setIsEdit(false);
    validation.resetForm();
  };

  const handleSelectEditUser = (data:user) => {
      setCurrentUser(data);
      setIsEdit(true);
      setIsDialogOpen(true);
  }

  const handleResetSelectedUser = (data:user) => {
    setCurrentUser(data);
    setResetPasswordDialog(prev => !prev);
  }

  const handleSelectDeleteUser = (data:user) => {
    setCurrentUser(data);
    setDeleteDialog(true);
  }

  const confirmDeleteUser = () => {
    dispatch(deleteUser(currentUser?.id || ''))
  }

  const confirmResetUserPassword = () => {
    dispatch(resetUserPassword(currentUser?.id || ''))
  }

  useEffect(() => {
    loadRole()
    loadUsers()
  },[dispatch])

  useEffect(() => {
    if (userActionSuccess && !error) {
      loadUsers();
      handleDialogClose();
      setDeleteDialog(false);
      setResetPasswordDialog(false);
    }
  },[userActionSuccess, user]);


  const columns = useMemo(() => [
    {
      header: 'Nom',
      accessor: 'name',
      style: 'font-medium',
      cell: null
    },
    {
      header: 'Prenom',
      accessor: 'lastName',
      style: '',
      cell: null
    },
    {
      header: 'Identifiant',
      accessor: 'username',
      style: '',
      cell: null
    },
    {
      header: 'Role',
      accessor: 'role.name',
      style: '',
      cell: null
    },
    {
      header: 'Action',
      accessor: 'action',
      style: '',
      cell: (cellProps:any) => {
        return (
          <AppContent className="d-flex items-end text-right">
              <ul className='inline-flex mb-0 gap-2'>
                {(currentUserRole == 'Root') || (currentUserRole == 'admin') || (currentUserRole == 'support') ?
                  <>
                    <li className='' title='Edit'>
                      <Link
                        to='#'
                        className=''
                        onClick={() => { const userData = cellProps.row; handleSelectEditUser(userData) }}
                      >
                        <Pencil className='w-4 h-4 text-primary'/>
                      </Link>
                    </li>
                    <li className='' title='resetPassword'>
                      <Link
                        to='#'
                        className=''
                        onClick={() => { const userData = cellProps.row; handleResetSelectedUser(userData) }}
                      >
                        <KeyRound className='w-4 h-4 text-primary'/>
                      </Link>
                    </li>
                  </>
                  : null
                }
                { (currentUserRole == 'admin') || (currentUserRole == 'Root') ?
                    <li className='' title='Delete'>
                      <Link
                        to='#'
                        className=''
                        onClick={() => { const userData = cellProps.row; handleSelectDeleteUser(userData) }}
                      >
                        <Trash2 className='w-4 h-4 text-destructive'/>
                      </Link>
                    </li>
                    : null
                }
              </ul>
          </AppContent>)
      }
    }
  ],[handleSelectEditUser, handleResetSelectedUser, handleSelectDeleteUser])


  return (
    <AppContent className='flex flex-col p-2 w-full h-full'>
      {/* Header page */}
      <AppContent className='inline-flex items-center justify-between p-2'>
        <AppContent className='text-start'>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Gestion des utilisateurs</h4>
        </AppContent>
        <AppContent className='text-end'>
          {(currentUserRole == 'Root') || (currentUserRole == 'admin') || (currentUserRole == 'support') ?
            <Button onClick={() => {setIsDialogOpen(true); setCurrentUser(undefined)}}>
              <CirclePlus className='w-20 h-20'/>
              Ajouter un utilisateur
            </Button>
            : null
          }
        </AppContent>
      </AppContent>

      <Separator className="my-5" />
      <AppContent className='w-full h-full'>
        {users && users.currentPage ?
          <DataTable  
            type='paged' 
            content= {users}
            columns= {columns}
            loadData = {loadUsers}
          />
          :
          <AppContent className='w-full h-full content-center align-middle items-center text-center'>
                  <h5 className="scroll-m-20 text-xl font-semibold tracking-tight"> Aucune donnée disponible</h5>
          </AppContent>
        }
      </AppContent>

      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && handleDialogClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEdit
                ? "Modification de l'utilisateur"
                : "Creation d'utilisateur"

              }
                
            </DialogTitle>
            <DialogDescription> 
              {isEdit 
                ? "Avec ce formulaire vous aller modifier l'utilisateur"
                : "Avec ce formulaire vous aller creer un nouvel utilisateur"
              }
              
            </DialogDescription>
          </DialogHeader>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <AppContent className="grid grid-cols-2 gap-2 py-2">
                <AppContent>
                  <Label htmlFor='name'>
                    Nom<span className='text-destructive'>*</span>
                  </Label>
                  <Input 
                    id='name' 
                    name='name' 
                    value={validation.values.name || ''}
                    type='text'
                    autoCapitalize='none'
                    autoComplete='off'
                    autoCorrect='off'
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    aria-invalid={validation.touched.name && !!validation.errors.name}
                  />
                  {validation.errors.name && validation.touched.name && (
                    <p className="text-destructive text-xs">{validation.errors.name}</p>
                  )}
                </AppContent>

                <AppContent>
                  <Label htmlFor='lastName'>
                  Prénom
                  </Label>
                  <Input 
                    id='lastName' 
                    name='lastName' 
                    value={validation.values.lastName || ''}
                    type='text'
                    autoCapitalize='none'
                    autoComplete='off'
                    autoCorrect='off'
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    aria-invalid={validation.touched.lastName && !!validation.errors.lastName}
                  />
                </AppContent>

                <AppContent>
                  <Label htmlFor='username'>
                    Identifiant<span className='text-destructive'>*</span>
                  </Label>
                  <Input 
                    id='username' 
                    name='username' 
                    value={validation.values.username || ''}
                    type='text'
                    autoCapitalize='none'
                    autoComplete='off'
                    autoCorrect='off'
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    aria-invalid={validation.touched.username && !!validation.errors.username}
                  />
                  {validation.errors.username && validation.touched.username && (
                    <p className="text-destructive text-xs">{validation.errors.username}</p>
                  )}
                </AppContent>

                <AppContent >
                  <Label htmlFor='roleId'>
                  Rôle<span className='text-destructive'>*</span>
                  </Label>
                  <Select 
                    name='roleId'
                    value={validation.values.roleId || ''}
                    onValueChange={(value) => validation.setFieldValue('roleId', value)}
                  >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currentUserRole === 'admin' ||  currentUserRole === 'Root' ? 
                      roles && roles.filter(role => role.name !== 'Root').map((role: {id:string, name:string}) => (
                        <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                      ))
                      :
                      roles && roles.filter(role => (role.name !== 'Root' && role.name !== 'admin' )).map((role: {id:string, name:string}) => (
                        <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                      ))
                  }
                  </SelectContent>
                </Select>
                {validation.errors.roleId && validation.touched.roleId && (
                  <p className="text-destructive text-xs">{validation.errors.roleId}</p>
                )}
                </AppContent>
              </AppContent>


              <Separator className='my-3' />
              <DialogFooter>
                <AppContent className=' w-full inline-flex justify-end gap-2'>
                  <AppContent className='col-span-2'>
                    <Button type='button' variant='secondary' onClick={() => handleDialogClose()}>
                      <Ban className='w-20 h-20'/>
                      Annuler
                    </Button>
                  </AppContent>
                  <AppContent className='col-span-2'>
                    <Button type='submit'>
                      <Save className='w-20 h-20'/>
                      Enregistrer
                    </Button>
                  </AppContent>
                  
                </AppContent>
              </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <ConfirmDialog 
        open={deleteDialog} 
        className='bg-destructive' 
        Icon={Trash2} 
        close={setDeleteDialog}
        action={confirmDeleteUser}
      >
        Vous êtes sur le point de supprimer définitivement cet utilisateur.
      </ConfirmDialog>

      {/* Reset password */}
      <ConfirmDialog 
        open={resetPasswordDialog} 
        className='bg-orange-400' 
        Icon={RefreshCcwDot} 
        close={setResetPasswordDialog}
        action={confirmResetUserPassword}
      >
        Vous êtes sur le point de réinitialiser le mot de passe de cet utilisateur.
      </ConfirmDialog>
    </AppContent>

  )
}

export default UserSetting