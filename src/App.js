import React,{Fragment} from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "./App.css";
import "antd/dist/antd.css";
import { Home } from "./Component/Home/productsHome";
import { Cart } from "./Component/Cart/cart";


function App() {
  return (
<BrowserRouter>
    <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='cart' element={<Cart />}></Route>
        </Routes>    
    </div>
    </BrowserRouter>
  );
}

export default App;
