import React, { Children } from "react"; 
import "./scss/app.scss";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Outlet, Route, Routes } from "react-router";
import Cart from "./pages/Cart";
import NotFoundBlock from "./components/NotFoundBlock";
import { decrement, increment, test } from './redux/slices/filterSlice';
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";


function App() {
  return (
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route path="" element={<Home />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="pizza/:id" element={<FullPizza />} />
                  <Route path="*" element={<NotFound />} />
                  </Route>
              </Routes>
  );
}

export default App;
