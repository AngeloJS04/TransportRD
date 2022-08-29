import { configureStore } from '@reduxjs/toolkit';
import meSlice from '../slices/me/me';
import SignInSlice from '../slices/Signed/Signed';

export const store = configureStore({
    reducer: {
        // reducer
        me: meSlice,
        signIn: SignInSlice
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;