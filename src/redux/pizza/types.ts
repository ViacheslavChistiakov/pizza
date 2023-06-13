
export type Pizza = {
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
  
  
  export interface PizzaSliceState {
    items: Pizza[];
    status: Status;
  }

  export type FetchPizzasArgs = {
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
  }


  