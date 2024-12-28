import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from "../components/LayoutComponent";
import Address from '../pages/Address';
import Home from "../pages/home";
import Inicio from "../pages/inicio/inicio";

const RoutesPrivate = () => (
    <Layout>
        <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/home' element={<Home />} />       
            <Route path='/address' element={<Address />} />            
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    </Layout>

);

export default RoutesPrivate;  