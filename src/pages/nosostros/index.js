/* eslint-disable */
import React from 'react'
import { Box, Typography, Grid } from '@mui/material';
import nosotrosImage from '../../assets/nosotros.PNG';
import candyImage from '../../assets/candy.PNG';
import uno from '../../assets/clientes1.PNG';
import dos from '../../assets/equipo2.PNG';
import tres from '../../assets/provee3.PNG';
import cuatro from '../../assets/space4.PNG';
import cinco from '../../assets/cole5.PNG';
import seis from '../../assets/compartir6.PNG';

const Nosotros = () => {
  const alturaPortada = { xs: '250px', md: '400px' }
  return (
    <Box>

      <Box sx={{ width: '100%' }}>
        <img
          src={nosotrosImage}
          alt="image"
          loading="lazy"
          width="100%"
          height={alturaPortada}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', marginY: '2%' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Sobre nosotros
        </Typography>
        <Typography variant="subtitle2" gutterBottom sx={{ paddingX: { xs: 2, md: 20 } }}>
          Ser la empresa lider de comercializacion de dulces y confiteria en toda la Republica Mexicana,
          a trevez de un servicio de calidad, surtido y precio;
          generando valor a nuestros clientes y a todos los que forman parte de esta organizacion
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%', justifyContent: 'space-evenly' }}>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent:'center' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Visión
          </Typography>
          <Typography variant="subtitle2" gutterBottom sx={{ paddingX: { xs: 2, md: 20 } }}>
            Ser la empresa lider en comercializacion de dulces y confiteria de toda la Republica Mexicana,
            a trevez de un servicio de calidad, surtido y precio;
            generando valor a nuestros clientes y a todos los que forman parte de esta organizacion
          </Typography>
        </Box>

        <Box sx={{ width: '100%', paddingX: { xs: 2, md: 20 } }}>
          <img
            src={candyImage}
            alt="image"
            loading="lazy"
            width="100%"
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Nuestros valores
        </Typography>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Grid  container spacing={{ xs: 2, md: 10 }} >
          <Grid item xs={12} md={4}>
            <img
              src={uno}
              alt="image"
              loading="lazy"
              width="100%"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <img
              src={dos}
              alt="image"
              loading="lazy"
              width="100%"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <img
              src={tres}
              alt="image"
              loading="lazy"
              width="100%"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <img
              src={cuatro}
              alt="image"
              loading="lazy"
              width="100%"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <img
              src={cinco}
              alt="image"
              loading="lazy"
              width="100%"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <img
              src={seis}
              alt="image"
              loading="lazy"
              width="100%"
            />
          </Grid>
        </Grid>
      </Box>

    </Box>
  )
}

export default Nosotros