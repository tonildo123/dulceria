/* eslint-disable */
import { useSelector } from 'react-redux';
import RoutesPrivate from './RoutesPrivate';
import RoutesPublic from './RoutesPublic';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import useFirebaseLogin from '../hooks/useFirebaseLogin';


const RouterApp = () => {

    const { logged } = useSelector(state => state.logger.user);
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
                {
                    logged
                        ? <Route path="/*" element={<RoutesPrivate />} />
                        : <Route path="/*" element={<RoutesPublic />} />
                }
            </Routes>
        </BrowserRouter>
    )
};


export default RouterApp;
