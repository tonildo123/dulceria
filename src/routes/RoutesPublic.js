import Login from "../pages/login";
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from "../pages/register";
import ForgotPassword from "../pages/forgotpassword";
import TermsAndConditions from "../pages/terminos_y_condiciones";
import Layout from "../components/LayoutComponent";
import Nosotros from "../pages/nosostros";
import Contacto from "../pages/contact";

const RoutesPublic = () => (
    <Layout>
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='nosotros' element={<Nosotros />} />
            <Route path='contacto' element={<Contacto />} />
            <Route path='register' element={<Register />} />
            <Route path='forgotpassword' element={<ForgotPassword />} />
            <Route path='termsandconditions' element={<TermsAndConditions />} />
            <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
    </Layout>
);


export default RoutesPublic;  