import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MeI, ReduxMe } from "../../types/me.type";

export const initialState: any = {
    me: {
        email: '',
        uid: ''

    }

}

export const meSlice = createSlice({
    name: 'getMe',
    initialState: initialState,
    reducers: {
        setMe: (state: any, action: PayloadAction<any>) => {
            state.me = action.payload
            state.haveData = true
        },
        handlerClearMe: () => initialState
    }
})

export const { setMe, handlerClearMe } = meSlice.actions;
export default meSlice.reducer;