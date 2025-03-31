import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAllJackpotConfigs, getJackpotConfigs, createJackpotConfig, updateJackpotConfig, deleteJackpotConfig } from '@/slice/thunks';
import { AppDispatch } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup'

import { pagedObject, jackpotConfig } from '@/helper/global_interface';

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
import { formatNumberWithComma } from '@/helper/globalFunction';


interface RootState {
  Application: {
      jackpotConfigs: pagedObject,
      jackpotConfig: jackpotConfig,
      allJackpotConfigs: any,
      jackpotConfigActionSuccess: boolean,
      error:string,
  }
};

const JackpotConfig = () => {
    const currentUserRole = JSON.parse(localStorage.getItem('role') || '');
    const dispatch:AppDispatch = useDispatch();
    const selectLayoutState = (state:RootState) => state.Application
    const ApplicationProperties = createSelector(
      selectLayoutState,
      (app) => ({
        jackpotConfigs: app.jackpotConfigs,
        jackpotConfig: app.jackpotConfig,
        jackpotConfigActionSuccess: app.jackpotConfigActionSuccess,
        error: app.error
      })
    );
    const { jackpotConfigs, jackpotConfig, jackpotConfigActionSuccess, error } = useSelector(ApplicationProperties);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentConfig, setCurrentConfig] = useState<jackpotConfig>();
  
    const loadJackpotConfig = useCallback((page?:number, size?:number) => {
        let config = {
          page: (page || 1).toString(),
          size: (size || 10).toString(),
        };
        dispatch(getJackpotConfigs(config))
    },[]);
  
    const loadAllJackpotConfig = useCallback(() => {
      dispatch(getAllJackpotConfigs())
    },[]);
  
    const validation = useFormik({
      enableReinitialize: true,
  
      initialValues: {
        name: currentConfig?.name || '',
        amount: currentConfig?.amount || 0,
      },
  
      validationSchema: Yup.object({
        name: Yup.string().required("le nom est obligatoire"),
        amount: Yup.number().required("le montant est obligatoire"),
      }),
  
      onSubmit: (values) => {
        
        if (isEdit) {
          let param = {
            id: currentConfig?.id || '',
            body: {
              name : values.name,
              amount : values.amount
            }
          }
          dispatch(updateJackpotConfig(param));
        } else {
          let param = {
            name : values.name,
            amount : values.amount
          }
          dispatch(createJackpotConfig(param))
        }
      }
    });
  
    const handleDialogClose = () => {
      setIsDialogOpen(false);
      setCurrentConfig(undefined);
      setIsEdit(false);
      validation.resetForm();
    };
  
    const handleSelectEditConfig = (data:jackpotConfig) => {
        setCurrentConfig(data);
        setIsEdit(true);
        setIsDialogOpen(prev => !prev);
    }
  
    const handleSelectDeleteConfig = (data:jackpotConfig) => {
      setCurrentConfig(data);
      setDeleteDialog(prev => !prev);
      setDeleteDialog(true);
    }
  
    const confirmDeleteConfig = () => {
      dispatch(deleteJackpotConfig(currentConfig?.id || ''))
    }
  
    useEffect(() => {
      loadJackpotConfig();
      loadAllJackpotConfig();
    },[dispatch])
  
    useEffect(() => {
      if (jackpotConfigActionSuccess && !error) {
        loadJackpotConfig();
        handleDialogClose();
        setDeleteDialog(false);
      }
    },[jackpotConfigActionSuccess, jackpotConfig]);
  
  
    const columns = useMemo(() => [
      {
        header: 'Nom',
        accessor: 'name',
        style: 'font-medium',
        cell: null
      },
      {
        header: 'Montant',
        accessor: 'amount',
        style: '',
        cell: (cellProps:any) => {
          return <p> {formatNumberWithComma(cellProps.row.amount)} Fcfa</p>
        }
      },
      {
        header: 'Action',
        accessor: 'action',
        style: '',
        cell: (cellProps:any) => {
          return (
            <AppContent className="d-flex items-end text-right">
                <ul className='inline-flex mb-0 gap-2'>
                  {(currentUserRole == 'Root') || (currentUserRole == 'admin') ?
                    <>
                      <li className='' title='Edit'>
                        <Link
                          to='#'
                          className=''
                          onClick={() => { const cashdeskData = cellProps.row; handleSelectEditConfig(cashdeskData) }}
                        >
                          <Pencil className='w-4 h-4 text-primary'/>
                        </Link>
                      </li>
                      <li className='' title='Delete'>
                      <Link
                        to='#'
                        className=''
                        onClick={() => { const cashdeskData = cellProps.row; handleSelectDeleteConfig(cashdeskData) }}
                      >
                        <Trash2 className='w-4 h-4 text-destructive'/>
                      </Link>
                    </li>
                    </>
                    : null
                  }
                </ul>
            </AppContent>)
        }
      }
    ],[handleSelectEditConfig, handleSelectDeleteConfig])
  
  
    return (
      <AppContent className='flex flex-col p-2 w-full h-full'>
        {/* Header page */}
        <AppContent className='inline-flex items-center justify-between p-2'>
          <AppContent className='text-start'>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Gestion des cagnottes</h4>
          </AppContent>
          <AppContent className='inline-flex gap-2 text-end'>
            {(currentUserRole == 'Root') || (currentUserRole == 'admin') || (currentUserRole == 'manager') ?
              <>
                <Button onClick={() => {setIsDialogOpen(true); setCurrentConfig(undefined)}}>
                  <CirclePlus className='w-20 h-20'/>
                  Ajouter une cagnotte
                </Button>
              </>
              : null
            }
          </AppContent>
        </AppContent>
  
        <Separator className="my-5" />
        <AppContent className='w-full h-full'>
          {jackpotConfigs && jackpotConfigs.currentPage ?
            <DataTable
              type='paged'
              content= {jackpotConfigs}
              columns= {columns}
              loadData = {loadJackpotConfig}
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
                  ? "Modification de la cagnotte"
                  : "Creation de cagnotte"
                }
              </DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Avec ce formulaire vous aller modifier la cagnotte"
                  : "Avec ce formulaire vous aller creer une nouvelle cagnotte"
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
                    <Label htmlFor='amount'>
                      Montant<span className='text-destructive'>*</span>
                    </Label>
                    <Input 
                      id='amount' 
                      name='amount' 
                      value={validation.values.amount || ''}
                      type='number'
                      autoCapitalize='none'
                      autoComplete='off'
                      autoCorrect='off'
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      aria-invalid={validation.touched.amount && !!validation.errors.amount}
                    />
                    {validation.errors.amount && validation.touched.amount && (
                      <p className="text-destructive text-xs">{validation.errors.amount}</p>
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
          action={confirmDeleteConfig}
        >
          Vous êtes sur le point de supprimer définitivement cette cagnotte.
        </ConfirmDialog>
      </AppContent>
    )
}

export default JackpotConfig