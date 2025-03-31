import { APIClient } from "./api_helper"
import * as url from "./url_helper"

const api = new APIClient()

export const login = (data: {[key:string]: string}) => api.create(url.LOGIN, data);
export const refresh = (data: {[key:string]: string}) => api.create(url.REFRESH_TOKEN, data);
export const logout = () => api.create(url.LOG_OUT, null);
export const getLogUser = () => api.get(url.GET_USER);

export const getDrawData = () => api.get(url.DRAW_DATA);

export const openCashDesk = (data: {cashDeskId: string, openAmount : number}) => api.create(url.CASHDESK_OP, data);
export const closeCashDesk = (data: {closeAmount: number}) => api.update(url.CASHDESK_OP, data);
export const getCashDeskOp = (id: string) => api.get(url.CASHDESK_OP + '/' + id);
export const getCurentCashDeskOp = () => api.get(url.CASHDESK_OP_USER);
export const getCashDeskOps = (data: {[key:string]: string}) => api.get(url.CASHDESK_OP + '?page=' + data.page + '&size=' + data.size + (data.user ? '&user=' + data.user : '') );

export const getCashdesks = (data: {[key:string]: string}) => api.get(url.CASHDESK+ "?page=" + data.page + '&size=' + data.size);
export const getAllCashdesks = () => api.get(url.CASHDESK +'/all');
export const getClosedCashdesks = () => api.get(url.CASHDESK +'/closed');
export const getCashdesk = (id: string) => api.get(url.CASHDESK+ '/'+id);
export const createCashdesk = (data: {[key:string]: string}) => api.create(url.CASHDESK, data);
export const updateCashdesk = (data: {id: string, body:{[key:string]: string}}) => api.update(url.CASHDESK+'/'+data.id, data.body);
export const deleteCashdesk = (id: string) => api.delete(url.CASHDESK+ '/'+id);

export const getRoles = () => api.get(url.ROLE);

export const getUsers = (data: {[key:string]: string}) => api.get(url.USER + "?page=" + data.page + '&size=' + data.size);
export const getAllUser = () => api.get(url.USER + '/all');
export const getUser = (id: string) => api.get(url.USER + '/' + id);
export const createUser = (data: {[key:string]: string}) => api.create(url.USER, data);
export const updatePassword = (data: {password: string}) => api.create('/updatePassword' + url.USER, data);
export const updateUser = (data: {id: string, body:{[key:string]: string}}) => api.update(url.USER + '/' + data.id, data.body);
export const resetUserPassword = (id: string) => api.create(url.USER + '/' + id + '/resetPassword', {});
export const deleteUser = (id: string) => api.delete(url.USER + '/' + id);

export const getAllJackpotConfigs = () => api.get('/all'+ url.JACKPOT_CONFIG);
export const getJackpotConfigs = (data: {[key:string]: string}) => api.get(url.JACKPOT_CONFIG + '?page=' + data.page + '&size=' + data.size);
export const createJackpotConfig = (data: {name: string, amount: number}) => api.create(url.JACKPOT_CONFIG, data);
export const updateJackpotConfig = (data: {id: string, body:{name: string, amount: number}}) => api.update(url.JACKPOT_CONFIG + '/' + data.id, data.body);
export const deleteJackpotConfig = (id: string) => api.delete(url.JACKPOT_CONFIG + '/' +id);
export const activateJackpot = (data: {id: string, number?: number}) => api.create('/activate' + url.JACKPOT_CONFIG + '/' + data.id + (data.number ? '/' + data.number : ''));

export const placeBet = (data: {draw: string, body:{[key:string]: number}}) => api.create(url.BET + '?draw='+data.draw, data.body);
export const getBets = (data: {[key:string]: string}) => api.get(url.BET+ '?page=' + data.page + '&size=' + data.size + (data.user ? '&user=' + data.user : ''));
export const getOpBets = (data: {[key:string]: string}) => api.get('/op'+url.BET+ '?id=' + data.id + (data.user ? '&user=' + data.user : '') );
export const getBet = (id: string) => api.get(url.BET + '/' + id);
export const getLatestBet = () => api.get(url.BET + '/latest');

export const getCheckBet = (number:string) => api.create(url.CHECKS + '/' + number);
export const cashoutBet = (data: { opId: string, id: string}) => api.update(url.CASHOUTS + '?opId=' + data.opId + '&betId='+data.id);
export const getCashouts = (data: {[key:string]: string}) => api.get(url.CASHOUTS+ '?page=' + data.page + '&size=' + data.size + (data.user ? '&user=' + data.user : ''));
export const getCashout = (id: string) => api.get(url.CASHOUTS + '/' + id);
export const getCashoutsOp = (data: {[key:string]: string}) => api.get('/op'+url.CASHOUTS+ '?opId=' + data.opId+  (data.user ? '&user=' + data.user : ''));

export const getCheckCashBack = (number:string) => api.create(url.CASHBACK + '/' + number);
export const placeCashBackBet = (data: {draw:string, body: { bet: any, tickets: any }}) => api.create(url.CASHBACK + '/place/' + data.draw, data.body);


export const getBetReport = (data: {[key:string]: string}) => api.get(url.REPORTS+ '/sales' +'?startDate='+data.startDate +'&endDate='+data.endDate+(data.user ? '&user=' + data.user : ''));
export const getPaymentReport = (data: {[key:string]: string}) => api.get(url.REPORTS+ '/withdraw' +'?startDate='+data.startDate +'&endDate='+data.endDate+(data.user ? '&user=' + data.user : ''));
export const getDayliReport = (data: {[key:string]: string}) => api.get(url.REPORTS+ '/Danalytics' +'?startDate='+data.startDate +'&endDate='+data.endDate+(data.user ? '&user=' + data.user : ''));
export const getMonthliReport = (data: {[key:string]: string}) => api.get(url.REPORTS+ '/Manalytics' +'?startDate='+data.startDate +'&endDate='+data.endDate+(data.user ? '&user=' + data.user : ''));
export const getAllReport = (data: {[key:string]: string}) => api.get(url.REPORTS+ '/analytics' +(data.user ? '?user=' + data.user : ''));

export const getConfigLots = () => api.get(url.LOTS+'/config');
export const getLots = (data: {[key:string]: string}) => api.get(url.LOTS+'?page='+data.page+'&size='+data.size);
export const drawLots = (data: {number:string, time: string}) => api.create(url.LOTS+'/'+data.number+'/'+data.time);

export const getJackpots = (data: {[key:string]: string}) => api.get(url.JACKPOT+'?page='+data.page+'&size='+data.size+ (data.status ? '&status='+data.status : ''));
export const getActiveJackpot = () => api.get(url.JACKPOT+'/active');
export const createJackpot = (data: { date: string, configId: string}) => api.create(url.JACKPOT, data);
export const updateJackpot = (data: { id: string, body: {date: string, configId: string}}) => api.update(url.JACKPOT+'/'+data.id, data.body);