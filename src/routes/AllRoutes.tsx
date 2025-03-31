import { Navigate } from "react-router-dom";
import HomeScreen from "@/pages/HomeScreen"
import Authentification from "@/pages/authentification";
import Dashboard from "@/pages/Dashboard";
import UserSetting from "@/pages/setting/UserSetting";
import CashdeskSetting from "@/pages/setting/CashdeskSetting";
import JackpotSetting from "@/pages/setting/JackpotSetting";
import DrawSetting from "@/pages/setting/DrawSetting";
import GeneralSetting from "@/pages/setting/GeneralSetting";
import SaleReport from "@/pages/repport/SaleReport";
import WithDrawReport from "@/pages/repport/withDrawReport";
import Bet from "@/pages/cashier/Bet";
import Withdraw from "@/pages/cashier/Withdraw";
import CashierHistory from "@/pages/cashier/CashierHistory";
import Analyses from "@/pages/repport/Analyses";
import Lots from "@/pages/cashier/Lots";
import WheelOfFortune from "@/pages/WheelOfFortune";

const authProtectedRoutes = [
    { path: '/home', component: <Dashboard /> },

    { path: '/rapport/vente', component: <SaleReport /> },
    { path: '/rapport/retrait', component: <WithDrawReport /> },
    { path: '/rapport/statistics', component: <Analyses /> },
    { path: '/rapport/analyse', compoment: <WithDrawReport /> },
    
    { path: '/caisse/paris', component: <Bet /> },
    { path: '/caisse/retrait', component: <Withdraw /> },
    { path: '/caisse/historique', component: <CashierHistory /> },
    { path: '/caisse/lots', component: <Lots /> },

    { path: '/parametres/utilisateurs', component: <UserSetting /> },
    { path: '/parametres/caisses', component: <CashdeskSetting /> },
    { path: '/parametres/cagnottes', component: <JackpotSetting /> },
    { path: '/parametres/tirages', componennt: <DrawSetting /> },
    { path: '/parametres/generals', component: <GeneralSetting /> },
    { path: '*', component: <Navigate to='/' /> },
]

const publicRoutes = [
    { path: '/', component: <WheelOfFortune />},
    { path: '/login', component: <Authentification /> },
]

export { authProtectedRoutes, publicRoutes};