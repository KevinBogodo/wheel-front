import { useEffect } from "react"
import { useProfile } from "@/components/Hooks/UserHooks"
import { setAuthorization } from "@/helper/api_helper"
import { logoutUser } from "@/slice/thunks"
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const AuthProtected = (props : any) => {
    const dispatch : any =  useDispatch()
    const { userProfile, token } = useProfile()

    useEffect(() => {
        
        if (userProfile && token) {
            setAuthorization(token)
        } else if(!userProfile && !token) {
            dispatch(logoutUser())
        }
    },[token, userProfile, dispatch]);

    if (!(userProfile?.name) && !token) {
        return (
            <Navigate
                to="/login"
                state={{ from: props.location }}
                replace
            />
        );
    }

    return <>{props.children}</>;
}

export default AuthProtected;
