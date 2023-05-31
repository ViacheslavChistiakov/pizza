import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartItem } from './cartSlice';
import { Sort } from './filterSlice';



type Pizza = {
  id: number, 
  title: string, 
  price: number, 
  image: string, 
  sizes: number[], 
  types: number[], 
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}


interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}


const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

type FetchPizzasArgs = {
  sort: string;
  order: string;
  category: string;
  search: string;
  currentPage:string;
  sortType:string;
  sortBy:string;
}

export type SearchPizzaParams = {
   sortBy:string,
   order:string, 
   category:string, 
   search:string, 
   currentPage:string, 
   sortProperty:string
}

 export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus',
 async (params) => {
  const {sortBy, order, category, search, currentPage, sortProperty } = params;
  const { data } = await axios.get<Pizza[]>(
    `http://localhost:3002/pizzas?_limit=4&_page=${currentPage}${category}&_sort=${sortProperty}&_order=${order}&_search=${search}`
    )

  return data;

  }
)

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
        state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status =  Status.LOADING;
      state.items = [];
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status =  Status.SUCCESS
    })

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status =  Status.ERROR;
      state.items = [];
    })

  }
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success'
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const selectPizzaData = (state:RootState) => state.pizza;

export  const { setItems  } = pizzaSlice.actions;

export default pizzaSlice.reducer;