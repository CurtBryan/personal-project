import React, { Component } from "react";
import { connect } from "react-redux";

class CurrentUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.profile.user);
    const { first_name, last_name, profile_pic } = this.props.profile.user;
    return (
      <div>
        <div>
          <img src={profile_pic} />
        </div>
        <div>
          <h1>
            {first_name} {last_name}
          </h1>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};
// const mapDispatchToProps = {
//   setUser
// };
const invokedConnect = connect(
  mapStateToProps
  // mapDispatchToProps
);
export default invokedConnect(CurrentUserProfile);
