import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import profileReducer from "./profileReducer";
import eventsReducer from "./eventsReducer";

const rootReducer = combineReducers({
  profile: profileReducer,
  events: eventsReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
