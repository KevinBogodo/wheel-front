import {
  getAllUser,
  getOpBets,
  getCashoutsOp,
  getCashDeskOps,
  getCurentCashDeskOp,
} from '@/slice/thunks';
import { AppDispatch, RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumberWithComma } from '@/helper/globalFunction';
import { cashDeskOp, pagedObject } from '@/helper/global_interface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import moment from 'moment';

import DataTable from '@/components/Global/DataTable';
import { Separator } from '@/components/ui/separator';
import UserFilter from '@/components/Global/user-filter';
import CardDataContent from '@/components/Global/card-data-content';
import AppContent from '@/components/Global/app-content';
import PageHeader from '@/components/Global/page-header';

const CashierHistory = () => {
  const dispatch:AppDispatch = useDispatch();
  const currentUserRole = JSON.parse(localStorage.getItem('role') || '');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalTicket, setTotalTicket] = useState<number>(0);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [totalPaidTicket, setTotalPaidTicket] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<string>('');

  const selectAppState = (state:RootState) => state.Application;
  const ApplicationProperties = createSelector(
    selectAppState,
    (app) => ({
      openCashdeskOp: app.openCashdeskOp as cashDeskOp,
      cashOuts: app.cashOuts,
      cashdeskOps: app.cashdeskOps as unknown as pagedObject,
      bets: app.bets,
      allUsers: app.allUsers
    })
  );
  const { openCashdeskOp, bets, cashOuts, cashdeskOps, allUsers } = useSelector(ApplicationProperties);
  
  const loadCurentCashDeskOp = useCallback(() => {
    dispatch(getCurentCashDeskOp())
  },[]);

  const loadUsers = useCallback(() => {
    dispatch(getAllUser())
  },[]);

  const loadUserCashDeskOp = useCallback((page?:number, size?:number) => {
        let config = {
          page: (page || 1).toString(),
          size: (size || 10).toString(),
          user: selectedUser || ''
        };
        dispatch(getCashDeskOps(config))
    },[selectedUser]);

  const loadCashOut = useCallback(() => {
    if (openCashdeskOp && openCashdeskOp.id) {
      dispatch(getCashoutsOp({opId: openCashdeskOp.id}));
    }
  },[openCashdeskOp]);

  const loadBet = useCallback(() => {
    if (openCashdeskOp && openCashdeskOp.id) {
      dispatch(getOpBets({id: openCashdeskOp.id}));
    }
  },[openCashdeskOp]);

  useEffect(() => {

    loadUserCashDeskOp();
    if (currentUserRole === 'manager' || currentUserRole === 'admin' || currentUserRole === 'root') {
      loadUsers();
    } else {
      loadCurentCashDeskOp();
    }
  }, [dispatch]);

  useEffect(() => {
    if (openCashdeskOp && openCashdeskOp.id) {
      loadCashOut();
      loadBet();
    }
  },[openCashdeskOp]);

  useEffect(() => {
    if (cashOuts && cashOuts.length > 0) {
      let totalPaidAmount = 0;
      cashOuts.map((cashOut:any) => {
        totalPaidAmount += cashOut.amount;
      });
      setTotalPaid(totalPaidAmount)
      setTotalPaidTicket(cashOuts.length);
    }
  },[cashOuts]);

  useEffect(() => {
    if (bets && bets.length > 0) {
      let total = 0;
      bets.map((bet:any) => {
        total += bet.amount;
      });
      setTotalAmount(total)
      setTotalTicket(bets.length);
    }
  },[bets]);

  useEffect(() => {
    loadUserCashDeskOp()
  },[selectedUser]);

  const columns = useMemo(() => [
    {
      header: 'Ouverture',
      accessor: 'amount',
      style: 'font-medium',
      cell: (cellProps:any) => {
        return <p> {moment (cellProps.row.openDate).format('DD/MM/YYYY HH:mm')}</p>
      }
    },
    {
      header: 'Fermeture',
      accessor: 'date',
      style: 'font-medium',
      cell: (cellProps:any) => {
        return <p> {moment (cellProps.row.clodeDate).format('DD/MM/YYYY HH:mm')}</p>
      }
    },
    {
      header: 'Caisse',
      accessor: 'cashdesk',
      style: '',
      cell: (cellProps:any) => {
        return <p> {formatNumberWithComma(cellProps.row.cashdesk.name)}</p>
      }
    },
    {
      header: "Montant d'ouverture",
      accessor: 'openAmount',
      style: '',
      cell: (cellProps:any) => {
        return <p> {formatNumberWithComma(cellProps.row.openAmount || 0)} FCFA</p>
      }
    },
    {
      header: 'Montant de fermeture',
      accessor: 'closeAmount',
      style: '',
      cell: (cellProps:any) => {
        return <p> {cellProps.row.closeAmount !== null ? (formatNumberWithComma(cellProps.row.closeAmount || 0)+' FCFA') : <span className='text-red-500'>Ouvert</span> }</p>
      }
    },
  ],[]);

  return (
    <AppContent className='flex flex-col p-2 w-full h-full'>
      {/* Header */}
      {currentUserRole === 'cashier' ?
        <Card>
          <CardHeader>
            <CardTitle>Session de travail </CardTitle>
            <CardDescription>
              Date d'ouverture: {moment(openCashdeskOp.openDate).format('DD/MM/YYYY HH:mm')}
            </CardDescription>
          </CardHeader>

          <CardContent className='inline-flex w-full gap-2 text-center'>

            <CardDataContent
              title='Ouverture:'
              className='w-1/5'
            >
              { openCashdeskOp && formatNumberWithComma(openCashdeskOp.openAmount || 0) } FCFA
            </CardDataContent>

            <CardDataContent
              title='Nb ticket:'
              className='w-1/5'
            >
              {formatNumberWithComma(totalTicket) } 
            </CardDataContent>
            
            <CardDataContent
              title='Encaisser:'
              className='w-1/5'
            >
              {formatNumberWithComma(totalAmount) } FCFA
            </CardDataContent>

            <CardDataContent
              title='Nb payer:'
              className='w-1/5'
            >
              {formatNumberWithComma(totalPaidTicket) }
            </CardDataContent>

            <CardDataContent
              title='payer:'
              className='w-1/5'
            >
              {formatNumberWithComma(totalPaid) } FCFA
            </CardDataContent>
          </CardContent>
        </Card>
        :
        <PageHeader
           className='inline-flex items-center justify-between p-2'
           title= 'Historique de caisse'
        >
          <UserFilter 
            className='w-[20%]' 
            newValue={selectedUser}
            setValue={setSelectedUser}
            data={allUsers}
          />
        </PageHeader>
      }

      <Separator className='my-3' />
      <AppContent className='w-full h-full'>
        {cashdeskOps && cashdeskOps.totalItems > 0?
          <DataTable 
            type='paged'
            content={cashdeskOps}
            columns={columns}
            loadData={loadUserCashDeskOp}
          />
          :
          <AppContent className='w-full h-full content-center align-middle items-center text-center'>
            <h5 className="scroll-m-20 text-xl font-semibold tracking-tight"> Aucune donnée disponible</h5>
          </AppContent>
        }

      </AppContent>    
    </AppContent>
  )
}

export default CashierHistory