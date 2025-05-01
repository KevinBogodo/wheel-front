import { formatNumberWithComma } from '@/helper/globalFunction';
import moment from 'moment';

type Props = {
    cashdesk: any,
    cashier: any,
    cashdeskOp: any,
    bet: any,
    cashout: any,
    action: 'preview' | 'close',
}

const StatTicket = ({ cashdesk, cashier, cashdeskOp, bet, cashout, action}: Props) => {

    const ticketAmount = bet.reduce((total: any, item: { betAmount: any; }) => total + (item.betAmount || 0), 0);
    const cashoutAmount = cashout.reduce((total: any, item: { amount: any; }) => total + (item.amount || 0), 0);

    return (
        <div className='w-full'>
            <div className='flex flex-col px-2 mx-1'>
                <div className='flex justify-center items-center mx-auto w-full text-center'>
                    <div className='flex w-full'>
                        <div className='w-full'>
                            <p className='text-md font-semibold'>
                                SPIN + WIN
                            </p>
                            <p className='text-md font-semibold'>
                                --- {cashdesk?.name || "Caisse"} ---
                            </p>
                            <p className='text-md font-normal'>
                                --- {cashier?.name || ""} ---
                            </p>
                            <p className='text-md font-normal'>
                                Date: {moment().format("DD/MM/YYYY HH:mm:ss")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center items-center mx-auto w-full text-center'>----------------<br/></div>

                <div className='flex justify-center items-center mx-auto w-full text-center'>
                    <div className='flex w-full'>
                        <div className='w-full'>
                            <p className='text-sm font-semibold'>
                                Session:
                            </p>
                            <p className='text-sm font-semibold'>
                                Ouverture: {moment(cashdeskOp?.openDate).format('DD/MM/YYYY HH:mm')}
                            </p>
                            <p className='text-sm font-normal'>
                                Montant d'ouverture: {formatNumberWithComma(cashdeskOp?.openAmount || 0)+' Fcfa'}
                            </p>
                            {/* <p className='text-sm font-normal'>
                                Fermeture: {cashdeskOp?.closeDate ? moment(cashdeskOp.closeDate).format('DD/MM/YYYY HH:mm') : " - "}
                            </p>
                            <p className='text-sm font-normal'>
                                Montant de fermeture: {formatNumberWithComma(cashdeskOp?.closeAmount || 0)+' Fcfa'}
                            </p> */}
                        </div>
                    </div>
                </div>

                <div className='flex justify-center items-center mx-auto w-full text-center'>----------------<br/></div>

                <div className='flex justify-center items-center mx-auto w-full text-center'>
                    <div className='flex w-full'>
                        <div className='w-full'>
                            <p className='text-sm'>
                                Nb Ticket (Encaissement): {bet.length}
                            </p>
                            <p className='text-sm font-normal'>
                                Montant Encaissement: {formatNumberWithComma(ticketAmount || 0)+' Fcfa'}
                            </p>
                            <p className='text-sm font-normal'>
                                Nb Ticket (Paiements): {cashout.length}
                            </p>
                            <p className='text-sm font-normal'>
                                Montant Paiements: {formatNumberWithComma(cashoutAmount || 0)+' Fcfa'}
                            </p>
                            <div>----------<br/></div>
                            <p className='text-sm font-semibold'>
                                Difference: {' '+formatNumberWithComma((ticketAmount || 0) - (cashoutAmount || 0))+' Fcfa'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center items-center mx-auto w-full text-center'>----------------<br/></div>

                <div className='flex justify-center items-center mx-auto w-full text-center'>
                    <div className='flex w-full'>
                        <div className='w-full'>
                            <p className='text-xs font-semibold'>
                                Camer Game
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatTicket