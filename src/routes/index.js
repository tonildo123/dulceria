/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useFirebaseLogin from '../hooks/useFirebaseLogin';
import RoutesPrivate from './RoutesPrivate';
import RoutesPrivateAdmin from './RoutesPrivateAdmin';
import RoutesPrivatePolice from './RoutesPrivatePolice';
import RoutesPublic from './RoutesPublic';


const RouterApp = () => {

    const { logged, role } = useSelector(state => state.logger.user);
    const { handleLogin } = useFirebaseLogin()
   

    useEffect(() => {

        const asd = sessionStorage.getItem("emailSession");
        const zxc = sessionStorage.getItem("passSession");
    
        if (asd !== undefined && asd !== null) {
          const email = asd
          const password = zxc
    
          handleLogin(email, password);
        }
    
      }, [])


    return (

        <BrowserRouter>
            <Routes>
                {logged ? (
                <>
                    {role === 'admin' && <Route path="/*" element={<RoutesPrivateAdmin />} />}
                    {role === 'police' && <Route path="/*" element={<RoutesPrivatePolice />} />}
                    {role === 'client' && <Route path="/*" element={<RoutesPrivate />} />}
                </>
                ) : (
                <Route path="/*" element={<RoutesPublic />} />
                )}
            </Routes>
        </BrowserRouter>
    )
};


export default RouterApp;
