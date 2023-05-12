import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

 export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',async (params) => {
  const {sortBy, order, category, search, currentPage, sortType } = params;
  const { data } = await axios.get(`http://localhost:3002/pizzas?_limit=4&_page=${currentPage}${category}&_sort=${sortType}&_order=${order}&{search}`)
    return data
  }
)


const initialState = {
    items: [],
    status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      console.log(fetchPizzas.pending.toString());
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      console.log(fetchPizzas.fulfilled.toString());
      state.items = action.payload;
      state.status = 'success'
    },
    [fetchPizzas.rejected]: (state, action) => {
      console.log(fetchPizzas.rejected.toString());
      state.status = 'error';
      state.items = [];
    },
  },
});

export  const { setItems  } = pizzaSlice.actions;

export default pizzaSlice.reducer;