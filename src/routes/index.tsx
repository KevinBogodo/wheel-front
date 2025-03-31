import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom"

import NonAuthLayout from "../Layout/NonAuthLayout";
import { authProtectedRoutes, publicRoutes } from "./AllRoutes";
import AuthProtected from "./AuthProtected";
import AuthLayout from '../Layout/index';


const Index = () => {  
    
    const location = useLocation()  
    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {publicRoutes.map((route, idx) => (
                        <Route 
                            path={route.path}
                            element={
                                <NonAuthLayout>
                                    {route.component}
                                </NonAuthLayout>
                            }
                            key={idx}
                        />
                    ))}
                </Route>
                <Route>
                    {authProtectedRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                // <AuthProtected location={''}>
                                <AuthProtected location={location || ''}>
                                    <AuthLayout>
                                        {route.component}
                                    </AuthLayout>
                                </AuthProtected>
                            }
                            key={idx}
                        />
                    ))}
                </Route>
            </Routes>
        </React.Fragment>
    )
}

export default Index