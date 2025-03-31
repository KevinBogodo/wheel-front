
import BarcodeGenerator from '@/components/Global/barcode-generator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import moment from 'moment';

type Props = {
    currentBet: any
}

const BetTicket = ({ currentBet}: Props) => {

    console.log(currentBet);
    

    return (
        <div className='w-full'>
            <div className='flex flex-col px-2 mx-1'>
                {/* Header */}
                <div className='flex w-full'>
                    <div className='w-[50%]'>
                        <p className='text-md font-semibold'>
                            Camer Game
                        </p>
                        <p className='text-sm font-normal'>
                            Loto voiture
                        </p>
                        <p className='text-xs font-normal'>
                            Tirage: {currentBet?.draw?.numbers}
                        </p>
                    </div>
                    {(currentBet as any).number &&<div className='w-[50%]'>
                        <BarcodeGenerator value={(currentBet as any).number}  />
                    </div>}
                </div>

                <div className='flex justify-center items-center mx-auto w-full text-center'>
                    <div className='w-[50%]'>
                        <span className='text-[10px]'>
                            Date: {moment().format("DD/MM/YYYY HH:mm:ss")}
                        </span>
                    </div>
                    <div className='w-[50%]'>
                        <span className='text-[10px]'>
                            Validite: {moment().add(1, 'days').startOf('day').format("DD/MM/YYYY HH:mm")}
                        </span>
                    </div>
                </div>
                
                <div className='flex flex-col text-center'>
                    <p className='text-sm font-semibold'>
                        {currentBet.no1 ? " - "+currentBet.no1 : null}
                        {currentBet.no2 ? " - "+currentBet.no2 : null}
                        {currentBet.no3 ? " - "+currentBet.no3 : null}
                        {currentBet.no4 ? " - "+currentBet.no4 : null}
                        {currentBet.no5 ? " - "+currentBet.no5 : null}
                        {" - "}
                    </p>
                </div>

                <div className='flex justify-center items-center mx-auto w-full text-center'>
                    <p className='text-xs'>Mise: 100  | Mtn: 
                        <span className='text-sm font-semibold'>{currentBet?.amount}</span>{" "}
                        | G prob: <span className='text-sm font-semibold'>{currentBet?.amount * 15} FCFA</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BetTicket