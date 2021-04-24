import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./Auth/reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
