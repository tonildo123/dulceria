/* eslint-disable */
import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'

import slider from '../../assets/slider.PNG';

import uno from '../../assets/chocolates.PNG';
import dos from '../../assets/chicles.PNG';
import tres from '../../assets/dulces.PNG';
import cuatro from '../../assets/galletas.PNG';
import cinco from '../../assets/gelatina.PNG';
import seis from '../../assets/paletas.PNG';

import unoCard from '../../assets/card1.PNG';
import dosCard from '../../assets/card2.PNG';
import tresCard from '../../assets/card3.PNG';
import cuatroCard from '../../assets/card4.PNG';
import cincoCard from '../../assets/card5.PNG';
import seisCard from '../../assets/card6.PNG';
import sieteCard from '../../assets/card7.PNG';
import ochoCard from '../../assets/card8.PNG';

import unoMiniCard from '../../assets/pagoseguro.PNG';
import dosMiniCard from '../../assets/facilidaddecompra.PNG';
import tresMiniCard from '../../assets/disponibilidad.PNG';
import cuatroMiniCard from '../../assets/ofertaexclusiva.PNG';
import cincoMiniCard from '../../assets/envioatodomexico.PNG';
import seisMiniCard from '../../assets/enviosgratis.PNG';
import sieteMiniCard from '../../assets/pagos2.PNG';
import ochoMiniCard from '../../assets/atencion.PNG';

const Inicio = () => {

  const alturaPortada = { xs: '250px', md: '400px' }

  return (
    <Box>
      <Box sx={{ width: '100%' }}>
        <img
          src={slider}
          alt="image"
          loading="lazy"
          width="100%"
          height={alturaPortada}
        />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Productos
          </Typography>
        </Box>
      </Box>
      <Box sx={{ my: 5 }}>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Categorias
          </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={{ xs: 2, md: 10 }} >
            <Grid item xs={12} md={2}>
              <img
                src={uno}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <img
                src={dos}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <img
                src={tres}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <img
                src={cuatro}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <img
                src={cinco}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={2}>
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

      <Box sx={{ mt: 5 }}>
        <Container>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={{ xs: 2, md: 10 }} >
              <Grid item xs={12} md={6}>
                <img
                  src={unoCard}
                  alt="image"
                  loading="lazy"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src={dosCard}
                  alt="image"
                  loading="lazy"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src={tresCard}
                  alt="image"
                  loading="lazy"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src={cuatroCard}
                  alt="image"
                  loading="lazy"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src={cincoCard}
                  alt="image"
                  loading="lazy"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src={seisCard}
                  alt="image"
                  loading="lazy"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src={sieteCard}
                  alt="image"
                  loading="lazy"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src={ochoCard}
                  alt="image"
                  loading="lazy"
                  width="100%"
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={{ xs: 2, md: 6 }} >
            <Grid item xs={12} md={3}>
              <img
                src={unoMiniCard}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <img
                src={dosMiniCard}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <img
                src={tresMiniCard}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <img
                src={cuatroMiniCard}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <img
                src={cincoMiniCard}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <img
                src={seisMiniCard}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <img
                src={sieteMiniCard}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <img
                src={ochoMiniCard}
                alt="image"
                loading="lazy"
                width="100%"
              />
            </Grid>
          </Grid>
        </Box>

      </Box>

    </Box>
  )
}

export default Inicio