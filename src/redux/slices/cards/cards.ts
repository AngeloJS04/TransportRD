import { CardsI } from './../../types/card.type';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: { cards: CardsI[] } = { cards: [] as CardsI[] };

export const cardSlice = createSlice({
    name: 'getCards',
    initialState,
    reducers: {
        setCards: (state: any, action: PayloadAction<CardsI[]>) => { state.cards = action.payload },

        editCards: (state: any, action: PayloadAction<CardsI>) => {

            const { amount, id, status } = action.payload
            const foundCard = state.cards.find(((card: CardsI) => card?.id === id))

            foundCard.amount = amount;
            foundCard.status = status
        }
    }
})

export const { setCards, editCards } = cardSlice.actions;
export default cardSlice.reducer;