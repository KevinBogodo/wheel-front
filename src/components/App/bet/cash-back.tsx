import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { getCheckCashBack } from '@/slice/thunks';
import { AppDispatch, RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { Ban, Check} from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    tickets: string[],
    printCashBack: boolean,
    setTickets: (tickets: string[]) => void,
    saveCashBackBet: () => void,
}

type CashBackChecked = {
    status: boolean;
    number: string;
};

const CashBack = ({ printCashBack, setTickets, saveCashBackBet}: Props) => {
    const dispatch:AppDispatch = useDispatch();
    const selectLayoutState = (state:RootState) => state.Application
    const ApplicationProperties = createSelector(
        selectLayoutState,
        (app) => ({
            cashBackCheked: app.cashBackCheked as CashBackChecked,
        })
    );
    const { cashBackCheked } = useSelector(ApplicationProperties);
  
    const [modal, setModal] = useState<boolean>(false);
    const [betNumber, setBetNumber] = useState<string>('');
    const [allTickets, setAllTickets] = useState<string[]>([]);


    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
        setBetNumber('');
        setAllTickets([]);
    },[modal]);

    const handleCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (betNumber.length > 5) {
            dispatch(getCheckCashBack(betNumber));
            }
        }
    };

    const handleSave = useCallback(() => {
        if (allTickets.length === 10) {
            setTickets(allTickets);
            setBetNumber('');
            toggle();
        }
    },[allTickets]);

    useEffect(() => {
        if ((cashBackCheked && (cashBackCheked as any).number) && !(allTickets.includes((cashBackCheked as any).number)) ) {
            setAllTickets((prevObj) => [...prevObj, cashBackCheked?.number]);
        }
        setBetNumber('');
    },[cashBackCheked]);

    return (
        <>
            <div className='flex flex-col p-2'>
                {printCashBack ?
                    <Button
                        variant='default'
                        onClick={saveCashBackBet}
                    >
                        Enregistrer le cashBack
                    </Button>
                    :
                    <Button
                        variant='outline'
                        onClick={() => toggle()}
                    >
                        Scanner un ticket cashBack
                    </Button>
                }
            </div>


            <Dialog open={modal} onOpenChange={(open) => !open && toggle()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col content-center items-center text-center'>
                        <div className="flex flex-col w-full p-2">
                            <p className="font-medium py-2">Scanner les tickets:</p>
                            <Input
                                className='w-full'
                                value={betNumber}
                                placeholder='20250128081015005'
                                onChange={(e) => setBetNumber(e.target.value)}
                                onKeyDown={handleCheck}
                            />
                        </div>
                        <h4 className="scroll-m-20 py-3 text-xl font-semibold tracking-tight first:mt-0">
                             {allTickets.length} ticket{allTickets.length >1 && 's'}
                        </h4>
                        <Separator className='my-2' />
                        <div className='inline-flex gap-2'>
                            <Button className='bg-red-400' onClick={toggle}>
                                <Ban className='w-20 h-20'/>
                                Annuler
                            </Button>
                            {allTickets.length === 10 && 
                                <Button className='bg-green-600' onClick={handleSave}>
                                    <Check className='w-20 h-20' />
                                    Enregistrer
                                </Button>
                            }
                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </>
  )
}

export default CashBack