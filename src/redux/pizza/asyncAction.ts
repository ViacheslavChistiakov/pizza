import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, SearchPizzaParams } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus',
async (params) => {
 const {sortBy, order, category, search, currentPage} = params;
 const { data } = await axios.get<Pizza[]>(
   `http://localhost:3002/pizzas?_limit=4&_page=${currentPage}${category}&_sort=${sortBy}&_order=${order}&_search=${search}`
   )

 return data;

 }
)







