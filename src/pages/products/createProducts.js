import React, { useState } from 'react';
import { TextField, Button, FormControl, Box, Input, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { db, uploadFile } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { productArraySuccess } from '../../state/ArrayProductSlice';
import { useDispatch } from 'react-redux';

const CreateProducts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [imagesName, setImagesName] = useState();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProductImage(file);

        if (file) {
            if (file.type.startsWith('image/')) {
                setProductImage(file);
                const fileName = file.name;
                setImagesName(fileName)

            } else {
                alert('El archivo seleccionado no es una imagen.');
            }
        } else {
            alert('No se ha seleccionado ningún archivo.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productStock || !productImage) {
            Swal.fire({
                title: 'Completas campos!',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/product/create');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate('/product/create');
                }
            });
            return;
        }

        const productCollection = collection(db, 'Products');

        try {
            const url = await uploadFile(productImage, imagesName, 'ProductsFolder');

            const docRef = await addDoc(productCollection, {
                urlimagen: url,
                descripcion: productName,
                precio: productPrice,
                stock: productStock
            });
            const product = {
                id: docRef.id,
                urlimagen: url,
                descripcion: productName,
                precio: productPrice,
                stock: productStock
            }

            dispatch(productArraySuccess(product))          

            Swal.fire({
                title: 'Producto guardado!',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {

                    navigate('/');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate('/');
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Ocurrió un error!',
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <Box sx={{ mx: { md: '30%' }, my: 5 }}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Cargar Producto
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre/Descripción"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                <TextField
                    label="Precio"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                />
                <TextField
                    label="Stock"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    required
                />
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Seleccionar imagen
                    </Typography>
                </Box>
                <FormControl fullWidth margin="normal">
                    <Input type="file" onChange={handleImageChange} />
                </FormControl>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <Button type="submit" variant="contained" color="primary">
                        Guardar
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default CreateProducts;
