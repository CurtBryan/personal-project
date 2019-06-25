import React, { Component } from "react";
import { connect } from "react-redux";
import { setFriendsList } from "../../Ducks/friendsListReducer";
import { TiMessages } from "react-icons/ti";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./FriendsList.css";
import Axios from "axios";

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userOne: 0,
      userTwo: 1,
      userThree: 2
    };
  }

  componentDidMount = () => {
    const { user_id } = this.props.profile.user;
    Axios.get(`/api/get_friends_list/${user_id}`).then(res => {
      this.props.setFriendsList(res.data);
    });
  };

  deleteFriend = friend_id => {
    const { user_id } = this.props.profile.user;
    Axios.delete(`/api/delete_friend/${user_id}?friend_id=${friend_id}`).then(
      res => {
        this.props.setFriendsList(res.data);
      }
    );
  };

  render() {
    const { userOne, userTwo, userThree } = this.state;
    const mappedFriendsList = this.props.friendsList.friendsList.map(
      element => {
        return (
          <div className="friendCont">
            <div className="friendInfo">
              <img src={element.profile_pic} />
              <h1>
                {element.first_name} {element.last_name}
              </h1>
              <button onClick={() => this.deleteFriend(element.friend_id)}>
                Delete From Friends List
              </button>
            </div>
          </div>
        );
      }
    );
    return (
      <div className="friendsListBody">
        <div className="friendsListCont">
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
          <div className="friendsCont">
            <div>{mappedFriendsList[userOne]}</div>
            <div>{mappedFriendsList[userTwo]}</div>
            <div>{mappedFriendsList[userThree]}</div>
          </div>
          <div className="buttonContainer">
            <button
              onClick={() => {
                if (
                  this.state.userOne <
                  this.props.friendsList.friendsList.length - 3
                ) {
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
export default invokedConnect(FriendsList);
