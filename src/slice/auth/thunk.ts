import { AppDispatch } from "@/store"
import { login, refresh, logout, getLogUser} from "../../helper/backend_helper"
import { loginSuccess, logoutUserSuccess, apiError,reset_login_flag } from "./reducer"
import { setAuthorization, removeAuthorization } from "@/helper/api_helper"
import { toast } from 'react-toastify'


export const loginUser =
(
    user:{username: string, password: string},
    history: any
) => async (dispatch: AppDispatch) => {
    try {
        const response:any = await login(user)
        if (response?.data) {
            const token:string = response.token || response.data.token
            // const refreshToken = response.Token || response.data.refreshToken
            const role = response.role || response.data.role.name

            localStorage.setItem("role", JSON.stringify(role))
            localStorage.setItem("token", JSON.stringify(token))
            // localStorage.setItem("refreshToken", JSON.stringify(refreshToken))
            if (role === 'cashier') {
                history('/caisse/paris');
            } else if (role === 'manager') {
                history('/rapport/vente');
            } else if (role === 'support') {
                history('/parametres/caisses');
            } else if (role === 'admin' || role === 'Root') {
                history('/rapport/statistics');
            }
            setAuthorization(token)
            dispatch(getCurrentUser())
        } else {
            toast.error(response.message, { autoClose: 5000 })
            dispatch(apiError(response))
        }
    } catch (error) {
        toast.error("Error connetion", { autoClose: 5000 })
        dispatch(apiError(error))
    }
}

export const getCurrentUser = () => async (dispatch: AppDispatch) => {
    try {
        let response:any = await getLogUser();

        if (response) {
            dispatch(loginSuccess(response.data))
            localStorage.setItem("permission", JSON.stringify(response.data.role.name))
            localStorage.setItem("role", JSON.stringify(response.data.role.name))
            localStorage.setItem("username", JSON.stringify(response.data.username))
        }
    } catch (error) {
        return error
    }
}

// export const getValidateToken = (navigate) => async() => {

// }

export const refreshToken = (history?: (path: string) => void) => async() => {
    try {
        const data = {
            "token": JSON.parse(localStorage.getItem("token") || ""),
            "refreshToken": JSON.parse(localStorage.getItem("refreshToken") || "")
        }

        let resp:any = await refresh(data)
        if (resp.data) {
            localStorage.setItem("token", JSON.stringify(resp.data.token))
            localStorage.setItem("refreshToken", JSON.stringify(resp.data.refreshToken))
            setAuthorization(resp.data.token)
        }
    } catch (error) {
        if (history) {
            return history('/login')
        }
    }
}

export const logoutUser = (history?: (path: string) => void) => async (dispatch: AppDispatch) => {
    try {
        await logout();
        dispatch(logoutUserSuccess()); // Assurez-vous que `logoutUserSuccess` est typé correctement
    } catch (error: unknown) {
        dispatch(apiError(error)); // Ajoutez un typage pour `apiError`
    }
    removeAuthorization();
    localStorage.clear();

    if (history) {
        history('/login');
    }
};


export const resetLoginFlag = () => async (dispatch: Function) => {
    try {
        const response = dispatch(reset_login_flag());
        return response;
      } catch (error) {
          dispatch(apiError(error));
      }
}