import {
    Warning as AlertIcon,
    CalendarToday as CalendarIcon,
    Phone as PhoneIcon
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

const ModalDescription = ({ item, onClose, isVisible }) => {
  if (!item) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const InfoRow = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {React.cloneElement(icon, { fontSize: 'small' })}
      <Typography variant="body1" sx={{ ml: 2, fontWeight: 'bold' }}>
        {label}:
      </Typography>
      <Typography variant="body1" sx={{ ml: 1 }}>
        {value}
      </Typography>
    </Box>
  );

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
        Detalles de Alerta
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
              icon={<PhoneIcon />}
              label="Teléfono"
              value={item?.data?.profile?.numberPhone || 'No disponible'}
            />            
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
                    <Avatar
                        src={item?.data?.home?.photo}
                        sx={{ width: 120, height: 120, mb: 2 }}
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