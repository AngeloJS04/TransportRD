import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SignI { SignIn: boolean }

export const initialState: SignI = { SignIn: false }

export const SignInSlice = createSlice({
    name: 'getSignIn',
    initialState: false,
    reducers: {
        setSignIn: (state: any, action: PayloadAction<any>) => { return state.SignIn = action.payload }
        // {
        //     return state.SignIn = action.payload

        // },

    }
})

export const { setSignIn } = SignInSlice.actions;
export default SignInSlice.reducer;