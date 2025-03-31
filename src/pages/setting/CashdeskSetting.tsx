import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCashdesks, createCashdesk, updateCashdesk, deleteCashdesk } from '@/slice/thunks';
import { AppDispatch } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup'

import { pagedObject, cashdesk } from '@/helper/global_interface';

import { Ban, CirclePlus, Pencil, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DataTable from '@/components/Global/DataTable';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import ConfirmDialog from '@/components/Global/Home/ConfirmDialog';
import AppContent from '@/components/Global/app-content';
interface RootState {
  Application: {
      cashdesks: pagedObject,
      cashdesk: cashdesk,
      cashdeskActionSuccess: boolean,
      error:string,
  }
};


const CashdeskSetting = () => {
  const currentUserRole = JSON.parse(localStorage.getItem('role') || '');
  const dispatch:AppDispatch = useDispatch();
  const selectLayoutState = (state:RootState) => state.Application
  const ApplicationProperties = createSelector(
    selectLayoutState,
    (app) => ({
      cashdesks: app.cashdesks,
      cashdesk: app.cashdesk,
      cashdeskActionSuccess: app.cashdeskActionSuccess,
      error: app.error
    })
  );
  const { cashdesks, cashdesk, cashdeskActionSuccess, error } = useSelector(ApplicationProperties);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCashdesk, setCurrentCashdesk] = useState<cashdesk>();


  const loadCashdesks = useCallback((page?:number, size?:number) => {
      let config = {
        page: (page || 1).toString(),
        size: (size || 10).toString(),
      };
      dispatch(getCashdesks(config))
  },[]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: currentCashdesk?.name || '',
    },

    validationSchema: Yup.object({
      name: Yup.string().required("le nom de la caisse est obligatoire"),
    }),

    onSubmit: (values) => {
      if (isEdit) {
        let param = {
          id: currentCashdesk?.id || '',
          body: {
            name : values.name
          }
        }
        dispatch(updateCashdesk(param));
      } else {
        let param = {
          name : values.name,
        }
        dispatch(createCashdesk(param))
      }
    }
  });

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentCashdesk(undefined);
    setIsEdit(false);
    validation.resetForm();
  };

  const handleSelectEditUser = (data:cashdesk) => {
    
      setCurrentCashdesk(data);
      setIsEdit(true);
      setIsDialogOpen(prev => !prev);
  }

  const handleSelectDeleteUser = (data:cashdesk) => {
    setCurrentCashdesk(data);
    setDeleteDialog(prev => !prev);
    setDeleteDialog(true);
  }

  const confirmDeleteUser = () => {
    dispatch(deleteCashdesk(currentCashdesk?.id || ''))
  }


  useEffect(() => {
    loadCashdesks()
  },[dispatch])

  useEffect(() => {
    if (cashdeskActionSuccess && !error) {
      loadCashdesks();
      handleDialogClose();
      setDeleteDialog(false);
    }
  },[cashdeskActionSuccess, cashdesk]);


  const columns = useMemo(() => [
    {
      header: 'Nom',
      accessor: 'name',
      style: 'font-medium',
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
                        onClick={() => { const cashdeskData = cellProps.row; handleSelectEditUser(cashdeskData) }}
                      >
                        <Pencil className='w-4 h-4 text-primary'/>
                      </Link>
                    </li>
                  </>
                  : null
                }
                {(currentUserRole == 'admin') || (currentUserRole == 'Root') ?
                  <li className='' title='Delete'>
                    <Link
                      to='#'
                      className=''
                      onClick={() => { const cashdeskData = cellProps.row; handleSelectDeleteUser(cashdeskData) }}
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
  ],[handleSelectEditUser, handleSelectDeleteUser])


  return (
    <AppContent className='flex flex-col p-2 w-full h-full'>
      {/* Header page */}
      <AppContent className='inline-flex items-center justify-between p-2'>
        <AppContent className='text-start'>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Gestion des caisses</h4>
        </AppContent>
        <AppContent className='text-end'>
          {(currentUserRole == 'Root') || (currentUserRole == 'admin') ?
            <Button onClick={() => {setIsDialogOpen(true); setCurrentCashdesk(undefined)}}>
              <CirclePlus className='w-20 h-20'/>
              Ajouter une caisse
            </Button>
            : null
          }
        </AppContent>
      </AppContent>

      <Separator className="my-5" />
      <AppContent className='w-full h-full'>
        {cashdesks && cashdesks.currentPage ?
          <DataTable  
            type='paged' 
            content= {cashdesks}
            columns= {columns}
            loadData = {loadCashdesks}
          />
          :
          <h5>Aucune donnée disponible</h5>
        }
      </AppContent>

      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && handleDialogClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEdit
                ? "Modification de la caisse"
                : "Creation de caisse"

              }
                
            </DialogTitle>
            <DialogDescription> 
              {isEdit 
                ? "Avec ce formulaire vous aller modifier la caisse"
                : "Avec ce formulaire vous aller creer une nouvelle caisse"
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
              <AppContent className="grid gap-2 py-2">
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
        Vous êtes sur le point de supprimer définitivement cette caisse.
      </ConfirmDialog>

    </AppContent>

  )
}

export default CashdeskSetting