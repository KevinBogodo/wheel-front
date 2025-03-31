
import moment from 'moment';
import ScanTicketBar from '@/components/App/bet/scan-ticket-bar';
import DataTable from '@/components/Global/DataTable';
import { Separator } from '@/components/ui/separator';
import { cashDeskOp } from '@/helper/global_interface';
import { 
  getCurentCashDeskOp,
  getCashoutsOp,
} from '@/slice/thunks';
import { AppDispatch, RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumberWithComma } from '@/helper/globalFunction';

const Withdraw = () => {
  const dispatch:AppDispatch = useDispatch();
  const currentUserRole = JSON.parse(localStorage.getItem('role') || '');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalTicket, setTotalTicket] = useState<number>(0);

  const selectAppState = (state:RootState) => state.Application;
  const ApplicationProperties = createSelector(
    selectAppState,
    (app) => ({
      openCashdeskOp: app.openCashdeskOp as cashDeskOp,
      cashOuts: app.cashOuts,
    })
  );
  const { openCashdeskOp, cashOuts } = useSelector(ApplicationProperties);

  const loadCurentCashDeskOp = useCallback(() => {
    dispatch(getCurentCashDeskOp())
  },[]);

  const loadCashOut = useCallback(() => {
    if (openCashdeskOp && openCashdeskOp.id) {
      dispatch(getCashoutsOp({opId: openCashdeskOp.id}));
    }
  },[openCashdeskOp]);

  useEffect(() => {
    loadCurentCashDeskOp();
  }, [dispatch]);

  useEffect(() => {
    if (openCashdeskOp && openCashdeskOp.id) {
      loadCashOut();
    }
  },[openCashdeskOp]);

  useEffect(() => {
    if (cashOuts && cashOuts.length > 0) {
      let totalAmount = 0;
      let totalTicket = cashOuts.length;
      cashOuts.map((cashOut:any) => {
        totalAmount += cashOut.amount;
      });
      setTotalAmount(totalAmount);
      setTotalTicket(totalTicket);
    }
  },[cashOuts]);

  const columns = useMemo(() => [
    {
      header: 'Montant du Paiment',
      accessor: 'amount',
      style: 'font-bold text-green-500',
      cell: (cellProps:any) => {
        return <p> {formatNumberWithComma(cellProps.row.amount)}</p>
      }
    },
    {
      header: 'Montant du paris',
      accessor: 'date',
      style: 'font-medium text-red-500',
      cell: (cellProps:any) => {
        return <p> {cellProps.row.bet.amount}</p>
      }
    },
    {
      header: 'Date du Paiment',
      accessor: 'date',
      style: '',
      cell: (cellProps:any) => {
        return <p> {moment (cellProps.row.date).format('DD/MM/YYYY HH:mm')}</p>
      }
    },
    {
      header: 'Date du paris',
      accessor: 'date',
      style: '',
      cell: (cellProps:any) => {
        return <p> {moment (cellProps.row.bet.created_at).format('DD/MM/YYYY HH:mm')}</p>
      }
    },
  ],[]);


  return (
    <div className='flex flex-col p-2 w-full h-full'>
      {/* Header page */}
      <div className='inline-flex items-center justify-between p-2'>
        <div className='text-start'>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">CashOut</h4>
        </div>
      </div>

      <Separator className='my-2' />

      <div className='inline-flex w-full h-full'>
        <div className='w-[85%] h-full'>
          {cashOuts && cashOuts.length > 0 ?
            <DataTable
              content = {{
                data: cashOuts,
                totalItems: cashOuts.length,
                currentPage: 1,
                totalPages: 1
              }}
              columns={columns}
              loadData={loadCashOut}
            />
            :
            <h5> Aucune donnée disponible</h5>
          }
        </div>
        {currentUserRole === 'cashier' && 
          <div className='flex flex-col  p-2 h-full w-[15%]'>
            <div className=''>
              <ScanTicketBar refresh={loadCashOut} />
            </div>
            <Separator className='my-2' />

            <Card>
              <CardContent className='p-auto m-auto text-center'>
                <CardHeader className='p-auto m-auto'>
                  <CardTitle className='scroll-m-20 text-md font-semibold tracking-tight' > Total:</CardTitle>
                </CardHeader>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-green-500">
                  {formatNumberWithComma(totalAmount)} FCFA
                </h4>
              </CardContent>
            </Card>

            <Separator className='my-2' />

            <Card>
              <CardContent className='p-auto m-auto text-center'>
                <CardHeader className='p-auto m-auto'>
                  <CardTitle className='scroll-m-20 text-md font-semibold tracking-tight' >Nb Ticket:</CardTitle>
                </CardHeader>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {totalTicket}
                </h4>
              </CardContent>
            </Card>
          </div>
        }
      </div>
    </div>
  )
}

export default Withdraw;