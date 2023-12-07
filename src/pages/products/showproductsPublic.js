/* eslint-disable */
import { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import { collection, getDocs, } from 'firebase/firestore';
import { db } from '../../firebase';
import WelcomeComponent from '../../components/welcomeComponent';
import { useSelector, useDispatch } from 'react-redux';
import { productArrayClean, productArraySuccess } from '../../state/ArrayProductSlice';
import useOffline from '../../hooks/useOffline';
import { useNavigate } from "react-router-dom";

const ShowproductsPublic = () => {

  const [products, setProducts] = useState([]);
  const productsCollection = collection(db, "Products");
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  const { CargarProductosOffline } = useOffline()
  const navigate = useNavigate();

  const getsProductos = async () => {

    if (state.userProductsArray.products.length > 0) {
      setProducts(state.userProductsArray.products)
    } else {
      const data = await getDocs(productsCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
  }

  useEffect(() => {
    getsProductos();
    if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        const product = {
          id: products[i].id,
          descripcion: products[i].descripcion,
          precio: products[i].precio,
          urlimagen: products[i].urlimagen,
          stock: products[i].stock,
        };

        const isProductAlreadyAdded = state.userProductsArray.products.some(
          (existingProduct) => existingProduct.id === product.id
        );

        if (!isProductAlreadyAdded) {          
          dispatch(productArraySuccess(product));         
        }
      }
    } else {
      dispatch(productArrayClean())
      CargarProductosOffline()
    }

  }, [products.length]);




  const renderCard = (card, index) => {
    return (
      <Grid item key={card.id} sx={{ width: { sx: '100%', sm: '200px', height: { sx: '200px', sm: '300px' } } }}>
        <Button onClick={() => navigate(`/detalles`, { state: { card } })}>
        <Card sx={{ my: '2px' }} >
          <CardMedia
            component="img"
            alt="Card Image"
            image={card.urlimagen}
            sx={{ width: '100%', height: { sx: '150px', sm: '250px' } }} />
          <CardContent>
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
              {card.descripcion.toUpperCase()}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', color: 'red' }}>$ {card.precio}</Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>{card.stock} unidades</Typography>
          </CardContent>
        </Card>
        </Button>
      </Grid>
    );
  };


  return (
    <Grid container sx={{ my: 1 }}>
      <Grid item xs={12} md={3} >
      </Grid>
      <Grid item xs={12} md={6} >
        {products.length === 0
          ? null
          : <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Typography variant="h5" sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
              Productos
            </Typography>
          </Box>}
        <Grid container sx={{ justifyContent: 'space-evenly' }}>
          {products.length === 0 ? <WelcomeComponent /> : products.map(renderCard)}
        </Grid>
      </Grid>
      <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      </Grid>
    </Grid>
  )
}



export default ShowproductsPublic