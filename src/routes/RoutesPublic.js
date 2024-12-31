import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from "../components/LayoutComponent";
import Login from "../pages/login";
import Register from "../pages/register";

const RoutesPublic = () => (
    <Layout>
        <Routes>
            <Route path='' element={<Login />} />            
            <Route path='register' element={<Register />} />            
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    </Layout>
);


export default RoutesPublic;  