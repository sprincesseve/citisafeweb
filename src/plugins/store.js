import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../pages/Login/authSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})