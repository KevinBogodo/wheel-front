import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
    getRoles as getRolesApi,
    // Users
    getAllUser as getAllUserApi,
    getUsers as getUsersApi,
    getUser as getUserApi,
    createUser as createUserApi,
    updateUser as updateUserApi,
    deleteUser as deleteUserApi,
    resetUserPassword as resetUserPasswordApi,
    updatePassword as updatePasswordApi,
    // Cashdesk
    getCashdesks as getCashdesksApi,
    getAllCashdesks as getAllCashdesksApi,
    getClosedCashdesks as getClosedCashdesksApi,
    getCashdesk as getCashdeskApi,
    createCashdesk as createCashdeskApi,
    updateCashdesk as updateCashdeskApi,
    deleteCashdesk as deleteCashdeskApi,
    // CashdeskOp
    openCashDesk as openCashDeskApi,
    closeCashDesk as closeCashDeskApi,
    getCashDeskOp as getCashDeskOpApi,
    getCurentCashDeskOp as getCurentCashDeskOpApi,
    getCashDeskOps as getCashDeskOpsApi,
    // Jackpots 
    getAllJackpotConfigs as getAllJackpotConfigsApi,
    getJackpotConfigs as getJackpotConfigsApi,
    createJackpotConfig as createJackpotConfigApi,
    updateJackpotConfig as updateJackpotConfigApi,
    deleteJackpotConfig as deleteJackpotConfigApi,
    activateJackpot as activateJackpotApi,
    // Bet
    placeBet as placeBetApi,
    getBets as getBetsApi,
    getOpBets as getOpBetsApi,
    getBet as getBetApi,
    getLatestBet as getLatestBetApi,
    // Check & Cashout
    getCheckBet as getCheckBetApi,
    cashoutBet as cashoutBetApi,
    getCashouts as getCashoutsApi,
    getCashout as getCashoutApi,
    getCashoutsOp as getCashoutsOpApi,
    // CashBack
    getCheckCashBack as getCheckCashBackApi,
    placeCashBackBet as placeCashBackBetApi,
    // Report
    getBetReport as getBetReportApi,
    getPaymentReport as getPaymentReportApi,
    getDayliReport as getDayliReportApi,
    getMonthliReport as getMonthliReportApi,
    getAllReport as getAllReportApi,
    //Lots
    getConfigLots as getConfigLotsApi,
    getLots as getLotsApi,
    drawLots as drawLotsApi,
    //Jackpots
    getJackpots as getJackpotsApi,
    getActiveJackpot as getActiveJackpotApi,
    createJackpot as createJackpotApi,
    updateJackpot as updateJackpotApi,

} from '../../helper/backend_helper';
import { AxiosResponse } from "axios";


export const resetReducer = createAsyncThunk("settings/resetReducer", async() => {
    
})

export const getRoles = createAsyncThunk('settings/getRoles', async() => {
    try {
        return await getRolesApi();
    } catch (error) {
        return Promise.reject(error);
    }
});

// Users
export const getAllUser = createAsyncThunk('settings/getAllUser', async() => {
    try {
        return await getAllUserApi();
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getUsers = createAsyncThunk('settings/getUsers', async(config: {[key:string]: string}) => {
    try {
        return await getUsersApi(config);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getUser = createAsyncThunk('settings/getUser', async(id: string) => {
    try {
        return await getUserApi(id);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const createUser = createAsyncThunk('settings/createUser', async(config: {[key:string]: string}) => {
    try {
        const response:any = await createUserApi(config);
        toast.success(response?.message, { autoClose: 5000 });
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 10000 });
        return Promise.reject(error);
    }
});

export const updatePassword = createAsyncThunk('settings/updatePassword', async(config: {password: string}) => {
    try {
        const response:any = await updatePasswordApi(config);
        toast.success(response?.message, { autoClose: 5000 });
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 10000 });
        return Promise.reject(error);
    }
});

export const updateUser = createAsyncThunk('settings/updateUser', async(config: {id: string, body:{[key:string]: string}}) => {
    try {
        const response:any = await updateUserApi(config);
        toast.success(response?.message, { autoClose: 5000 })
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 10000 });
        return Promise.reject(error);
    }
});

export const resetUserPassword = createAsyncThunk('settings/resetUserPassword', async(id: string) => {
    try {
        const response:any = await resetUserPasswordApi(id);
        toast.success(response?.message, { autoClose: 5000 })
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 10000 });
        return Promise.reject(error);
    }
});

export const deleteUser = createAsyncThunk('settings/deleteUser', async(id: string) => {
    try {
        const response:any = await deleteUserApi(id);
        toast.success(response?.message, { autoClose: 5000 })
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 10000 });
        return Promise.reject(error);
    }
});

// Cashdesk
export const getAllCashdesks = createAsyncThunk('settings/getAllCashdesks', async() => {
    try {
        return await getAllCashdesksApi();
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getClosedCashdesks = createAsyncThunk('settings/getClosedCashdesks', async() => {
    try {
        return await getClosedCashdesksApi();
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getCashdesks = createAsyncThunk('settings/getCashdesks', async(config: {[key:string]: string}) => {
    try {
        return await getCashdesksApi(config);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getCashdesk = createAsyncThunk('settings/getCashdesk', async(id: string) => {
    try {
        return await getCashdeskApi(id);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const createCashdesk = createAsyncThunk('settings/createCashdesk', async(config: {[key:string]: string}) => {
    try {
        const response:any = await createCashdeskApi(config);
        toast.success(response?.message, { autoClose: 5000 });
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 10000 });
        return Promise.reject(error);
    }
});

export const updateCashdesk = createAsyncThunk('settings/updateCashdesk', async(config: {id: string, body:{[key:string]: string}}) => {
    try {
        const response:any = await updateCashdeskApi(config);
        toast.success(response?.message, { autoClose: 5000 })
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 10000 });
        return Promise.reject(error);
    }
});

export const deleteCashdesk = createAsyncThunk('settings/deleteCashdesk', async(id: string) => {
    try {
        const response:any = await deleteCashdeskApi(id);
        toast.success(response?.message, { autoClose: 5000 })
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 10000 });
        return Promise.reject(error);
    }
});

// CashdeskOp
export const openCashDesk = createAsyncThunk('settings/openCashDesk', async(config: {cashDeskId: string, openAmount : number}) => {
    try {
        return await openCashDeskApi(config);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const closeCashDesk = createAsyncThunk('settings/closeCashDesk', async(config: {closeAmount: number}) => {
    try {
        return await closeCashDeskApi(config);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getCashDeskOp = createAsyncThunk('settings/getCashDeskOp', async(id: string) => {
    try {
        return await getCashDeskOpApi(id);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getCurentCashDeskOp = createAsyncThunk('settings/getCurentCashDeskOp', async() => {
    try {
        return await getCurentCashDeskOpApi();
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getCashDeskOps = createAsyncThunk('settings/getCashDeskOps', async(config: {[key:string]: string}) => {
    try {
        const response = await getCashDeskOpsApi(config);
        return response;

    } catch (error) {
        return Promise.reject(error);
    }
});

// Jackpot config
export const getAllJackpotConfigs = createAsyncThunk('settings/getAllJackpotConfigs', async() => {
    try {
        return await getAllJackpotConfigsApi();
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getJackpotConfigs = createAsyncThunk('settings/getJackpotConfigs', async(config: {[key:string]: string}) => {
    try {
        return await getJackpotConfigsApi(config);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const createJackpotConfig = createAsyncThunk('settings/createJackpotConfig', async(config: {name: string, amount: number}) => {
    try {
        const response:any = await createJackpotConfigApi(config);
        toast.success(response?.message, { autoClose: 5000 });
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 10000 });
        return Promise.reject(error);
    }
});

export const updateJackpotConfig = createAsyncThunk('settings/updateJackpotConfig', async(config: {id: string, body:{name: string, amount: number}}) => {
    try {
        const response:any = await updateJackpotConfigApi(config);
        toast.success(response?.message, { autoClose: 5000 })
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 10000 });
        return Promise.reject(error);
    }
});

export const deleteJackpotConfig = createAsyncThunk('settings/deleteJackpotConfig', async(id: string) => {
    try {
        const response:any = await deleteJackpotConfigApi(id);
        toast.success(response?.message, { autoClose: 5000 })
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 10000 });
        return Promise.reject(error);
    }
});

export const activateJackpot = createAsyncThunk('settings/activateJackpot', async(data: {id: string, number?: number}) => {
    try {
        const response:any = await activateJackpotApi(data);
        toast.success(response?.message, { autoClose: 5000 })
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 10000 });
        return Promise.reject(error);
    }
});

// Bet
export const placeBet = createAsyncThunk('settings/placeBet', async(config: {draw: string, body:{[key:string]: number}}) => {
    try {
        return await placeBetApi(config);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getBets = createAsyncThunk('settings/getBets', async(config: {[key:string]: string}) => {
    try {
        return await getBetsApi(config);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getOpBets = createAsyncThunk('settings/getOpBets', async(config: {[key:string]: string}) => {
    try {
        return await getOpBetsApi(config);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getBet = createAsyncThunk('settings/getBet', async(id: string) => {
    try {
        return await getBetApi(id);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getLatestBet = createAsyncThunk('settings/getLatestBet', async() => {
    try {
        return await getLatestBetApi();
    } catch (error) {
        return Promise.reject(error);
    }
});

// Check Bet & cashout
export const getCheckBet = createAsyncThunk('settings/getCheckBet', async(number: string) => {
    try {
        return await getCheckBetApi(number);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const cashOutBet = createAsyncThunk('settings/cashOutBet', async(data: { opId: string, id: string}) => {
    try {
        const response = await cashoutBetApi(data);
        toast.success("Payment success", { autoClose: 5000 });
        return response;
    } catch (error) {
        toast.error("Payment error", { autoClose: 5000 });
        return Promise.reject(error);
    }
});

export const getCashouts = createAsyncThunk('settings/getCashouts', async(data: {[key:string]: string}) => {
    try {
        return await getCashoutsApi(data);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getCashout = createAsyncThunk('settings/getCashout', async(id: string) => {
    try {
        return await getCashoutApi(id);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getCashoutsOp = createAsyncThunk('settings/getCashoutsOp', async(data: {[key:string]: string}) => {
    try {
        const response = await getCashoutsOpApi(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
});

// CashBack
export const getCheckCashBack = createAsyncThunk('settings/getCheckCashBack', async(number: string) => {
    try {
        return await getCheckCashBackApi(number);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const placeCashBackBet = createAsyncThunk('settings/placeCashBackBet', async(data: {draw:string, body: { bet: any, tickets: any }}) => {
    try {
        const response = await placeCashBackBetApi(data);
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 5000 });
        return Promise.reject(error);
    }
});

// Report
export const getBetReport = createAsyncThunk('settings/getBetReport', async(data: {[key:string]: string}) => {
    try {
        return await getBetReportApi(data);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getPaymentReport = createAsyncThunk('settings/getPaymentReport', async(data: {[key:string]: string}) => {
    try {
        return await getPaymentReportApi(data);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getDayliReport = createAsyncThunk('settings/getDayliReport', async(data: {[key:string]: string}) => {
    try {
        return await getDayliReportApi(data);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getMonthliReport = createAsyncThunk('settings/getMonthliReport', async(data: {[key:string]: string}) => {
    try {
        return await getMonthliReportApi(data);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getAllReport = createAsyncThunk('settings/getAllReport', async(data: {[key:string]: string}) => {
    try {
        return await getAllReportApi(data);
    } catch (error) {
        return Promise.reject(error);
    }
});

//Lots

export const getConfigLots = createAsyncThunk('cashier/getConfigLots', async() => {
    try {
        return await getConfigLotsApi();
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getLots = createAsyncThunk('cashier/getLots', async(data: {[key:string]: string}) => {
    try {
        return await getLotsApi(data);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const drawLots = createAsyncThunk('cashier/drawLots', async(data: {number:string, time: string}) => {
    try {
        const response:AxiosResponse<{data: any, message: string}> = await drawLotsApi(data);
        toast.error(response.data.message, { autoClose: 5000 });
        return response;
    } catch (error:any) {
        toast.error(error.message, { autoClose: 5000 });
        return Promise.reject(error);
    }
});

//Jackpots

export const getJackpots = createAsyncThunk('settings/getJackpots', async(data: {[key:string]: string}) => {
    try {
        return await getJackpotsApi(data);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const getActiveJackpot = createAsyncThunk('settings/getActiveJackpot', async() => {
    try {
        return await getActiveJackpotApi();
    } catch (error) {
        return Promise.reject(error);
    }
});

export const createJackpot = createAsyncThunk('settings/createJackpot', async(data: { date: string, configId: string}) => {
    try {
        return await createJackpotApi(data);
    } catch (error) {
        return Promise.reject(error);
    }
});

export const updateJackpot = createAsyncThunk('settings/updateJackpot', async(data: { id: string, body: {date: string, configId: string}}) => {
    try {
        return await updateJackpotApi(data);
    } catch (error) {
        return Promise.reject(error);
    }
});