import { configureStore } from '@reduxjs/toolkit'
import HomeSlice from './HomeSlice'
import LoginSlice from './LoginSlice'
import ProfileSlice from './Profileslice'

export const store = configureStore({
  reducer: {
    logger: LoginSlice,
    profileuser: ProfileSlice,
    homestate: HomeSlice
  },
})