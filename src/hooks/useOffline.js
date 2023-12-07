import { useDispatch, useSelector } from 'react-redux';
import { productArraySuccess } from '../state/ArrayProductSlice';

const useOffline = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const CargarProductosOffline = async () => {

    try {
      console.log('entre al catch')
      const response = await fetch('/manifest.json');
      const manifest = await response.json();
      const manifestFilter = manifest.icons.filter(item => item.hasOwnProperty('descripcion'))
      console.log('manifest', JSON.stringify(manifestFilter, null, 5))

      for (let i = 0; i < manifestFilter.length; i++) {
        const product = {
          id: manifestFilter[i].id,
          descripcion: manifestFilter[i].descripcion,
          precio: manifestFilter[i].precio,
          urlimagen: manifestFilter[i].src,
          stock: manifestFilter[i].stock,
        };

        const isProductAlreadyAdded = state.userProductsArray.products.some(
          (existingProduct) => existingProduct.id === product.id || existingProduct.descripcion.toUpperCase() === product.descripcion.toUpperCase()
        );

        if (!isProductAlreadyAdded) {
          dispatch(productArraySuccess(product));
        }
      }
    } catch (error) {
      console.error('Error al cargar imágenes cacheadas:', error);
    }
  };

  return { CargarProductosOffline };
};

export default useOffline;
