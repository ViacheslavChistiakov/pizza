import React from "react";
import { Link, useLocation } from "react-router-dom"
import logoSvg from "../assets/img/pizza-logo.svg"
import Search from "./Search";
import { useSelector } from "react-redux";
import { selectCart } from "../redux/cart/selectors";


export const Header:React.FC = () =>{
  const {items, totalPrice} = useSelector(selectCart);
  const location = useLocation();
  const isMounted = React.useRef(false);



  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  React.useEffect(() => {
    if (isMounted.current){
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json)
    }
    isMounted.current = true;
  }, [items])

    return (
      <div className="header">
      <div className="container">
      <Link to="/">
      <div className="header__logo">
          <img width="38" src={logoSvg} alt="Pizza logo" />
          <div>
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </div>
      </Link>
      {location.pathname !== '/cart' && <Search />}
      <div className="header__cart">
      {location.pathname !== '/cart' && (
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice}₽</span>
            <div className="button__delimiter"></div>
            <span>{totalCount}</span>
          </Link>
          )}
        </div>
      </div>
    </div>
    ) 
  }

