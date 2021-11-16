import React, { createContext, useReducer } from "react";
import AppReducer from "./reducer"

const initialState = {
    products : [],
    cartCount : 0,
    cartData : []
  
}


export const GlobalContext = createContext(initialState);


export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    function setProducts(data) {
        dispatch({
          type: "SET_PRODUCTS",
          payload: data,
        });
      }


    function setCartCount(data) {
        dispatch({
          type: "SET_CART_COUNT",
          payload: data,
        });
      }


    function setCartData(data) {
        dispatch({
          type: "SET_CART_DATA",
          payload: data,
        });
      }
    
    
    return (
        <GlobalContext.Provider
        value={{ 
            products:state.products,
            cartCount : state.cartCount,
            cartData : state.cartData,
            setProducts,
            setCartCount,
            setCartData

        }}
        >
        {children}
        </GlobalContext.Provider>
    )
}