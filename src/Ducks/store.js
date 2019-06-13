import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import profileReducer from "./profileReducer";
import eventsReducer from "./eventsReducer";
import commentsReducer from "./commentsReducer";

const rootReducer = combineReducers({
  profile: profileReducer,
  events: eventsReducer,
  comments: commentsReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
