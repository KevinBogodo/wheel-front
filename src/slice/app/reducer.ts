import { createSlice } from '@reduxjs/toolkit';
import {
    resetReducer,

    getRoles,

    getAllUser,
    getUsers,
    getUser,
    createUser,
    updateUser,
    updatePassword,
    deleteUser,
    resetUserPassword,

    getAllCashdesks,
    getClosedCashdesks,
    getCashdesks,
    getCashdesk,
    createCashdesk,
    updateCashdesk,
    deleteCashdesk,

    openCashDesk,
    closeCashDesk,
    getCashDeskOp,
    getCurentCashDeskOp,
    getCashDeskOps,

    getJackpotConfigs,
    getAllJackpotConfigs,
    createJackpotConfig,
    updateJackpotConfig,
    deleteJackpotConfig,

    placeBet,
    getBets,
    getOpBets,
    getBet,
    getLatestBet,

    getCheckBet,
    cashOutBet,
    getCashouts,
    getCashout,
    getCashoutsOp,

    getCheckCashBack,
    placeCashBackBet,

    getBetReport,
    getPaymentReport,
    getDayliReport,
    getMonthliReport,
    getAllReport,

    getConfigLots,
    getLots,
    drawLots,

    getJackpots,
    getActiveJackpot,
    createJackpot,
    updateJackpot,

} from './thunk';


export const initialState = {
    roles: [],
    role: {},
    users: [],
    allUsers: [],
    user: {},
    cashdesks: [],
    allCashdesks: [],
    cashdesk: {},
    cashdeskOps: [],
    openCashdeskOp: {},
    cashdeskOp: {},
    allJackpotConfigs: [],
    jackpotConfigs: [],
    jackpotConfig: {},
    bets: [],
    lastBets: [],
    bet: {},
    cashBackCheked: {},
    checkedBet: {},
    cashoutBet: {},
    cashOut: {},
    cashOuts: [],

    betReports: [],
    paymentReports: [],
    dayReports: [],
    monthReports: [],
    allReports: [],

    configLots: [],
    lots: [],
    jackpot: {},
    jackpots: [],

    userActionSuccess: false,
    cashdeskActionSuccess: false,
    cashdeskOpOpenSuccess: false,
    cashdeskOpCloseSuccess: false,
    jackpotConfigActionSuccess: false,
    placeBetSuccess: false,
    cashoutSuccess: false,
    drawJackpotSuccess: false,

    error: '',
}

