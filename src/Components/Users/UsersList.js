import React, { Component } from "react";
import { connect } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Axios from "axios";
import "./UsersList.css";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userOne: 0,
      userTwo: 1,
      userThree: 2
    };
  }

  componentDidMount = () => {
    const { user_id } = this.props.profile.user;
    Axios.get(`/api/get_all_users/${user_id}`).then(res => {
      this.setState({
        users: res.data
      });
    });
  };

  // pagenationUpHandler = (prop, value) => {
  //   if (value <= this.state.users.length) {
  //     this.setState({
  //       [prop]: value + 3
  //     });
  //   } else {
  //     this.setState({
  //       [prop]: value
  //     });
  //   }
  // };

  // pagenationDownHandler = (prop, value) => {
  //   if (value >= 0) {
  //     this.setState({
  //       [prop]: value - 3
  //     });
  //   } else {
  //     this.setState({
  //       [prop]: value
  //     });
  //   }
  // };

  render() {
    console.log(this.state);
    console.log(this.state.users.length);
    const mappedUsers = this.state.users.map(element => {
      return (
        <div>
          <div>
            <img className="usersPic" src={element.profile_pic} />
          </div>
          <div>
            <h1>{element.first_name}</h1>
          </div>
        </div>
      );
    });
    return (
      <div className="usersListBody">
        <div className="usersListMaincontainer">
          <div className="buttonContainer">
            <button>
              <FaArrowLeft
                onClick={() => {
                  if (this.state.userOne > 0) {
                    this.setState({
                      userOne: this.state.userOne - 3,
                      userTwo: this.state.userTwo - 3,
                      userThree: this.state.userThree - 3
                    });
                  } else {
                    return console.log("no more users");
                  }
                }}
              />
            </button>
          </div>
          <div className="usersContainer">
            <span> {mappedUsers[this.state.userOne]}</span>
            <span> {mappedUsers[this.state.userTwo]}</span>
            <span> {mappedUsers[this.state.userThree]}</span>
          </div>
          <div className="buttonContainer">
            <button>
              <FaArrowRight
                onClick={() => {
                  if (this.state.userOne < this.state.users.length - 1) {
                    this.setState({
                      userOne: this.state.userOne + 3,
                      userTwo: this.state.userTwo + 3,
                      userThree: this.state.userThree + 3
                    });
                  } else {
                    return console.log("no more users");
                  }
                }}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const invokedConnect = connect(mapStateToProps);
export default invokedConnect(UsersList);
