
import {  useDispatch,useSelector } from 'react-redux';
import { productArraySuccess } from '../state/ArrayProductSlice';

const useOffline = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const productsInLocalStorage = JSON.parse(localStorage.getItem('products')) || [];   
    

    const CargarProductosOffline = async()=>{
        

        if (productsInLocalStorage.length > 0) {
            for (let i = 0; i < productsInLocalStorage.length; i++) {
              const pet = {
                id: productsInLocalStorage[i].id,
                descripcion: productsInLocalStorage[i].descripcion,
                precio: productsInLocalStorage[i].precio,
                urlimagen: productsInLocalStorage[i].base64Image,
                stock: productsInLocalStorage[i].stock,
              };
      
              const isPetAlreadyAdded = state.userProductsArray.products.some(
                (existingPet) => existingPet.id === pet.id
              );
      
              if (!isPetAlreadyAdded) {
                dispatch(productArraySuccess(pet));
              }
            }
          }

    }
  return {CargarProductosOffline}
}

export default useOffline