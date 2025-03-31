import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Printer } from "lucide-react"

type Props = {
    lastBets: any
    rePrintBet: (bet:any) => void
}

const LatestBet = ({lastBets, rePrintBet}: Props) => {
  return (
    <div className="flex flex-col pt-2">
        <p className="font-medium">Dernier ticket:</p>
        <Table className="border w-full h-full overflow-scroll">
            <TableBody>
                {lastBets && lastBets.map((bet:any, betIndex:number) => (
                    <TableRow key={betIndex} className="border-2">
                        <TableCell className=" w-2 py-1">{betIndex+1}</TableCell>
                        <TableCell className="w-5 px-2 py-1">{bet.amount}</TableCell>
                        <TableCell className="py-1">
                            {
                                (bet.no1 ? bet.no1: '') + 
                                (bet.no2 ? ', '+bet.no2: '') +
                                (bet.no3 ? ', '+bet.no3: '') +
                                (bet.no4 ? ', '+bet.no4: '') +
                                (bet.no5 ? ', '+bet.no5: '')
                            }
                        </TableCell>
                        <TableCell className="d-flex items-end text-right py-1">
                            <Printer onClick={() => rePrintBet(bet)} className="w-5 h-5"/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default LatestBet