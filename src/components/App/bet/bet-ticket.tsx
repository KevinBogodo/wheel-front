
import BarcodeGenerator from '@/components/Global/barcode-generator';
import moment from 'moment';

type Props = {
    currentBet: any,
    openDraw: any
}

const BetTicket = ({ currentBet, openDraw}: Props) => {

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
                            Spin + Win
                        </p>
                        <p className='text-xs font-normal'>
                            Tirage: #{currentBet?.draw?.numbers || openDraw?.nexDrawNumber}
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
                        {currentBet.no1 != null ? ""+currentBet.no1 : null}
                        {currentBet.no2 != null ? " - "+currentBet.no2 : null}
                        {currentBet.no3 != null ? " - "+currentBet.no3 : null}
                        {currentBet.no4 != null ? " - "+currentBet.no4 : null}
                        {currentBet.no5 != null ? " - "+currentBet.no5 : null}
                        {currentBet.no6 != null ? " - "+currentBet.no6 : null}
                        {currentBet.no7 != null ? " - "+currentBet.no7 : null}
                    </p>
                </div>
                <div className='flex flex-col text-center'>
                    <p className='text-sm font-semibold'>
                        {currentBet.isBlack ? "Black" : null}
                        {currentBet.isRed ? "Red" : null}
                        {currentBet.isGreen ? "Green" : null}
                        {currentBet.isOdd ? "Odd (Impair)" : null}
                        {currentBet.isEven ? "Even (Pair)" : null}
                        {currentBet.isFirst ? "Dozen: 1-12" : null}
                        {currentBet.isSecond ? "Dozen: 12-24" : null}
                        {currentBet.isThird ? "Dozen: 24-36" : null}
                        {currentBet.isDown ? "Low" : null}
                        {currentBet.isUp ? "High" : null}
                    </p>
                </div>

                <div className='flex justify-center items-center mx-auto w-full text-center'>
                    <p className='text-xs'>Mise: {currentBet.betAmount} {" "}
                        | G prob: <span className='text-sm font-semibold'>{currentBet?.amount} FCFA</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BetTicket