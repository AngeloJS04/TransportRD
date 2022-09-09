import { CardsI } from './../../types/card.type';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: { cards: CardsI[] } = {
    cards: [] as CardsI[]
};

export const cardSlice = createSlice({
    name: 'getCards',
    initialState,
    reducers: {
        setCards: (state: any, action: PayloadAction<CardsI[]>) => {
            state.cards = action.payload
        }
    }
})

export const { setCards } = cardSlice.actions;
export default cardSlice.reducer;