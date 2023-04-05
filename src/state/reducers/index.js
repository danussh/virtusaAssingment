import isCartOpenReducer from './isCartOpen'
import productsReducer from './products'
import cartReducer from './cart'
import addressReducer from './checkOut'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  isCartOpen: isCartOpenReducer,
  products: productsReducer,
  cart: cartReducer,
  address:addressReducer,
})

export default rootReducer