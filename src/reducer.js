import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const itemToUpdate = { ...newCart.get(action.payload.id) };
    itemToUpdate.amount += 1;

    newCart.set(action.payload.id, itemToUpdate);
    return { ...state, cart: newCart };
  }
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const itemToUpdate = { ...newCart.get(action.payload.id) };
    itemToUpdate.amount -= 1;

    if (itemToUpdate.amount < 1) {
      const newCart = new Map(state.cart);
      newCart.delete(action.payload.id);
      return { ...state, cart: newCart };
    }

    newCart.set(action.payload.id, itemToUpdate);
    return { ...state, cart: newCart };
  }
  if (action.type === LOADING) {
    return { ...state, loading: true };
  }
  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(action.payload.cart.map((item) => [item.id, item]));
    return { ...state, cart: newCart, loading: false };
  }

  throw new Error(`no matching action type for : ${action.type}`);
};

export default reducer;
