import React from "react";
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { useNavigate } from 'react-router-dom';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { AppContext } from "../App";
import { list } from "../components/Sort";
import {  fetchPizzas } from "../redux/slices/pizzaSlice";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router";


export const Home = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // const { categoryId, sort, currentPage } = useSelector(selectFilter);
  // const { categoryId, sort, currentPage } = useSelector(selectFilter);
  const {items, status} =  useSelector((state) => state.pizza);


  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage =  useSelector((state) => state.filter.currentPage);



 
    const { searchValue } = React.useContext(AppContext)


    const onChooseCategory = (index) => {
      dispath(setCategoryId(index));
    };


    const onChangePage = number => {
      dispath(setCurrentPage(number))
    }

   const getPizzas = async () => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue > 0 ? `search=${searchValue}` : "";
    


      dispath(
        fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
        sortType,
      })
      
    )
    

  window.scrollTo(0, 0);
}

  

React.useEffect(() => {
  if (window.location.search) {
    const params = qs.parse(window.location.search.substring(1));

    const sort = list.find((obj) => obj.sortType === params.sortType)

    dispath(
      setFilters({
        ...params,
        sort,
      })
    );
    isSearch.current = true;
  }
}, [])

React.useEffect(() => {
    getPizzas();
}, [categoryId, sortType, searchValue, currentPage]);

React.useEffect(() => {
  if ( isMounted.current ) {
    const queryString = qs.stringify({
      sortType: sortType,
      categoryId,
      currentPage,
    });
  
    navigate(`?_${queryString}`);
  }
  isMounted.current = true;
}, [categoryId, sortType, searchValue, currentPage])


// const somefood = items.map((obj) => (
//   <Link key={obj.id} to={`/pizza/${obj.id}`}>
//     <PizzaBlock {...obj} />
//   </Link>
// ));

const somefood = items.filter((obj) => {
  if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    return true;
  }

  return false;
}).map((obj) => <PizzaBlock key={obj.id} {...obj}/>)

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