import React from "react";
import { MdMenu } from "react-icons/md";
import { connect } from "react-redux";
import { setUser } from "../../Ducks/profileReducer";
import axios from "axios";
import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logout = () => {
    axios.get("/api/logout").then(res => {
      this.props.setUser(null);
    });
  };
  render() {
    return (
      <header className="headerContainer">
        <h1 className="headerName">YHH-PHX</h1>
        {!this.props.user ? null : (
          <div className="welcomeContainer">
            <p className="welcomeHeader">
              Welcome {this.props.user.first_name}!
            </p>
            <button className="logoutButton" onClick={this.logout}>
              Logout
            </button>
          </div>
        )}
        <button className="menuButton">
          Menu <MdMenu />
        </button>
      </header>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};
const mapDispatchToProps = {
  setUser
};
const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Header);
