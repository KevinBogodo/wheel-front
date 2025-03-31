import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import TablePagination from './TablePagination';

type Props = {
    type?: string,
    content: {
        data: any,
        totalItems: number,
        currentPage: number,
        totalPages: number,
    },
    columns: Array<column>,
    loadData: Function,
}

type column = {
    header:string, 
    accessor:string,
    style: string,
    cell: any
}

const DataTable = ({type, content, loadData, columns}: Props) => {

    const { data, currentPage, totalPages, totalItems } = content || {};


    return (
        <div className='flex flex-col'>
            <Table className='border'>
                <TableHeader className='bg-accent'>
                    <TableRow>
                        <TableHead className='w-4'>No.</TableHead>
                        {columns.map((col:column, index:number) => (
                            <TableHead 
                                key={index} 
                                className={col.header == 'Action' ? ' text-right' : ''}
                            >
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row:any, rowIndex:number) => (
                        <TableRow key={rowIndex}>
                            <TableCell key={`${rowIndex}-index`}>
                                {currentPage && currentPage === 1 ? (
                                <>{rowIndex + 1}</>
                                ) : (
                                <>{rowIndex + 1 + (currentPage - 1)}</>
                                )}
                            </TableCell>

                            {columns.map((col:column, colIndex:number) => (
                                <TableCell key={`${rowIndex}-${colIndex}`} className={col.style}>
                                    {col.cell !==null
                                        ? (
                                            col.cell && col.cell({ row })
                                        )
                                        :  col.accessor.includes(".")
                                            ? (() => {const access = col.accessor.split('.'); return row[access[0]][access[1]] })()
                                            : row[col.accessor]
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {type && type == 'paged' ?
                <div className=' w-full inline-flex flex-row justify-between items-center m-2 px-2'>
                    <h4 className="scroll-m-20 text-md font-semibold tracking-tight w-full">Total: {totalItems}</h4>
                    <TablePagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        loadData={loadData}
                    />
                </div>
                : null
            }

        </div>
    )
}

export default DataTable