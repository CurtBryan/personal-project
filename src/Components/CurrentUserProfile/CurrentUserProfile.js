import React, { Component } from "react";
import { connect } from "react-redux";
import { setFutureEvents, setEventsAttended } from "../../Ducks/eventsReducer";
import "./CurrentUserProfile.css";
import { MdCheckBox, MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Axios from "axios";

class CurrentUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
  }

  componentDidMount() {
    const { user_id } = this.props.profile.user;
    Promise.all([
      Axios.get(`/api/get_future_events/${user_id}`),
      Axios.get(`/api/get_events_attended/${user_id}`)
    ]).then(([res1, res2]) => {
      this.props.setFutureEvents(res1.data);
      this.props.setEventsAttended(res2.data);
    });
  }

  deleteEvent = future_events_id => {
    const { user_id } = this.props.profile.user;
    Axios.delete(
      `/api/remove_future_event/${future_events_id}?user_id=${user_id}`
    ).then(res => {
      console.log(res.data);
      this.props.setFutureEvents(res.data);
    });
  };

  completedEvent = (event_id, future_events_id) => {
    const { user_id } = this.props.profile.user;
    Promise.all([
      Axios.post("/api/add_event_attended", { user_id, event_id }),
      Axios.delete(`/api/remove_future_event/${future_events_id}`, { user_id })
    ]).then(([res1, res2]) => {
      this.props.setEventsAttended(res1.data);
      this.props.setFutureEvents(res2.data);
    });
  };

  render() {
    const { first_name, last_name, profile_pic } = this.props.profile.user;
    const mappedFutureEvents = this.props.events.future_events.map(element => {
      return (
        <div className="futureContainer">
          <div>
            <img className="profileEventPic" src={element.event_pic} />
          </div>
          <div className="profileEventInfo">
            <h1>{element.event_name}</h1>
            <h2>{element.date}</h2>
          </div>
          <div className="profilePageButtons">
            <button
              onClick={() =>
                this.completedEvent(element.event_id, element.future_events_id)
              }
            >
              <MdCheckBox />
            </button>
            <button onClick={() => this.deleteEvent(element.future_events_id)}>
              <MdDelete />
            </button>
          </div>
        </div>
      );
    });
    const mappedEventsAttended = this.props.events.events_attended.map(
      element => {
        return (
          <div className="pastContainer">
            <div>
              <img className="profileEventPic" src={element.event_pic} />
            </div>
            <div className="profileEventInfo">
              <h1>{element.event_name}</h1>
              <h2>{element.date}</h2>
            </div>
          </div>
        );
      }
    );
    return (
      <div className="profileMainBody">
        <div className="profileContainer">
          <div className="userMainInfo">
            <div className="profilePicContainer">
              <img className="profilePic" src={profile_pic} />
            </div>
            <div className="userInfoForPage">
              <h1 className="username">
                {!this.props.profile.user.charity
                  ? first_name + " " + last_name
                  : first_name}
              </h1>
              <NavLink to="/friendslist">
                <div className="FriendsListLink">See Friends List</div>
              </NavLink>
            </div>
          </div>
          <br />
          <div className="futureEventsMainContainer">
            <h1>Future Events</h1>
            <span>{mappedFutureEvents}</span>
          </div>
          <br />
          <div className="eventsCompletedMainContainer">
            <h1>Events Attended</h1>
            <span>{mappedEventsAttended}</span>
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
  setFutureEvents,
  setEventsAttended
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(CurrentUserProfile);
