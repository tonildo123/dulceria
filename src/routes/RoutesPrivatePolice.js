import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from "../components/LayoutComponent";
import Police from '../pages/Police';

const RoutesPrivatePolice = () => (
    <Layout>
        <Routes>
            <Route path='/' element={<Police />} />          
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    </Layout>

);

export default RoutesPrivatePolice;  