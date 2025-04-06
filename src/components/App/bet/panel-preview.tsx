import { Card } from '@/components/ui/card'
import NumberBord from './number-bord'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Ban, Check } from 'lucide-react'
import ExtrabetButton from './extrabet-button'
import { formatNumberWithComma } from '@/helper/globalFunction'

type Props = {
    betNumbers: number[],
    betAmount: number,
    choice: any,
    odds: number[],
    oddsSum: number,
    stack: number,
    setStack: (number:number) => void,
    saveBet: () => void,
    handleClearBet: () => void,
    isDisabled: boolean
}

const PanelPreview = ({ betNumbers, betAmount, choice, odds, oddsSum, stack, setStack, handleClearBet, saveBet, isDisabled }: Props) => {

    return (
        <div className='flex flex-col w-full p-2 mx-auto'>
            <Card className='flex flex-col content-center w-full p-2 rounded-none'>
                {betNumbers.length > 0 &&
                    <>
                        <Separator className='my-3'/>
                        <div className='inline-flex w-full justify-between'>
                            <div className='inline-flex w-full'>
                                {betNumbers.map((number, indexNumber) => (
                                    <p key={indexNumber} className='text-xl font-normal'>
                                        {number}{(indexNumber !== betNumbers.length-1) &&","}
                                    </p>
                                ))}
                            </div>
                            <p className='inline-flex w-[30%] justify-end'> {betNumbers.length} x 36</p>
                        </div>
                    </>    
                }
                {choice && choice.label &&
                    <>
                        <Separator className='my-3'/>
                        <div className='inline-flex w-full justify-between'>
                            <div className='inline-flex w-full'>
                                <p className='text-xl font-normal'>
                                    {choice?.label}
                                </p>
                            </div>
                            <p className='inline-flex w-[30%] justify-end'> x {choice?.value}</p>
                        </div>
                    </>
                }
                <Separator className='my-3'/>
                <div>
                    <p className="leading-7 text-sm [&:not(:first-child)]:mt-6">
                        Mise: <span className='font-medium'>{formatNumberWithComma(betAmount)} Fcfa</span>
                    </p>
                </div>
                <div>
                    <p className="leading-7 text-sm [&:not(:first-child)]:mt-6">
                        Gain Potentiel: <span className='font-medium'>{formatNumberWithComma(oddsSum * stack)} Fcfa</span>
                    </p>
                </div>
            </Card>
            <Card className='flex flex-col content-center w-full p-2 rounded-none'>
                <div className='flex flex-row w-full justify-center items-center'>
                    <ExtrabetButton
                        value={300}
                        bgColor=''
                        textColor='white'
                        className={`w-[30%] p-[3%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center ${stack === 300 ? `border-gray-800 shadow-inner shadow-gray-800 bg-slate-700` : `border-gray-800 shadow-md shadow-gray-800 bg-slate-500`}`}
                        disableAdd={false}
                        editBet={setStack}
                    >
                        300
                    </ExtrabetButton>
                    <ExtrabetButton
                        value={500}
                        bgColor=''
                        textColor='white'
                        className={`w-[30%] p-[3%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center ${stack === 500 ? `border-gray-800 shadow-inner shadow-gray-800 bg-slate-700` : `border-gray-800 shadow-md shadow-gray-800 bg-slate-500`}`}
                        disableAdd={false}
                        editBet={setStack}
                    >
                        500
                    </ExtrabetButton>
                    <ExtrabetButton
                        value={1000}
                        bgColor=''
                        textColor='white'
                        className={`w-[30%] p-[3%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center ${stack === 1000 ? `border-gray-800 shadow-inner shadow-gray-800 bg-slate-700` : `border-gray-800 shadow-md shadow-gray-800 bg-slate-500`}`}
                        disableAdd={false}
                        editBet={setStack}
                    >
                        1000
                    </ExtrabetButton>
                </div>
                <div className='flex flex-row w-full justify-center items-center mt-2'>
                    <ExtrabetButton
                        value={1500}
                        bgColor=''
                        textColor='white'
                        className={`w-[30%] p-[3%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center ${stack === 1500 ? `border-gray-800 shadow-inner shadow-gray-800 bg-slate-700` : `border-gray-800 shadow-md shadow-gray-800 bg-slate-500`}`}
                        disableAdd={false}
                        editBet={setStack}
                    >
                        1500
                    </ExtrabetButton>
                    <ExtrabetButton
                        value={5000}
                        bgColor=''
                        textColor='white'
                        className={`w-[30%] p-[3%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center ${stack === 5000 ? `border-gray-800 shadow-inner shadow-gray-800 bg-slate-700` : `border-gray-800 shadow-md shadow-gray-800 bg-slate-500`}`}
                        disableAdd={false}
                        editBet={setStack}
                    >
                        5000
                    </ExtrabetButton>
                    <ExtrabetButton
                        value={10000}
                        bgColor=''
                        textColor='white'
                        className={`w-[30%] p-[3%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center ${stack === 10000 ? `border-gray-800 shadow-inner shadow-gray-800 bg-slate-700` : `border-gray-800 shadow-md shadow-gray-800 bg-slate-500`}`}
                        disableAdd={false}
                        editBet={setStack}
                    >
                        10000
                    </ExtrabetButton>
                </div>
                <Separator className='my-3'/>
                <div className='inline-flex h-full w-full gap-2 mt-2'>
                        <Button 
                            className='flex-2 w-full mx-auto'
                            disabled={isDisabled}
                            type='submit'
                            onClick={() => saveBet()}
                        >
                            <Check />
                            Enregistrer
                        </Button>
                        <Button 
                            className='flex-1 w-full mx-auto'
                            variant='destructive'
                            disabled={isDisabled}
                            type='submit'
                            onClick={() => handleClearBet()}
                        >
                            <Ban/>
                            Annuler
                        </Button>
                    </div>

            </Card>

            {/* } */}
            {/* {choice && 

            } */}
        
        </div>
    )
}

export default PanelPreview