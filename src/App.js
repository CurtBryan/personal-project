import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import FrontPage from "./Components/FrontPage/FrontPage";
import { connect } from "react-redux";
import HomePage from "./Components/HomePage/HomePage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <Header />
        {!this.props.user ? <FrontPage /> : <HomePage />}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const invokedConnect = connect(mapStateToProps);

export default invokedConnect(App);
