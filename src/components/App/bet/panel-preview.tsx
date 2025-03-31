import { Card } from '@/components/ui/card'
import NumberBord from './number-bord'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Ban, Check } from 'lucide-react'

type Props = {
    betNumbers: number[],
    odds: number[],
    oddsSum: number,
    editBet: (number:number, action: ('add' | 'sub')) => void,
    saveBet: () => void,
    handleClearBet: () => void,
    isDisabled: boolean
}

const PanelPreview = ({ betNumbers, odds, oddsSum, editBet, handleClearBet, saveBet, isDisabled }: Props) => {

    return (
        <div className='flex flex-col w-full p-2 mx-auto'>
            {betNumbers.length > 0 &&
                <Card className='flex flex-col content-center w-full p-2 rounded-none'>
                    <Separator className='my-3'/>

                    <div className='inline-flex w-full'>
                        {betNumbers.map((number, indexNumber) => (
                            <NumberBord
                                key={indexNumber}
                                isDisabled={isDisabled}
                                onClick={() => editBet(number, 'sub')}
                                className='text-xl font-normal'
                            >
                                {number}
                            </NumberBord>
                        ))}
                    </div>
                    <div className='inline-flex w-full'>
                        {odds.map((odd, indexOdd) => (
                            <NumberBord
                                key={indexOdd}
                                className=' my-0 py-0 font-normal border-none'
                            >
                                {odd}
                            </NumberBord>
                        ))}
                    </div>
                    <Separator className='my-3'/>
                    <div>
                        <p className="leading-7 text-sm [&:not(:first-child)]:mt-6">
                            Mise: <span className='font-medium'>{oddsSum * 100} Fcfa</span>
                        </p>
                    </div>
                    <div>
                        <p className="leading-7 text-sm [&:not(:first-child)]:mt-6">
                            Gain Potentiel: <span className='font-medium'>{oddsSum * 1500} Fcfa</span>
                        </p>
                    </div>

                    <div className='inline-flex h-full w-full gap-2'>
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
            }
        
        </div>
    )
}

export default PanelPreview