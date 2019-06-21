import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Ducks/store";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";
const config = {
  apiKey: "AIzaSyCAYXVRKge-TCOkcIi5Roe_ADd9jwNn694",
  authDomain: "yhh-phx.firebaseapp.com",
  databaseURL: "https://yhh-phx.firebaseio.com",
  projectId: "yhh-phx",
  storageBucket: "",
  messagingSenderId: "757751039585",
  appId: "1:757751039585:web:7a0e0fa468371ccf"
};
firebase.initializeApp(config);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
