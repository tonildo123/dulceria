import { createSlice } from '@reduxjs/toolkit'

export const ArrayProductSlice = createSlice({
name: 'userProductsArray',
initialState: {
  products: []
},
reducers: {
    productArraySuccess: (state, action) => {
        state.products.push({
          id: action.payload.id,
          descripcion: action.payload.descripcion,
          precio: action.payload.precio,
          stock: action.payload.stock,
          urlimagen: action.payload.urlimagen,
          status: true,
        });
      },
  productArrayFailure: (state, action) => {
    
    return state
  }, 
  productArrayClean: (state, action) => {
    
    state.products = [];
  },
  productArrayRemove: (state, action) => {
    const idToRemove = action.payload;
    state.products = state.products.filter((product) => product.id !== idToRemove);
  }
  },
})
// Action creators are generated for each case reducer function
export const { productArraySuccess, productArrayFailure, productArrayClean, productArrayRemove } = ArrayProductSlice.actions
export default ArrayProductSlice.reducer;
