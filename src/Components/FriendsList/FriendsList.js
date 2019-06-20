import React, { Component } from "react";
import { connect } from "react-redux";
import { setFriendsList } from "../../Ducks/friendsListReducer";
import { TiMessages } from "react-icons/ti";
import Axios from "axios";

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { user_id } = this.props.profile.user;
    Axios.get(`/api/get_friends_list/${user_id}`).then(res => {
      this.props.setFriendsList(res.data);
    });
  };

  render() {
    console.log(this.props);
    const mappedFriendsList = this.props.friendsList.friendsList.map(
      element => {
        return (
          <div>
            <div>
              <img src={element.profile_pic} />
              <h1>
                {element.first_name} {element.last_name}
              </h1>
              <button>
                <TiMessages />
              </button>
            </div>
          </div>
        );
      }
    );
    return (
      <div>
        <div>
          <div>{mappedFriendsList}</div>
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
