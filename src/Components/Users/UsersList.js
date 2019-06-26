import React, { Component } from "react";
import { connect } from "react-redux";
import { setFriendsList } from "../../Ducks/friendsListReducer";
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
    Promise.all([
      Axios.get(`/api/get_all_users/${user_id}`),
      Axios.get(`/api/get_friends_list/${user_id}`)
    ]).then(([res1, res2]) => {
      this.setState({
        users: res1.data
      });
      this.props.setFriendsList(res2.data);
    });
  };
  addFriend = friend_id => {
    const { user_id } = this.props.profile.user;
    Axios.post(`/api/add_friend/${user_id}`, { friend_id }).then(res => {
      this.props.setFriendsList(res.data);
    });
  };

  render() {
    const mappedUsers = this.state.users.map(element => {
      return (
        <div className="userInfoFlex">
          <div>
            <img className="usersPic" src={element.profile_pic} />
          </div>
          <div>
            <h1>{element.first_name}</h1>
          </div>
          <button
            className="addFriendButton"
            onClick={() => this.addFriend(element.user_id)}
          >
            Add Friend
          </button>
        </div>
      );
    });
    return (
      <div className="usersListBody">
        <div className="usersListMaincontainer">
          <div className="buttonContainer">
            <button
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
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="usersContainer">
            <span className="userBox"> {mappedUsers[this.state.userOne]}</span>
            <span className="userBox"> {mappedUsers[this.state.userTwo]}</span>
            <span className="userBox">
              {" "}
              {mappedUsers[this.state.userThree]}
            </span>
          </div>
          <div className="buttonContainer">
            <button
              onClick={() => {
                if (this.state.userOne < this.state.users.length - 3) {
                  this.setState({
                    userOne: this.state.userOne + 3,
                    userTwo: this.state.userTwo + 3,
                    userThree: this.state.userThree + 3
                  });
                } else {
                  return console.log("no more users");
                }
              }}
            >
              <FaArrowRight />
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

const mapDispatchToProps = {
  setFriendsList
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(UsersList);
