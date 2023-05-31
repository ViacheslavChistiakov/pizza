import React from "react";
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store'
import axios from "axios";
import { selectFilter, setCategoryId, setCurrentPage, setFilters, FilterSliceState } from "../redux/slices/filterSlice";
import { useNavigate } from 'react-router-dom';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { list } from "../components/Sort";
import {  SearchPizzaParams, fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";





export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);


  const {items, status} =  useSelector(selectPizzaData);
  const { categoryId, searchValue, sortProperty , currentPage}  = useSelector(selectFilter);
  // const sortType = useSelector((state:any) => state.filter.sort.sortProperty);
  // const currentPage =  useSelector((state:any) => state.filter.currentPage);

    const onChooseCategory = (index: number) => {
      dispath(setCategoryId(index));
    };

    const onChangePage = (page: number) => {
      dispath(setCurrentPage(page))
    }

   const getPizzas = async () => {
    const sortBy = sortProperty.replace("-", "");
    const order = sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue;
    


      dispath(
        fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage:String(currentPage),
        sortProperty,
      })
      
    )
    

  window.scrollTo(0, 0);
}

  

// React.useEffect(() => {
//   if (window.location.search) {
//     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
//     const sort = list.find((obj) => obj.sortProperty === params.sortBy)
//     dispath(setFilters({
//       searchValue: params.search,
//       categoryId: Number(params.category),
//       currentPage: Number(params.currentPage),
//       sortProperty:params.sortProperty,
//       sort: sort || list[0],
//     }))
//   }
// }, [])




React.useEffect(() => {
    getPizzas();
}, [categoryId, sortProperty, searchValue, currentPage]);


// React.useEffect(() => {
//   if ( isMounted.current ) {
//     const queryString = qs.stringify({
//       sortType: sortProperty,
//       categoryId,
//       currentPage,
//     });
  
//     navigate(`?_${queryString}`);
//   }
//   isMounted.current = true;

//   if (!window.location.search) {
//     dispath(fetchPizzas({} as SearchPizzaParams))
//   }


// }, [categoryId, sortProperty, searchValue, currentPage])


const somefood = items.filter((obj: any) => {
  if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) { 
    return true;
  }

  return false;
}).map((obj: any) => <PizzaBlock  {...obj} />)

const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
    return (
        <>
        <div className="container">
          <div className="content__top">
        <Categories value={categoryId} onClickChoose={onChooseCategory} />
        <Sort />  
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
            <div className="content__error-info">
           <h2> Произошла ошибка 😕</h2>
        <p>
         К сожалению нам не удалось получить питсы. Попробуйте повторить попытку позже.
        </p>
          </div> 
          ) : (
            <div className="content__items">
            {status === 'loading' ? skeletons: somefood}</div>
          )
        }

       <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
        </>
      
    )
    
}
export default Home;