import Home from "../pages/home";
import { Route, Routes, Navigate } from 'react-router-dom';
import Create from "../pages/pets/createPets";
import Profile from "../pages/profile";
import Nosotros from "../pages/nosostros";
import Layout from "../components/LayoutComponent";
import MisMascotas from "../pages/pets";
import EditPet from "../pages/pets/EditPet";
import Contacto from "../pages/contact";
import Inicio from "../pages/inicio/inicio";
import CreateProducts from "../pages/products/createProducts";
import ShowProducts from "../pages/products/showProducts";
import EditProducts from "../pages/products/EditProducts";
import Details from "../pages/Details/Details";

const RoutesPrivate = () => (
    <Layout>
        <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/home' element={<Home />} />
            <Route path='/pets/create' element={<Create />} />
            <Route path='/pets/mis-mascotas' element={<MisMascotas />} />
            <Route path='/pets/mis-mascotas/edit' element={<EditPet />} />
            <Route path='/product/create' element={<CreateProducts />} />
            <Route path='/product/show/admin' element={<ShowProducts />} />
            <Route path='/product/edit' element={<EditProducts />} />
            <Route path='/profile/edit' element={<Profile />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='/contacto' element={<Contacto />} />
            <Route path='/detalles' element={<Details />} />
            <Route path='*' element={<Navigate to='/home' replace />} />
        </Routes>
    </Layout>

);

export default RoutesPrivate;  