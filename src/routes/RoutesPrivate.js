import Home from "../pages/home";
import { Route, Routes, Navigate } from 'react-router-dom';
import Create from "../pages/pets/createPets";
import Profile from "../pages/profile";
import Nosotros from "../pages/nosostros";
import Layout from "../components/LayoutComponent";
import MisMascotas from "../pages/pets";
import EditPet from "../pages/pets/EditPet";
import Contacto from "../pages/contact";

const RoutesPrivate = () => (
    <Layout>
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/pets/create' element={<Create />} />
            <Route path='/pets/mis-mascotas' element={<MisMascotas />} />
            <Route path='/pets/mis-mascotas/edit' element={<EditPet />} />
            <Route path='/profile/edit' element={<Profile />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='/contacto' element={<Contacto />} />
            <Route path='*' element={<Navigate to='/home' replace />} />
        </Routes>
    </Layout>

);

export default RoutesPrivate;  