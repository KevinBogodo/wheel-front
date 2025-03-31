import AppContent from '@/components/Global/app-content';
import DataTable from '@/components/Global/DataTable';
import DatePicker from '@/components/Global/date-picker';
import PageHeader from '@/components/Global/page-header';
import UserFilter from '@/components/Global/user-filter';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatNumberWithComma, formatReturnEndDate, formatReturnStartDate } from '@/helper/globalFunction';
import {
  getAllUser,
  getDayliReport,
} from '@/slice/thunks';
import { AppDispatch, RootState } from "@/store";
import { createSelector } from '@reduxjs/toolkit';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

const AnalysesDay = () => {
  const dispatch:AppDispatch = useDispatch();
  const currentUserRole = JSON.parse(localStorage.getItem('role') || '');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndtDate] = useState<string>('');
  const [displayData, setDisplayData] = useState<{ day: string; saleAmount: number; paidAmount: number; difference: number }[]>([]);

  const selectAppState = (state:RootState) => state.Application;
  const ApplicationProperties = createSelector(
    selectAppState,
    (app) => ({
      dayReports: app.dayReports as { sales?: any, payments?: any }[],
      allUsers: app.allUsers,
    })
  );
  const { dayReports, allUsers } = useSelector(ApplicationProperties);

  const loadUsers = useCallback(() => {
    dispatch(getAllUser())
  },[]);

  const loadReport = useCallback((user: string, start: string, end: string) => {
    let param:{[key:string]: string} ={
      startDate: start,
      endDate: end,
    };
    if (user !== 'all') param['user']= user;

    dispatch(getDayliReport(param));
  },[]);


  useEffect(() => {
    loadUsers()
    loadReport('all', formatReturnStartDate(moment().format('YYYY-MM-DD')), formatReturnEndDate(moment().format('YYYY-MM-DD')));
  },[dispatch]);

  useEffect(() => {
    if (startDate !== '' && endDate !== '') {
      loadReport(selectedUser, formatReturnStartDate(startDate), formatReturnEndDate(endDate));
    }
  },[selectedUser, startDate, endDate])

  useEffect(() => {
    
    if(dayReports && dayReports.length > 0) {
      const {sales, payments} = dayReports[0];

      const salesDates = sales.map((sale:any) => sale.day);
      const paymentDates = payments.map((sale:any) => sale.day);
      const mergedDate =[...salesDates, ...paymentDates];
      const allDates = [...new Set(mergedDate)];
      let mergedData:{ day: string; saleAmount: number; paidAmount: number; difference: number }[] = [];

      allDates.map((date) => {
        let row:{day:string, saleAmount: number, paidAmount: number, difference: number} = {
          day:date,
          saleAmount: 0,
          paidAmount: 0,
          difference: 0
        };

        row.saleAmount = sales.find((sale:any) => sale.day === date)?.total_amount ?? 0;
        row.paidAmount = payments.find((payment:any) => payment.day === date)?.total_amount ?? 0;;
        row.difference = row.saleAmount - row.paidAmount;
        mergedData.push(row);
      });

      setDisplayData(mergedData);
    }
  },[dayReports])

  const columns = useMemo(() => [
      {
        header: 'Jour',
        accessor: '',
        style: 'font-medium',
        cell: (cellProps:any) => {
          return <p> {moment (cellProps.row.day).format('DD/MM/YYYY')}</p>
        }
      },
      {
        header: 'Montant vendue',
        accessor: 'saleAmount',
        style: '',
        cell: (cellProps:any) => {
          return <p> {formatNumberWithComma(cellProps.row.saleAmount || 0)} FCFA</p>
        }
      },
      {
        header: 'Montant payé',
        accessor: 'paidAmount',
        style: '',
        cell: (cellProps:any) => {
          return <p> {formatNumberWithComma(cellProps.row.paidAmount || 0)} FCFA</p>
        }
      },
      {
        header: 'Différence',
        accessor: 'difference',
        style: '',
        cell: (cellProps:any) => {
          return <p> {formatNumberWithComma(cellProps.row.difference || 0)} FCFA</p>
        }
      }
  ],[]);

  return (
    <AppContent className='flex flex-col w-full h-full'>
      <PageHeader
        className='inline-flex items-center justify-between p-2'
        title= 'Rapport journalier'
      />
      <Separator className='my-3'/>
      <AppContent className='inline-flex p-2 w-full h-full gap-2'>
        {/* Left filter */}
        <AppContent className='w-[80%] h-full'>
          <Card className='h-full'>
            <CardContent className=' p-2 m-5 h-full'>
              {displayData && displayData.length > 0?
                <DataTable
                  type='global'
                  content = {{
                    data: displayData,
                    totalItems: displayData.length,
                    currentPage: 1,
                    totalPages: 1
                  }}
                  columns={columns}
                  loadData={loadReport}
                />
                :
                <AppContent className='w-full h-full content-center align-middle items-center text-center'>
                  <h5 className="scroll-m-20 text-xl font-semibold tracking-tight"> Aucune donnée disponible</h5>
                </AppContent>
              }
            </CardContent>
          </Card>

        </AppContent>
        {/* Right data  */}
        {(currentUserRole === 'manager' || currentUserRole === 'admin' || currentUserRole === 'Root') && 
          <Card className='flex flex-col w-[20%] h-full'>
            <CardContent className='mt-2'>
              <Label className="mt-5 p-2">
                Utilisateur
              </Label>
              <UserFilter
                className='w-full pt-2'
                newValue={selectedUser}
                setValue={setSelectedUser}
                data={allUsers}
              />

              <DatePicker
                label='Date de debut:'
                title= 'Choisir'
                value={startDate}
                limitDate={endDate}
                minDate=''
                onChange={(val) => {setStartDate(val) , setEndtDate('')}}
              />

              <DatePicker
                label='Date de fin: '
                title= 'Choisir'
                value={endDate}
                limitDate=''
                minDate={startDate}
                onChange={setEndtDate}
              />


            </CardContent>
          </Card>
        }
      </AppContent>
    </AppContent>
  )
}

export default AnalysesDay