const AppSlice = createSlice({
    name: 'Application',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(resetReducer.fulfilled, () => {
            return initialState;
        })

        // role
        builder.addCase(getRoles.fulfilled, (state, action:any) => {
            state.roles = action.payload?.data;
        });
        builder.addCase(getRoles.rejected, (state, action:any) => {
            state.roles = [];
            state.error = action.error.message
        });


        // User
        builder.addCase(getAllUser.fulfilled, (state, action:any) => {
            state.allUsers = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getAllUser.rejected, (state, action:any) => {
            state.allUsers = [];
            state.error = action.error.message
        });

        builder.addCase(getUsers.fulfilled, (state, action:any) => {
            state.users = action.payload?.data;
            state.userActionSuccess = false;
            state.error = '';
        });
        builder.addCase(getUsers.rejected, (state, action:any) => {
            state.users = [];
            state.userActionSuccess = false;
            state.error = action.error.message;
        });

        builder.addCase(getUser.fulfilled, (state, action:any) => {
            state.user = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getUser.rejected, (state, action:any) => {
            state.user = {};
            state.error = action.error.message;
        });

        builder.addCase(createUser.fulfilled, (state, action:any) => {
            state.user = action.payload?.data;
            state.userActionSuccess = true;
            state.error = '';
        });
        builder.addCase(createUser.rejected, (state, action:any) => {
            state.user = {};
            state.userActionSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(updateUser.fulfilled, (state, action:any) => {
            state.user = action.payload?.data;
            state.userActionSuccess = true;
            state.error = '';
        });
        builder.addCase(updateUser.rejected, (state, action:any) => {
            state.user = {};
            state.userActionSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(updatePassword.fulfilled, (state, action:any) => {
            state.user = action.payload?.data;
            state.userActionSuccess = true;
            state.error = '';
        });
        builder.addCase(updatePassword.rejected, (state, action:any) => {
            state.user = {};
            state.userActionSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(resetUserPassword.fulfilled, (state) => {
            state.user = {};
            state.userActionSuccess = true;
            state.error = '';
        });
        builder.addCase(resetUserPassword.rejected, (state, action:any) => {
            state.user = {};
            state.userActionSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(deleteUser.fulfilled, (state) => {
            state.user = {};
            state.userActionSuccess = true;
            state.error = '';
        });
        builder.addCase(deleteUser.rejected, (state, action:any) => {
            state.user = {};
            state.userActionSuccess = false;
            state.error = action.error.message
        });


        // Cashdesk
        builder.addCase(getAllCashdesks.fulfilled, (state, action:any) => {
            state.allCashdesks = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getAllCashdesks.rejected, (state, action:any) => {
            state.allCashdesks = [];
            state.error = action.error.message
        });

        builder.addCase(getClosedCashdesks.fulfilled, (state, action:any) => {
            state.allCashdesks = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getClosedCashdesks.rejected, (state, action:any) => {
            state.allCashdesks = [];
            state.error = action.error.message
        });

        builder.addCase(getCashdesks.fulfilled, (state, action:any) => {
            state.cashdesks = action.payload?.data;
            state.cashdeskActionSuccess = false;
            state.error = '';
        });
        builder.addCase(getCashdesks.rejected, (state, action:any) => {
            state.cashdesks = [];
            state.cashdeskActionSuccess = false;
            state.error = action.error.message;
        });

        builder.addCase(getCashdesk.fulfilled, (state, action:any) => {
            state.cashdesk = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getCashdesk.rejected, (state, action:any) => {
            state.cashdesk = {};
            state.error = action.error.message;
        });

        builder.addCase(createCashdesk.fulfilled, (state, action:any) => {
            state.cashdesk = action.payload?.data;
            state.cashdeskActionSuccess = true;
            state.error = '';
        });
        builder.addCase(createCashdesk.rejected, (state, action:any) => {
            state.cashdesk = {};
            state.cashdeskActionSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(updateCashdesk.fulfilled, (state, action:any) => {
            state.cashdesk = action.payload?.data;
            state.cashdeskActionSuccess = true;
            state.error = '';
        });
        builder.addCase(updateCashdesk.rejected, (state, action:any) => {
            state.cashdesk = {};
            state.cashdeskActionSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(deleteCashdesk.fulfilled, (state, action:any) => {
            state.cashdesk = action.payload?.data;
            state.cashdeskActionSuccess = true;
            state.error = '';
        });
        builder.addCase(deleteCashdesk.rejected, (state, action:any) => {
            state.cashdesk = {};
            state.cashdeskActionSuccess = false;
            state.error = action.error.message
        });

        // CashDeskOp
        builder.addCase(getCashDeskOps.fulfilled, (state, action:any) => {
            state.cashdeskOps = action.payload?.data;
            state.cashdeskOpOpenSuccess = false;
            state.cashdeskOpCloseSuccess = false;
            state.error = '';
        });
        builder.addCase(getCashDeskOps.rejected, (state, action:any) => {
            state.cashdeskOps = [];
            state.cashdeskOpOpenSuccess = false;
            state.cashdeskOpCloseSuccess = false;
            state.error = action.error.message;
        });

        builder.addCase(openCashDesk.fulfilled, (state, action:any) => {
            state.cashdeskOp = action.payload?.data;
            localStorage.setItem('cashDesk', action.payload?.data?.cashdesk.name);
            state.cashdeskOpOpenSuccess = true;
            state.error = '';
        });
        builder.addCase(openCashDesk.rejected, (state, action:any) => {
            state.cashdeskOp = {};
            state.cashdeskOpOpenSuccess = false;
            state.error = action.error.message;
        });

        builder.addCase(closeCashDesk.fulfilled, (state, action:any) => {
            state.cashdeskOp = action.payload?.data;
            state.cashdeskOpCloseSuccess = true;
            state.error = '';
        });
        builder.addCase(closeCashDesk.rejected, (state, action:any) => {
            state.cashdeskOp = {};
            state.cashdeskOpCloseSuccess = false;
            state.error = action.error.message;
        });

        builder.addCase(getCashDeskOp.fulfilled, (state, action:any) => {
            state.cashdeskOp = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getCashDeskOp.rejected, (state, action:any) => {
            state.cashdeskOp = {};
            state.error = action.error.message;
        });

        builder.addCase(getCurentCashDeskOp.fulfilled, (state, action:any) => {
            state.openCashdeskOp = action.payload?.data;
            localStorage.setItem('cashDesk', action.payload?.data?.cashdesk?.name);
            state.cashdeskOpOpenSuccess = false;
            state.error = '';
        });
        builder.addCase(getCurentCashDeskOp.rejected, (state, action:any) => {
            state.cashdeskOp = {};
            state.cashdeskOpOpenSuccess = false;
            state.error = action.error.message;
        });


        // Jackpot
        builder.addCase(getAllJackpotConfigs.fulfilled, (state, action:any) => {
            state.allJackpotConfigs = action.payload?.data;
            state.jackpotConfigActionSuccess = false;
            state.error = '';
        });
        builder.addCase(getAllJackpotConfigs.rejected, (state, action:any) => {
            state.allJackpotConfigs = [];
            state.jackpotConfigActionSuccess = false;
            state.error = action.error.message;
        });

        builder.addCase(getJackpotConfigs.fulfilled, (state, action:any) => {
            state.jackpotConfigs = action.payload?.data;
            state.jackpotConfigActionSuccess = false;
            state.error = '';
        });
        builder.addCase(getJackpotConfigs.rejected, (state, action:any) => {
            state.jackpotConfigs = [];
            state.jackpotConfigActionSuccess = false;
            state.error = action.error.message;
        });

        builder.addCase(createJackpotConfig.fulfilled, (state, action:any) => {
            state.jackpotConfig = action.payload?.data;
            state.jackpotConfigActionSuccess = true;
            state.error = '';
        });
        builder.addCase(createJackpotConfig.rejected, (state, action:any) => {
            state.jackpotConfig = {};
            state.jackpotConfigActionSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(updateJackpotConfig.fulfilled, (state, action:any) => {
            state.jackpotConfig = action.payload?.data;
            state.jackpotConfigActionSuccess = true;
            state.error = '';
        });
        builder.addCase(updateJackpotConfig.rejected, (state, action:any) => {
            state.jackpotConfig = {};
            state.jackpotConfigActionSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(deleteJackpotConfig.fulfilled, (state, action:any) => {
            state.jackpotConfig = action.payload?.data;
            state.jackpotConfigActionSuccess = true;
            state.error = '';
        });
        builder.addCase(deleteJackpotConfig.rejected, (state, action:any) => {
            state.jackpotConfig = {};
            state.jackpotConfigActionSuccess = false;
            state.error = action.error.message
        });

        // Bet
        builder.addCase(placeBet.fulfilled, (state, action:any) => {
            state.bet = action.payload?.data;
            state.placeBetSuccess = true;
            state.error = '';
        });
        builder.addCase(placeBet.rejected, (state, action:any) => {
            state.bet = {};
            state.placeBetSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(getLatestBet.fulfilled, (state, action:any) => {
            state.lastBets = action.payload?.data;
            state.bet = {};
            state.placeBetSuccess = false;
            state.error = '';
        });
        builder.addCase(getLatestBet.rejected, (state, action:any) => {
            state.lastBets = [];
            state.placeBetSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(getBets.fulfilled, (state, action:any) => {
            state.bets = action.payload?.data;
            state.placeBetSuccess = false;
            state.error = '';
        });
        builder.addCase(getBets.rejected, (state, action:any) => {
            state.bets = [];
            state.placeBetSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(getOpBets.fulfilled, (state, action:any) => {
            state.bets = action.payload?.data;
            state.placeBetSuccess = false;
            state.error = '';
        });
        builder.addCase(getOpBets.rejected, (state, action:any) => {
            state.bets = [];
            state.placeBetSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(getBet.fulfilled, (state, action:any) => {
            state.bet = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getBet.rejected, (state, action:any) => {
            state.bet = [];
            state.error = action.error.message
        });

        // Check & cashOut
        builder.addCase(getCheckBet.fulfilled, (state, action:any) => {
            state.checkedBet = action.payload?.data;
            state.cashoutSuccess = false;
            state.error = '';
        });
        builder.addCase(getCheckBet.rejected, (state, action:any) => {
            state.checkedBet = {};
            state.cashoutSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(cashOutBet.fulfilled, (state, action:any) => {
            state.cashoutBet = action.payload?.data;
            state.cashoutSuccess = true;
            state.error = '';
        });
        builder.addCase(cashOutBet.rejected, (state, action:any) => {
            state.cashoutBet = {};
            state.cashoutSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(getCashouts.fulfilled, (state, action:any) => {
            state.cashOuts = action.payload?.data;
            state.cashoutSuccess = false;
            state.error = '';
        });
        builder.addCase(getCashouts.rejected, (state, action:any) => {
            state.cashOuts = [];
            state.cashoutSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(getCashout.fulfilled, (state, action:any) => {
            state.cashOut = action.payload?.data;
            state.cashoutSuccess = false;
            state.error = '';
        });
        builder.addCase(getCashout.rejected, (state, action:any) => {
            state.cashOut = {};
            state.cashoutSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(getCashoutsOp.fulfilled, (state, action:any) => {
            state.cashOuts = action.payload?.data;
            state.cashoutSuccess = false;
            state.cashoutBet = {};
            state.checkedBet = {};
            state.error = '';
        });
        builder.addCase(getCashoutsOp.rejected, (state, action:any) => {
            state.cashOuts = [];
            state.cashoutSuccess = false;
            state.error = action.error.message
        });

        // CashBack
        builder.addCase(getCheckCashBack.fulfilled, (state, action:any) => {
            state.cashBackCheked = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getCheckCashBack.rejected, (state, action:any) => {
            state.cashBackCheked = [];
            state.error = action.error.message
        });

        builder.addCase(placeCashBackBet.fulfilled, (state, action:any) => {
            state.bet = action.payload?.data;
            state.placeBetSuccess = true;
            state.error = '';
        });
        builder.addCase(placeCashBackBet.rejected, (state, action:any) => {
            state.bet = {};
            state.placeBetSuccess = false;
            state.error = action.error.message
        });

        // Report
        builder.addCase(getBetReport.fulfilled, (state, action:any) => {
            state.betReports = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getBetReport.rejected, (state, action:any) => {
            state.betReports = [];
            state.error = action.error.message
        });

        builder.addCase(getPaymentReport.fulfilled, (state, action:any) => {
            state.paymentReports = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getPaymentReport.rejected, (state, action:any) => {
            state.paymentReports = [];
            state.error = action.error.message
        });

        builder.addCase(getDayliReport.fulfilled, (state, action:any) => {
            state.dayReports = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getDayliReport.rejected, (state, action:any) => {
            state.dayReports = [];
            state.error = action.error.message
        });

        builder.addCase(getMonthliReport.fulfilled, (state, action:any) => {
            state.monthReports = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getMonthliReport.rejected, (state, action:any) => {
            state.monthReports = [];
            state.error = action.error.message
        });
        
        builder.addCase(getAllReport.fulfilled, (state, action:any) => {
            state.allReports = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getAllReport.rejected, (state, action:any) => {
            state.allReports = [];
            state.error = action.error.message
        });

        // Lots
        builder.addCase(getConfigLots.fulfilled, (state, action:any) => {
            state.configLots = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getConfigLots.rejected, (state, action:any) => {
            state.configLots = [];
            state.error = action.error.message
        });

        builder.addCase(getLots.fulfilled, (state, action:any) => {
            state.lots = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getLots.rejected, (state, action:any) => {
            state.lots = [];
            state.error = action.error.message
        });

        builder.addCase(drawLots.fulfilled, (state) => {
            state.error = '';
        });
        builder.addCase(drawLots.rejected, (state, action:any) => {
            state.error = action.error.message
        });

        // Jackpots
        builder.addCase(getJackpots.fulfilled, (state, action:any) => {
            state.jackpots = action.payload?.data;
            state.drawJackpotSuccess = false;
            state.error = '';
        });
        builder.addCase(getJackpots.rejected, (state, action:any) => {
            state.jackpots = [];
            state.drawJackpotSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(getActiveJackpot.fulfilled, (state, action:any) => {
            state.jackpot = action.payload?.data;
            state.error = '';
        });
        builder.addCase(getActiveJackpot.rejected, (state, action:any) => {
            state.jackpot = {};
            state.error = action.error.message
        });

        builder.addCase(createJackpot.fulfilled, (state, action:any) => {
            state.jackpot = action.payload?.data;
            state.drawJackpotSuccess = true;
            state.error = '';
        });
        builder.addCase(createJackpot.rejected, (state, action:any) => {
            state.jackpot = {};
            state.drawJackpotSuccess = false;
            state.error = action.error.message
        });

        builder.addCase(updateJackpot.fulfilled, (state, action:any) => {
            state.jackpot = action.payload?.data;
            state.drawJackpotSuccess = true;
            state.error = '';
        });
        builder.addCase(updateJackpot.rejected, (state, action:any) => {
            state.jackpot = {};
            state.drawJackpotSuccess = false;
            state.error = action.error.message
        });
    }
})

export default AppSlice.reducer;