import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from "../components/LayoutComponent";
import Inicio from "../pages/inicio/inicio";
import Login from "../pages/login";
import Register from "../pages/register";

const RoutesPublic = () => (
    <Layout>
        <Routes>
            <Route path='' element={<Inicio />} />
            <Route path='login' element={<Login />} />            
            <Route path='register' element={<Register />} />            
            <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
    </Layout>
);


export default RoutesPublic;  