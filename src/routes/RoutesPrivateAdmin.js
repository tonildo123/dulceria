import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from "../components/LayoutComponent";
import Address from '../pages/Address';
import CreateUsers from '../pages/CreateUsers';
import Police from '../pages/Police';
import Home from "../pages/home";
import Inicio from '../pages/inicio/inicio';

const RoutesPrivateAdmin = () => (
    <Layout>
        <Routes>   
            <Route path='/' element={<CreateUsers />} />
            <Route path='/home' element={<Home />} />       
            <Route path='/address' element={<Address />} /> 
            <Route path='/police' element={<Police />} />   
            <Route path='/alert' element={<Inicio />} />            
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    </Layout>

);

export default RoutesPrivateAdmin;  