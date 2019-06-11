import React from "react";
import { MdMenu } from "react-icons/md";
import { connect } from "react-redux";
import { setUser } from "../../Ducks/profileReducer";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  logout = () => {
    axios.get("/api/logout").then(res => {
      this.props.setUser(null);
    });
  };
  render() {
    return (
      <div className="headerContainer">
        <header>
          <h1 className="headerName">YHH-PHX</h1>
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
        <div>
          {!this.state.showMenu ? (
            <nav className="headerLinks">
              <NavLink exact to="/">
                Home
              </NavLink>
              <NavLink to="/events_dir">Events</NavLink>
              <NavLink to="/current_user">Profile</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </nav>
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
