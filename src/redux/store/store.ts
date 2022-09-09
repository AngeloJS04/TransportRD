import { configureStore } from '@reduxjs/toolkit';
import cardSlice from '../slices/cards/cards';
import meSlice from '../slices/me/me';
import SignInSlice from '../slices/Signed/Signed';

export const store = configureStore({
    reducer: {
        // reducer
        me: meSlice,
        signIn: SignInSlice,
        cards: cardSlice
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;