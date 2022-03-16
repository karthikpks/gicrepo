import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './modules/employee'

export const store = configureStore({
  reducer: {
      employee: employeeReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch