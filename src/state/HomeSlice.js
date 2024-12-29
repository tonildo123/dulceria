import { createSlice } from '@reduxjs/toolkit';

export const HomeSlice = createSlice({
name: 'homeuser',
initialState: {
  Home:   
    { 
      id:0,
      idUser:0,
      address: '', 
      number: null,
      photo : null,
      latitude:null,
      longitude: null
    },

},
reducers: {
    HomeSuccess: (state, action) => {
    let newHome = {
        id:action.payload.id,
        idUser:action.payload.idUser,
        address:action.payload.address,
        number:action.payload.number,
        photo:action.payload.photo,
        latitude:action.payload.latitude,
        longitude: action.payload.longitude,
    };
    
    state.Home = newHome
    
  },
  HomeFailure: (state, action) => {
    
    let newHome = {
      id:0,
      idUser:0,
      address: '', 
      number: null,
      photo : null,
      latitude:null,
      longitude: null
    };
    
    state.Home = newHome
  },
  HomeClean: (state, action) => {
    
    let newHome = {
        id:0,
        idUser:0,
        address: '', 
        number: null,
        photo : null,
        latitude:null,
        longitude: null
    };
    
    state.Home = newHome
  }
  },
})
// Action creators are generated for each case reducer function
export const { HomeSuccess, HomeFailure, HomeClean } = HomeSlice.actions
export default HomeSlice.reducer;
