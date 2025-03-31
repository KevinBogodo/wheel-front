import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAllJackpotConfigs, getJackpots, updateJackpot, createJackpot } from '@/slice/thunks';
import { AppDispatch } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup'

import { pagedObject } from '@/helper/global_interface';

import { Ban, CirclePlus, Pencil, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DataTable from '@/components/Global/DataTable';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import AppContent from '@/components/Global/app-content';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatNumberWithComma } from '@/helper/globalFunction';
import DatePickerForm from '@/components/Global/date-picker-form';
import moment from 'moment';


interface RootState {
  Application: {
      jackpots: pagedObject,
      jackpot: any,
      allJackpotConfigs: any,
      drawJackpotSuccess: boolean,
      error:string,
  }
};
const JackpotDraw = () => {
    const currentUserRole = JSON.parse(localStorage.getItem('role') || '');
    const dispatch:AppDispatch = useDispatch();
    const selectLayoutState = (state:RootState) => state.Application
    const ApplicationProperties = createSelector(
      selectLayoutState,
      (app) => ({
        jackpots: app.jackpots,
        jackpot: app.jackpot,
        allJackpotConfigs: app.allJackpotConfigs,
        drawJackpotSuccess: app.drawJackpotSuccess,
        error: app.error
      })
    );
    const { allJackpotConfigs, jackpots, jackpot, drawJackpotSuccess, error } = useSelector(ApplicationProperties);
    const [jackpotDialog, setJackpotDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentJackpot, setCurrentJackpot] = useState<any>();
  
    const loadJackpots = useCallback((page?:number, size?:number) => {
        let config = {
          page: (page || 1).toString(),
          size: (size || 10).toString(),
        };
        dispatch(getJackpots(config))
    },[]);
  
    const loadAllJackpotConfig = useCallback(() => {
      dispatch(getAllJackpotConfigs())
    },[]);
  
    const validation = useFormik({
      enableReinitialize: true,
  
      initialValues: {
        date: currentJackpot?.date || '',
        time: currentJackpot?.time || '',
        configId: currentJackpot?.configId || '',
      },
  
      validationSchema: Yup.object({
        configId: Yup.string().required("la cagnotte est obligatoire"),
      }),

      onSubmit: (values) => {
        if (isEdit) {
          let param = {
            id: currentJackpot?.id || '',
            body: {
                date: values.date,
                configId : values.configId
            }
          }
          dispatch(updateJackpot(param));
        } else {
          let param = {
            date: values.date,
            configId : values.configId
          }
            console.log(values, isEdit);
            dispatch(createJackpot(param))
        }
      }
    });
  
    const handleDialogClose = () => {
      setJackpotDialog(false);
      setCurrentJackpot(undefined);
      setIsEdit(false);
      validation.resetForm();
    };
  
    const handleSelectEditJackpot = (data:any) => {
        setCurrentJackpot(data);
        setIsEdit(true);
        setJackpotDialog(true);
    }
  
    useEffect(() => {
      loadJackpots();
      loadAllJackpotConfig();
    },[dispatch])
  
    useEffect(() => {
      if (drawJackpotSuccess && !error) {
        loadJackpots();
        handleDialogClose();
      }
    },[drawJackpotSuccess, jackpot]);
  
  
    const columns = useMemo(() => [
        {
            header: 'Date',
            accessor: 'amount',
            style: 'font-medium',
            cell: (cellProps:any) => {
                return <p> {moment(cellProps.row.date).format('DD/MM/YYYY HH:mm')}</p>
            }
        },
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
                    {((currentUserRole === 'Root') || (currentUserRole === 'admin')) && cellProps.row.status === 0 ?
                        <>
                        <li className='' title='Edit'>
                            <Link
                            to='#'
                            className=''
                            onClick={() => { const jackpotData = cellProps.row; handleSelectEditJackpot(jackpotData) }}
                            >
                            <Pencil className='w-4 h-4 text-primary'/>
                            </Link>
                        </li>
                        </>
                        : null
                    }
                    </ul>
                </AppContent>)
            }
        }
    ],[handleSelectEditJackpot])

    return (
      <AppContent className='flex flex-col p-2 w-full h-full'>
        {/* Header page */}
        <AppContent className='inline-flex items-center justify-between p-2'>
          <AppContent className='text-start'>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Planification des cagnottes</h4>
          </AppContent>
          <AppContent className='inline-flex gap-2 text-end'>
            {(currentUserRole == 'Root') || (currentUserRole == 'admin') || (currentUserRole == 'manager') ?
              <>
                <Button onClick={() => {setJackpotDialog(true); setCurrentJackpot(undefined)}}>
                  <CirclePlus className='w-20 h-20'/>
                  Planifier une cagnotte
                </Button>
              </>
              : null
            }
          </AppContent>
        </AppContent>
  
        <Separator className="my-5" />
        <AppContent className='w-full h-full'>
          {jackpots && jackpots.currentPage ?
            <DataTable  
              type='paged'
              content= {jackpots}
              columns= {columns}
              loadData = {loadJackpots}
            />
            :
            <h5>Aucune donnée disponible</h5>
          }
        </AppContent>
  
        <Dialog open={jackpotDialog} onOpenChange={(open) => !open && handleDialogClose()}>
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
                  ? "Avec ce formulaire vous allez modifier la cagnotte"
                  : "Avec ce formulaire vous allez créer une nouvelle cagnotte"
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
            <AppContent className="grid grid-cols gap-2 py-2">
                <AppContent>
                    <Label htmlFor='configId'>
                        Choisir la cagnotte
                    </Label>
                    <Select
                        name='configId'
                        value={validation.values.configId || '' }
                        onValueChange={(value) => validation.setFieldValue('configId', value)}
                    >
                    <SelectTrigger>
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        {allJackpotConfigs && allJackpotConfigs.map((row: {id:string, name:string, amount: number}) => (
                            <SelectItem key={row.id} value={row.id}>{row.name} ({formatNumberWithComma(row.amount)} Fcfa)</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    {validation.errors.configId && validation.touched.configId && (
                        <p className="text-destructive text-xs">{typeof validation.errors.configId === 'string' ? validation.errors.configId : ''}</p>
                    )}
                </AppContent>

                <AppContent>
                    <DatePickerForm
                        label='Date et heure du tirage: '
                        title='Choisir'
                        name='date'
                        type='datetime'
                        value={validation.values.date || ''}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        aria-invalid={validation.touched.date && !!validation.errors.date}
                    />
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
  
      </AppContent>
    )
}

export default JackpotDraw