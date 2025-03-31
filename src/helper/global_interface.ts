
export interface pagedObject {
    currentPage: number,
    totalItems: number,
    totalPages: number,
    data: Object,
};

export interface role {
    id: string,
    name: string
};

export interface cashdesk {
    id: string,
    name: string
};

export interface cashDeskOp {
    id: string,
    cashDeskId: string,
    userId: string,
    openAmount: number,
    openDate: string,
    closeAmount: number,
    cashdesk: cashdesk,
    user: user
}

export interface jackpotConfig {
    id: string,
    name: string,
    amount: number,
};

export interface bet {
    number: string,
    amount: number,
    userId: string,
    drawId: string,
    cashDeskOpId: string,
    no1: number,
    no2: number,
    no3: number,
    no4: number,
    no5: number,
    rt1: number,
    rt2: number,
    rt3: number,
    rt4: number,
    rt5: number,
};
export interface user {
    id: string,
    name: string,
    lastName: string,
    username: string,
    role: role
}