/* eslint-disable */
import { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { collection, getDocs, } from 'firebase/firestore';
import { db } from '../../firebase';
import WelcomeComponent from '../../components/welcomeComponent';
import { useSelector, useDispatch } from 'react-redux';
import { productArraySuccess } from '../../state/ArrayProductSlice';


const Home = () => {

  const [pets, setPets] = useState([]);
  const productsCollection = collection(db, "Products");
  const dispatch = useDispatch();
  const state = useSelector(state => state)

  const getPets = async () => {

    if (state.userProductsArray.products.length > 0) {
      setPets(state.userProductsArray.products)
    } else {
      const data = await getDocs(productsCollection);
      setPets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
  }

  useEffect(() => {
    getPets();
    console.log(state)
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
        }
      }
    }
  }, [pets.length]);




  const renderCard = (card, index) => {
    return (
      <Grid item key={card.id} sx={{width:{sx:'100%', sm:'200px', height:{sx:'200px', sm:'300px'}}}}>
        <Card sx={{my: '2px' }} >
          <CardMedia
            component="img"
            alt="Card Image"
            image={card.urlimagen}
            sx={{width:'100%', height:{sx:'150px', sm:'250px'}}} />
          <CardContent>
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
              {card.descripcion.toUpperCase()}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', color: 'red' }}>$ {card.precio}</Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>{card.stock} unidades</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };


  return (
    <Grid container sx={{ my: 1 }}>
      <Grid item xs={12} md={3} >
      </Grid>
      <Grid item xs={12} md={6} >
        <Grid container sx={{ justifyContent: 'space-evenly' }}>
          {pets.length === 0 ? <WelcomeComponent /> : pets.map(renderCard)}
        </Grid>
      </Grid>
      <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      </Grid>
    </Grid>
  )
}

export default Home