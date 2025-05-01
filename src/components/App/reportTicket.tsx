import { formatNumberWithComma } from '@/helper/globalFunction';
import moment from 'moment';

type Props = {
    currentData: any,
    selectedUser: any,
    period: 'date' | 'month'
}

const ReportTicket = ({ currentData, selectedUser, period}: Props) => {
    
    return (
        <div className='w-full'>
            <div className='flex flex-col px-2 mx-1'>
                <div className='flex justify-center items-center mx-auto w-full text-center'>
                    <div className='flex w-full'>
                        <div className='w-full'>
                            <p className='text-md font-semibold'>
                                Ticket Rapport SPIN+WIN
                            </p>
                            <p className='text-md font-normal'>
                                --- {selectedUser?.name || "Tout les utilisateurs"} ---
                            </p>
                            <p className='font-normal'>
                                Periode : {
                                    period === 'date' ?
                                        moment(currentData?.day).format("DD/MM/YYYY")
                                    : moment(currentData?.month).format("MM/YYYY")
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center items-center mx-auto w-full text-center'>----------------<br/></div>

                <div className='flex justify-center items-center mx-auto w-full text-center'>
                    <div className='flex w-full'>
                        <div className='w-full'>
                            <p className='text-sm font-normal'>
                                Montant Encaissement: {formatNumberWithComma(currentData?.saleAmount || 0)+' Fcfa'}
                            </p>
                            <p className='text-sm font-normal'>
                                Montant Paiements: {formatNumberWithComma(currentData?.paidAmount || 0)+' Fcfa'}
                            </p>
                            <p className='text-sm font-normal'>
                                Difference: {' '+formatNumberWithComma(currentData?.difference || 0)+' Fcfa'}
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

export default ReportTicket