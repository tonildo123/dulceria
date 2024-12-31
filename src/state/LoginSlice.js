import { createSlice } from '@reduxjs/toolkit';

export const LoginSlice = createSlice({
name: 'logger',
initialState: {
  user:   
    { 
      id:0,
      email: null, 
      role: null,
      createdAt: null,
      logged : false
    },

},
reducers: {
  loggearme: (state, action) => {
    let newUser = {
      id:action.payload.id,
      email: action.payload.email, 
      role: action.payload.role,
      createdAt: action.payload.createdAt,
      logged : true
    };
    
    state.user = newUser
    
  },
  unlogger: (state, action) => {
    
    state.user =  { 
      id:0,
      email: null, 
      role: null,
      createdAt: null,
      logged : false
    }
  }
  },
})
// Action creators are generated for each case reducer function
export const { loggearme, unlogger } = LoginSlice.actions
export default LoginSlice.reducer;
