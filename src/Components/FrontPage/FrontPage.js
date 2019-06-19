import React, { Component } from "react";
import "./FrontPage.css";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../Ducks/profileReducer";

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      charity: false,
      profile_pic: "",
      login: true
    };
  }

  componentDidMount() {
    axios
      .get("/api/user")
      .then(res => {
        this.props.setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  universalHandler = (prop, value) => {
    this.setState({
      [prop]: value
    });
  };

  register = () => {
    const {
      first_name,
      last_name,
      password,
      email,
      charity,
      profile_pic
    } = this.state;
    axios
      .post("/api/register", {
        first_name,
        last_name,
        password,
        email,
        charity,
        profile_pic
      })
      .then(res => {
        this.props.setUser(res.data);
      });
  };

  login = () => {
    const { email, password } = this.state;
    axios
      .post("/api/login", { email, password })
      .then(res => {
        this.props.setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { first_name, last_name, password, email, profile_pic } = this.state;
    return (
      <div>
        {!this.state.login ? (
          <div className="frontPageBody">
            <div className="registerContainer">
              <h1>Your Helping Hands</h1>
              <input
                onChange={e =>
                  this.universalHandler(e.target.name, e.target.value)
                }
                name="first_name"
                value={first_name}
                placeholder="First Name or Charity Name"
              />
              {!this.state.charity ? (
                <input
                  onChange={e =>
                    this.universalHandler(e.target.name, e.target.value)
                  }
                  name="last_name"
                  value={last_name}
                  placeholder="Last Name(if charity, leave Blank)"
                />
              ) : null}

              <input
                type="password"
                onChange={e =>
                  this.universalHandler(e.target.name, e.target.value)
                }
                name="password"
                value={password}
                placeholder="Password"
              />
              <input
                onChange={e =>
                  this.universalHandler(e.target.name, e.target.value)
                }
                name="email"
                value={email}
                placeholder="Email"
              />
              <div className="checkBoxContainer">
                <p>Check box if you are making a charity account</p>
                <input
                  type="checkbox"
                  value={this.state.charity}
                  onChange={() => {
                    if (this.state.charity === false) {
                      this.setState({
                        charity: true,
                        last_name: "Charity"
                      });
                    } else {
                      this.setState({
                        charity: false,
                        last_name: ""
                      });
                    }
                  }}
                />
              </div>
              <input
                onChange={e =>
                  this.universalHandler(e.target.name, e.target.value)
                }
                name="profile_pic"
                value={profile_pic}
                placeholder="Profile Picture (URL)"
              />
              <div className="registerButtonContainer">
                <button onClick={this.register}>Register</button>
                <button
                  onClick={() => {
                    this.setState({
                      login: true
                    });
                  }}
                >
                  Already a User?
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="frontPageBody">
            <div className="loginContainer">
              <h1>Your Helping Hands</h1>
              <div className="loginInputsContainer">
                <input
                  placeholder="email"
                  onChange={e =>
                    this.universalHandler(e.target.name, e.target.value)
                  }
                  value={this.state.email}
                  name="email"
                />
                <input
                  type="password"
                  placeholder="password"
                  onChange={e =>
                    this.universalHandler(e.target.name, e.target.value)
                  }
                  value={this.state.password}
                  name="password"
                />
              </div>
              <div className="loginButtonContainer">
                <button onClick={this.login}>Login</button>
                <button
                  onClick={() => {
                    this.setState({
                      login: false
                    });
                  }}
                >
                  Not a User?
                </button>
              </div>
            </div>
          </div>
        )}
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
export default invokedConnect(FrontPage);
