import React, { Component } from "react";
import { connect } from "react-redux";
import { setFutureEvents, setEventsAttended } from "../../Ducks/eventsReducer";
import Axios from "axios";

class CurrentUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    const { first_name, last_name, profile_pic } = this.props.profile.user;
    const mappedFutureEvents = this.props.events.future_events.map(element => {
      return (
        <div className="futureContainer">
          <div>
            <img src={element.event_pic} />
          </div>
          <div>
            <h1>{element.event_name}</h1>
            <h2>{element.date}</h2>
          </div>
        </div>
      );
    });
    const mappedEventsAttended = this.props.events.events_attended.map(
      element => {
        return (
          <div className="pastContainer">
            <div>
              <img src={element.event_pic} />
            </div>
            <div>
              <h1>{element.event_name}</h1>
              <h2>{element.date}</h2>
            </div>
          </div>
        );
      }
    );
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
        <br />
        <div>
          <h1>Future Events</h1>
          <span>{mappedFutureEvents}</span>
        </div>
        <br />
        <div>
          <h1>Events Attended</h1>
          <span>{mappedEventsAttended}</span>
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
