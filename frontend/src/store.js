import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newCategoryReducer
} from "./reducers/categoryReducer";
import {
  newProductReducer,
  productsReducer,
  productReducer
} from "./reducers/productReducer";

import {
  userReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  allCategoryList: newCategoryReducer,
  newProduct: newProductReducer,
  products: productsReducer,
  product: productReducer,
  user: userReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
