
const usePhone = () => {
  
  const sendWhatsApp = (phoneNumber) => {
    if (!phoneNumber) return;
    const encodedMessage = encodeURIComponent('Hola, me contacto desde Guardia Civil');
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return { sendWhatsApp };
};

export default usePhone;
