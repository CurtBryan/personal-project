import React, { Component } from "react";
import Comments from "../Comments/Comments";
import "./EventPage.css";
import axios from "axios";
import { connect } from "react-redux";
import { setFutureEvents } from "../../Ducks/eventsReducer";

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      event_id: this.props.match.params.id
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/get_event_for_page/${this.state.event_id}`).then(res => {
      this.setState({
        event: res.data[0]
      });
    });
  }

  addEvent = () => {
    const { user_id } = this.props.profile.user;
    const { event_id } = this.state;
    console.log(user_id, event_id);
    axios.post(`/api/add_future_event`, { user_id, event_id }).then(res => {
      console.log(res.data);
      this.props.setFutureEvents(res.data);
    });
  };

  render() {
    const {
      event_name,
      event_pic,
      first_name,
      info,
      location,
      time,
      date
    } = this.state.event;
    return (
      <div className="eventPageBody">
        <div className="eventPageMainContainer">
          <div className="eventPageContainer">
            <div className="eventPageImg">
              <img src={event_pic} />
            </div>
            <div className="eventPageInfoContainer">
              <h1>{event_name}</h1>
              <h2>Hosted By: {first_name}</h2>
              <h3>Location: {location}</h3>
              <h3>Date: {date}</h3>
              <h3>Time: {time}</h3>
              <p>Details: {info}</p>
              <button onClick={() => this.addEvent()}>
                Add To My Future Events
              </button>
            </div>
          </div>
          <br />
          <div className="eventPageCommentContainer">
            <Comments event_id={this.state.event_id} />
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
  setFutureEvents
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(EventPage);
