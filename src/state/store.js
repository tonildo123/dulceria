import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from './LoginSlice'
import ProfileSlice from './Profileslice'
import PetSlice from './PetSlice'
import ArrayPetSlice from './ArrayPetSlice'
import ArrayProductSlice from './ArrayProductSlice'


export const store = configureStore({
  reducer: {
    logger: LoginSlice,
    profileuser: ProfileSlice,
    petuser: PetSlice,
    userPetsArray: ArrayPetSlice,   
    userProductsArray: ArrayProductSlice, 
  },
})