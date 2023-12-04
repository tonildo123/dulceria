/* eslint-disable */
import { useSelector } from 'react-redux';
import RoutesPrivate from './RoutesPrivate';
import RoutesPublic from './RoutesPublic';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';


const RouterApp = () => {
    const productsInLocalStorage = JSON.parse(localStorage.getItem('products')) || [];
    const { logged } = useSelector(state => state.logger.user);

    useEffect(() => {
      console.log('localstorage : ', JSON.stringify(productsInLocalStorage, null, 5))
    }, [productsInLocalStorage])
    

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
