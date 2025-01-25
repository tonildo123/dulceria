import {
  Warning as AlertIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';
import React from 'react';
import { mode } from '../Constant';
import usePhone from '../hooks/usePhone';
import { formatDate } from '../utils/datrHelper';
import { InfoRow } from './InfoRow';
import useNavigation from './useNavigation';

const ModalDescription = ({ item, onClose, isVisible, onShowRoute }) => {

  const buildMode = mode.MODE === 'MAPA' ? false : true;
    const { sendWhatsApp } = usePhone();
    const { openInGoogleMaps } = useNavigation();
  
    const handleNavigationClick = () => {
      // Mostrar la ruta en el mapa actual
      onShowRoute();
      
      // Abrir en Google Maps
      openInGoogleMaps(item.location);
    };

  return (
    <Dialog 
      open={isVisible} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ 
        bgcolor: 'error.main', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <AlertIcon fontSize="small" sx={{ mr: 1 }}/>
        {buildMode ? 'Alerta de emergencia' : 'Alerta de emergencia'}
        <CancelIcon fontSize="small" sx={{ mr: 1 }} 
        onClick={onClose}/>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mb: 1
            }}>
              <Avatar
                src={item?.data?.profile?.avatar}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h6">
                {`${item?.data?.profile?.name || ''} ${item?.data?.profile?.lastName || ''}`}
              </Typography>
            </Box>
            <InfoRow 
              icon={<PhoneIcon color='green'/>}
              label="Teléfono"
              value={item?.data?.profile?.numberPhone || 'No disponible'}
              onClick={() => sendWhatsApp(item?.data?.profile?.numberPhone)}
            />  
            {buildMode && <InfoRow 
              icon={<LocationIcon color='red'/>}
              label="¿Como llegar?"
              onClick={handleNavigationClick}
            />   }           
          </Grid>
          <Grid item xs={12} md={6}>
            
            <InfoRow 
              icon={<CalendarIcon />}
              label="Fecha y hora"
              value={formatDate(item?.createdAt)}
            />
            {item?.message && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                 Domicilio : {item?.data?.home?.address} - {item?.data?.home?.number}
                </Typography>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    mb: 1
                    }}>
                    <img
                    src={item?.data?.home?.photo}
                    alt="Imagen"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                    
                    </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDescription;