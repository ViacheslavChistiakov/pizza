import React from "react"; 
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router";
import Cart from "./pages/Cart";
import NotFoundBlock from "./components/NotFoundBlock";
import { decrement, increment, test } from './redux/slices/filterSlice';




//  export const AppContext = React.createContext("");








function App() {
  // const [searchValue, setSearchValue] = React.useState("");




  return (
    <div className="wrapper">
      <Header/> 
        <div className="content">
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
   </div>
  </div>
  );
}

export default App;
