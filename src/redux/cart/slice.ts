import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartSliceState } from './types';
import { getCartFromLs } from '../../utils/getCartFromLs';
import { CartItem } from './types';
import { calcTotalPrice } from '../../utils/calcTotalPrice';





const initialState: CartSliceState = getCartFromLs();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action:PayloadAction<CartItem>){
        const findItem = state.items.find(obj => obj.id === action.payload.id);

        if (findItem) {
            findItem.count++;
        } else {
            state.items.push({
                ...action.payload,
                count: 1
            }); 
        }

        state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action){
        const findItem = state.items.find(obj => obj.id === action.payload);

        if (findItem) {
            findItem.count--;
        }
    },
    removeItem(state, action) {
       state.items = state.items.filter(obj => obj.id !== action.payload);
    },
    clearItem(state) {
        state.items = [];
        state.totalPrice = 0;
    },
  },
});




export  const { addItem, removeItem, minusItem, clearItem,   } = cartSlice.actions;

export default cartSlice.reducer;