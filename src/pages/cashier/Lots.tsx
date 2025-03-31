import AppContent from "@/components/Global/app-content";
import DataTable from "@/components/Global/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { pagedObject } from "@/helper/global_interface";
import { getConfigLots, getLots, drawLots } from "@/slice/thunks";
import { AppDispatch, RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import { Ban, CirclePlus, Save } from "lucide-react";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from "@/components/ui/label";

const times:{ name: string, value: string}[] = [
    {name: '5 Min', value: '5'},
    {name: '10 Min', value: '10'},
    {name: '15 Min', value: '15'},
    {name: '20 Min', value: '20'},
    {name: '30 Min', value: '30'},
    {name: '40 Min', value: '40'},
    {name: '45 Min', value: '45'},
    {name: '1H', value: '60'},
    {name: '1H30min', value: '90'},
    {name: '2H', value: '120'},
    {name: '2H30min', value: '150'},
    {name: '3H', value: '180'},
];

const Lots = () => {
  const dispatch:AppDispatch = useDispatch();
  const currentUserRole = JSON.parse(localStorage.getItem('role') || '');
  const [modal, setModal] = useState<boolean>(false);

  const selecApState = (state:RootState) => state.Application;
  const ApplicationProperties = createSelector(
    selecApState,
    (app)=> ({
        lots: app.lots as unknown as pagedObject,
        configLots: app.configLots as unknown as { id: string, name: string }[],
    })
  );
  const  { lots, configLots } = useSelector(ApplicationProperties);


    const loadConfigs = useCallback(() => {
      dispatch(getConfigLots())
    },[dispatch]);

    const loadLots = useCallback((page?:number, size?:number) => {
        let config = {
            page: (page || 1).toString(),
            size: (size || 10).toString(),
        };
        dispatch(getLots(config))
    },[dispatch]);

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            number: '',
            time: ''
        },

        validationSchema: Yup.object({
            number: Yup.string().required("le lot est obligatoire"),
        }),

        onSubmit: (values) => {
            let param = {
                number: values.number,
                time: values.time
            }
            dispatch(drawLots(param));
            handleDialogClose();
            loadLots();
        }
    });

    const handleDialogClose = () => {
        setModal(false);
        validation.resetForm();
    };

    useEffect(() => {
        loadConfigs();
        loadLots();
    },[dispatch]);

    const columns = useMemo(() => [
        {
            header: 'Date',
            accessor: 'amount',
            style: 'font-medium',
            cell: (cellProps:any) => {
                return <p> {moment(cellProps.row.created_at).format('DD/MM/YYYY HH:mm')}</p>
            }
        },
        {
          header: 'Nom',
          accessor: 'name',
          style: 'font-medium',
          cell: null
        },
        {
          header: 'Ticket',
          accessor: 'betNumber',
          style: '',
          cell: null
        },
    ],[])
    

  return (
    <AppContent className="flex flex-col p-2 w-full h-full">
        {/* Header page */}
        <AppContent className='inline-flex items-center justify-between p-2'>
            <AppContent className='text-start'>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Gestion des lots</h4>
            </AppContent>
            <AppContent className='text-end'>
            {(currentUserRole == 'Root') || (currentUserRole == 'admin') || (currentUserRole == 'manager') ?
                <Button onClick={() => setModal(true)}>
                    <CirclePlus className='w-20 h-20'/>
                    Activer un lot
                </Button>
                : null
            }
            </AppContent>
        </AppContent>

        <Separator className="my-5" />
        <AppContent className='w-full h-full'>
            {lots && lots.currentPage ?
            <DataTable
                type='paged'
                content= {lots}
                columns= {columns}
                loadData = {loadLots}
            />
            :
            <AppContent className='w-full h-full content-center align-middle items-center text-center'>
                    <h5 className="scroll-m-20 text-xl font-semibold tracking-tight">Aucune donnée disponible</h5>
            </AppContent>
            }
        </AppContent>

        <Dialog open={modal} onOpenChange={(open) => !open && handleDialogClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Activer un lot
            </DialogTitle>
            <DialogDescription>
                Avec ce formulaire vous allez activer un lot
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
                <AppContent >
                  <Label htmlFor='roleId'>
                    Lot<span className='text-destructive'>*</span>
                  </Label>
                  <Select 
                    name='roleId'
                    value={validation.values.number || ''}
                    onValueChange={(value) => validation.setFieldValue('number', value)}
                  >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      configLots && configLots.filter((lot: { id: string, name: string; }) => lot.name !== 'Root').map((lot: {id:string, name:string}) => (
                        <SelectItem key={lot.id} value={lot.id}>{lot.name}</SelectItem>
                      ))
                  }
                  </SelectContent>
                </Select>
                {validation.errors.number && validation.touched.number && (
                  <p className="text-destructive text-xs">{validation.errors.number}</p>
                )}
                </AppContent>
                <AppContent >
                  <Label htmlFor='roleId'>
                    Temps<span className='text-destructive'>*</span>
                  </Label>
                  <Select 
                    name='roleId'
                    value={validation.values.time || ''}
                    onValueChange={(value) => validation.setFieldValue('time', value)}
                  >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      times && times.filter((time: { value: string, name: string; }) => time.name !== 'Root').map((time: {value:string, name:string}) => (
                        <SelectItem key={time.value} value={time.value}>{time.name}</SelectItem>
                      ))
                  }
                  </SelectContent>
                </Select>
                {validation.errors.number && validation.touched.number && (
                  <p className="text-destructive text-xs">{validation.errors.number}</p>
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
    </AppContent>
  )
}

export default Lots