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
    Axios.get(`/api/get_all_users/${user_id}`).then(res => {
      this.setState({
        users: res.data
      });
    });
  };

  addFriend = friend_id => {
    console.log(friend_id);
    const { user_id } = this.props.profile.user;
    Axios.post(`/api/add_friend/${user_id}`, { friend_id }).then(res => {
      this.props.setFriendsList(res.data);
    });
  };

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
          <button onClick={() => this.addFriend(element.user_id)}>
            Add to Friends List
          </button>
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

const mapDispatchToProps = {
  setFriendsList
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(UsersList);
