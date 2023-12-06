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

  const [pets, setPets] = useState([]);
  const [base64Image, setBase64Image] = useState(null);
  const productsCollection = collection(db, "Products");
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  const { CargarProductosOffline } = useOffline()
  const navigate = useNavigate();

  const getPets = async () => {

    if (state.userProductsArray.products.length > 0) {
      setPets(state.userProductsArray.products)
    } else {
      const data = await getDocs(productsCollection);
      setPets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
  }

  const convertImageToBase64 = async (image) => {
    const response = await fetch(image);
    const blob = await response.blob();

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      setBase64Image(base64data);
    };

    reader.readAsDataURL(blob);
  }

  useEffect(() => {
    getPets();
    if (pets.length > 0) {
      for (let i = 0; i < pets.length; i++) {
        const pet = {
          id: pets[i].id,
          descripcion: pets[i].descripcion,
          precio: pets[i].precio,
          urlimagen: pets[i].urlimagen,
          stock: pets[i].stock,
        };

        const isPetAlreadyAdded = state.userProductsArray.products.some(
          (existingPet) => existingPet.id === pet.id
        );

        if (!isPetAlreadyAdded) {
          
          dispatch(productArraySuccess(pet));

          // convertImageToBase64(pets[i].urlimagen);
          // const productsInLocalStorage = JSON.parse(localStorage.getItem('products')) || [];
          // productsInLocalStorage.push({
          //   id: pets[i].id,
          //   descripcion: pets[i].descripcion,
          //   precio: pets[i].precio,
          //   urlimagen: pets[i].urlimagen,
          //   stock: pets[i].stock,
          //   base64Image: base64Image
          // });

          // localStorage.setItem('products', JSON.stringify(productsInLocalStorage));
        }
      }
    } else {
      dispatch(productArrayClean())
      CargarProductosOffline()
    }

  }, [pets.length]);




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
        {pets.length === 0
          ? null
          : <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Typography variant="h5" sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
              Productos
            </Typography>
          </Box>}
        <Grid container sx={{ justifyContent: 'space-evenly' }}>
          {pets.length === 0 ? <WelcomeComponent /> : pets.map(renderCard)}
        </Grid>
      </Grid>
      <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      </Grid>
    </Grid>
  )
}



export default ShowproductsPublic