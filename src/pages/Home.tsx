import React from "react";
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store'
import { setCategoryId, setCurrentPage, setFilters } from "../redux/filter/slice";
import { useNavigate } from 'react-router-dom';
import { PizzaBlock, Skeleton, Categories, Sort, Pagination } from "../components";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/asyncAction";






export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);


  import("../utils/math").then(math => {
    console.log(math.add(555, 345));
  });

  const {items, status} =  useSelector(selectPizzaData);
  const { categoryId, searchValue, sort, currentPage}  = useSelector(selectFilter);
  // const sortType = useSelector((state:any) => state.filter.sort.sortProperty);
  // const currentPage =  useSelector((state:any) => state.filter.currentPage);

    const onChooseCategory = React.useCallback((index: number) => {
      dispath(setCategoryId(index));
    }, [])

    const onChangePage = (page: number) => {
      dispath(setCurrentPage(page))
    }

   const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue;
    


      dispath(
        fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage:String(currentPage),
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
}, [categoryId, sort.sortProperty, searchValue, currentPage]);


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
}).map((obj: any) => <PizzaBlock key={obj.id}  {...obj} />)

const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <>
        <div className="container">
          <div className="content__top">
        <Categories value={categoryId} onClickChoose={onChooseCategory} />
        <Sort value={sort} />  
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