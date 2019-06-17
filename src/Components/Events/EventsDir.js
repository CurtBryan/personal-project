import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setEvents } from "../../Ducks/eventsReducer";
import { NavLink } from "react-router-dom";
import "./EventsDir.css";

class EventsDir extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.get("/api/get_events").then(res => {
      this.props.setEvents(res.data);
    });
  }

  render() {
    const allEvents = this.props.events.events.map(element => {
      return (
        <div className="eventDirContainer">
          <div className="eventDirPicBox">
            <img className="eventDirPic" src={element.event_pic} />
          </div>
          <div className="eventDirTitle">
            <NavLink to={`/event_page/${element.event_id}`}>
              {element.event_name}
            </NavLink>
          </div>
          <div className="eventDirDate">
            <h2>Date: {element.date}</h2>
          </div>
          <div className="eventDirInfo">
            <h2>{element.info}</h2>
          </div>
        </div>
      );
    });
    return (
      <div className="eventsDirBody">
        <div className="divEventDirContainer">
          <div className="addEventBox">
            <div className="addEventButton">
              <NavLink to="/add_event">Add Event Here!</NavLink>
            </div>
          </div>
          <div className="eventContainer">{allEvents}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setEvents
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(EventsDir);
