import { combineReducers } from "redux"
import LoginReducer from "./auth/reducer"
import AppReducer from "./app/reducer"

const rootReducer = combineReducers({
    Login: LoginReducer,
    Application: AppReducer
})

export default rootReducer;