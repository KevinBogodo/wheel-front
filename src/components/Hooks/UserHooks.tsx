import { getLoggedInUserToken } from '@/helper/api_helper';
import { useEffect, useState } from 'react'

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const useProfile = () => {

    const selectLayoutState = (state: any) => state.Login;
    const LoginProperties = createSelector(
        selectLayoutState,
        (login) => ({
            user: login.user, 
        })
    )
    const { user } = useSelector(LoginProperties)
    const userTokenSession = getLoggedInUserToken()
    var token:string = userTokenSession && userTokenSession
    const [loading, setLoading] = useState(userTokenSession ? false : true)
    const [userProfile, setUserProfile] = useState( user || null)

    useEffect(() => {
        const userTokenSession = getLoggedInUserToken();
        var token:string = userTokenSession && userTokenSession;
        setUserProfile(user || null);
        setLoading(token ? false : true)
    },[user])

    return { userProfile, loading, token }

}

export { useProfile }