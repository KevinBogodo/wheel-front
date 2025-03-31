import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'

type Props = {
    currentPage: number,
    totalPages: number,
    loadData: any
}

const TablePagination = ({ currentPage, totalPages, loadData }: Props) => {

  return (
    <Pagination className='justify-end'>
        <PaginationContent>
            <PaginationItem>
                <PaginationPrevious 
                    aria-disabled={currentPage === 1}
                    onClick={() => {
                        if (currentPage !== 1) {
                            loadData(currentPage-1, 10);
                        }
                    }}
                    className={currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                />
            </PaginationItem>
            
            {totalPages < 3 
                ? (() => {
                    for (let index = 1; index <= totalPages; index++) {
                        return <PaginationItem>
                            <PaginationLink 
                                isActive={currentPage === index}
                                onClick={() => {
                                    if (currentPage !== index) {
                                        loadData(index, 10);
                                    }
                                }}
                                className={currentPage === index ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                            >
                                {index}
                            </PaginationLink>
                        </PaginationItem>
                    }
                })()
                : (() => {
                    for (let index = 1; index <= totalPages; index++) {
                        if ((index === (currentPage-1)) || (index === (currentPage+1))) {
                            return <PaginationItem>
                                <PaginationLink 
                                    isActive={currentPage === index}
                                    onClick={() => {
                                        if (currentPage !== index) {
                                            loadData(index, 10);
                                        }
                                    }}
                                    className={currentPage === index ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                                >
                                    {index}
                                </PaginationLink>
                            </PaginationItem>
                        } else if ((index === (1)) || (index === (totalPages))) {
                            return <PaginationItem>
                                <PaginationLink 
                                    isActive={currentPage === index}
                                    className={currentPage === index ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                                >
                                   ...
                                </PaginationLink>
                            </PaginationItem>
                        }
                    }
                })()
            }

            <PaginationItem>
                <PaginationNext
                    aria-disabled={currentPage === totalPages}
                    onClick={() => {
                        if (currentPage !== totalPages) {
                            loadData(currentPage+1, 10);
                        }
                    }}
                    className={currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
  )
}

export default TablePagination