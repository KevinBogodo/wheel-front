import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cashOutBet, getCheckBet } from '@/slice/thunks';
import { AppDispatch, RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { Ban, Check, CircleAlert, CircleCheck, CircleX, RefreshCw } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    refresh?: () => void
}


const ScanTicketBar = ({ refresh }: Props) => {
    const dispatch:AppDispatch = useDispatch();
    const selectLayoutState = (state:RootState) => state.Application
    const ApplicationProperties = createSelector(
        selectLayoutState,
        (app) => ({
        checkedBet: app.checkedBet,
        cashoutBet: app.cashoutBet,
        cashoutSuccess: app.cashoutSuccess,
        error: app.error
        })
    );
    const { checkedBet, cashoutBet, cashoutSuccess, error } = useSelector(ApplicationProperties);
  

    const [betNumber, setBetNumber] = useState<string>('');
    const [modal, setModal] = useState<boolean>(false);
    const [ticket, setTicket] = useState({});


    const handleCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          if (betNumber.length > 5) {
            dispatch(getCheckBet(betNumber));
          }
        }
    };

    const handlePaid = useCallback(() => {
        const param = { 
            opId: (ticket as any)?.cashdeskOp?.id || '',
            id: (ticket as any)?.id
        }
        dispatch(cashOutBet(param));
    },[ticket]);

    const toggle = useCallback(() => {
        if (modal) {
            setTicket({});
            setModal(false);
        } else {
            setModal(true);
        }
        setBetNumber('');
    },[modal])

    useEffect(() => {
        if (checkedBet && (checkedBet as any).status) {
            setTicket(checkedBet);
            setModal(true);
        }
    },[checkedBet]);

    useEffect(() => {
        if (cashoutSuccess === true && cashoutBet && !error) {
            setModal(false);
            setTicket({});
            setBetNumber('');
            if (refresh) {
                refresh();
            }
        }
    },[cashoutSuccess, cashoutBet]);

    return (
        <>
            <div className="flex flex-col p-2">
                <p className="font-medium">Scanner un ticket:</p>
                <Input
                    value={betNumber}
                    placeholder='20250128081015005'
                    onChange={(e) => setBetNumber(e.target.value)}
                    onKeyDown={handleCheck}
                />
            </div>
            <Dialog open={modal} onOpenChange={(open) => !open && toggle()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col content-center items-center text-center'>

                        {(ticket && (ticket as any)?.status === 'pending') &&
                            <div className='flex flex-col content-center items-center text-center'>
                                <RefreshCw className='w-24 h-24 animate-spin' />
                                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    En attente !
                                </h2>
                                <span>Tirage non terminé.</span>
                            </div>
                        }

                        {(ticket && (ticket as any)?.status === 'paid') &&
                            <div className='flex flex-col content-center items-center text-center'>
                                <CircleAlert className='w-24 h-24 text-orange-600' />
                                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    payé !
                                </h2>
                                <span>Ticket déjà payé.</span>
                            </div>
                        }

                        {(ticket && (((ticket as any)?.status === 'ok') && (ticket as any)?.amount === 0) || (ticket as any)?.status === 'ko') &&
                            <div className='flex flex-col content-center items-center text-center'>
                                <CircleX className='w-24 h-24 text-red-600' />
                                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    Perdu !
                                </h2>
                                <span>Ticket perdant</span>
                            </div>
                        }

                        {(ticket && ((ticket as any)?.status === 'ok') && (ticket as any)?.amount !== 0) &&
                            <div className='flex flex-col content-center items-center text-center'>
                                <CircleCheck className='w-24 h-24 text-green-600' />
                                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    Gagnant !
                                </h2>
                                {(ticket as any)?.amount && <span>Montant: {(ticket as any)?.amount} Fcfa</span>}
                                {(ticket as any)?.lot && <span>gagne: {(ticket as any)?.lot?.name}</span>}
                            </div>
                        }

                        <Separator className='my-5' />
                        <div className='inline-flex gap-2 '>
                            <Button className='bg-red-400' onClick={toggle}>
                                <Ban className='w-20 h-20'/>
                                Fermer
                            </Button>
                            {((ticket && (ticket as any)?.status === 'ok') && (ticket as any)?.amount !== 0) &&
                                <Button className='bg-green-600' onClick={handlePaid}>
                                    <Check className='w-20 h-20' />
                                    Payer
                                </Button>
                            }
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ScanTicketBar;
