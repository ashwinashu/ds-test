export default (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
      case "SET_CART_COUNT":
        return {
          ...state,
        cartCount: action.payload,
        };
        case "SET_CART_DATA":
          return {
            ...state,
          cartData: action.payload,
          };
    default:
      return state;
  }
};
