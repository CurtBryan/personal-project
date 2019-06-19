import React from "react";
import { MdMenu } from "react-icons/md";
import { connect } from "react-redux";
import { setUser } from "../../Ducks/profileReducer";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Header.css";
import Logo from "../../logo_transparent.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true
    };
  }

  hideMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  logout = () => {
    axios.get("/api/logout").then(res => {
      this.props.setUser(null);
    });
  };
  render() {
    return (
      <div>
        <div className="headerContainer">
          <header className="titleMB">
            <div className="logoDiv">
              <img className="logo" src={Logo} />
            </div>
            {!this.props.profile.user ? null : (
              <div className="welcomeContainer">
                <p className="welcomeHeader">
                  Welcome {this.props.profile.user.first_name}!
                </p>
                <button className="logoutButton" onClick={this.logout}>
                  Logout
                </button>
              </div>
            )}
            <button
              onClick={() => {
                this.setState({
                  showMenu: !this.state.showMenu
                });
              }}
              className="menuButton"
            >
              Menu <MdMenu />
            </button>
          </header>
        </div>
        <div>
          {!this.state.showMenu ? (
            <div className="headerLinks">
              <NavLink
                exact
                to="/"
                style={{ color: "white" }}
                activeStyle={{
                  color: "#28cc9e",
                  fontWeight: "bolder",
                  fontSize: "20px",
                  textDecoration: "none"
                }}
              >
                <div onClick={this.hideMenu}>Home</div>
              </NavLink>

              <NavLink
                style={{ color: "white" }}
                activeStyle={{
                  color: "#28cc9e",
                  fontWeight: "bolder",
                  fontSize: "20px",
                  textDecoration: "none"
                }}
                to="/events_dir"
              >
                <div onClick={this.hideMenu}>Events</div>
              </NavLink>
              <NavLink
                style={{ color: "white" }}
                activeStyle={{
                  color: "#28cc9e",
                  fontWeight: "bolder",
                  fontSize: "20px",
                  textDecoration: "none"
                }}
                to="/current_user"
              >
                <div onClick={this.hideMenu}>Profile</div>
              </NavLink>

              <NavLink
                style={{ color: "white" }}
                activeStyle={{
                  color: "#28cc9e",
                  fontWeight: "bolder",
                  fontSize: "20px",
                  textDecoration: "none"
                }}
                to="/contact"
              >
                {" "}
                <div onClick={this.hideMenu}>Contact</div>
              </NavLink>
            </div>
          ) : null}
        </div>
      </div>
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
