import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

 export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',async (params, thunkApi) => {
  const {sortBy, order, category, search, currentPage, sortType } = params;
  const { data } = await axios.get(`http://localhost:3002/pizzas?_limit=4&_page=${currentPage}${category}&_sort=${sortType}&_order=${order}&_search=${search}`)

    if (data.length === 0){
      return thunkApi.rejectWithValue('Пиццы пустые')
    }


    return thunkApi.fulfillWithValue(data)
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
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success'
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;

export  const { setItems  } = pizzaSlice.actions;

export default pizzaSlice.reducer;