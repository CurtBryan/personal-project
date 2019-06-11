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
          <div>
            <img className="eventDirPic" src={element.event_pic} />
          </div>
          <NavLink to={`/event_page/${element.event_id}`}>
            {element.event_name}
          </NavLink>
          <h2>{element.date}</h2>
          <h2>{element.info}</h2>
        </div>
      );
    });
    return (
      <div>
        <div>
          <div>{allEvents}</div>
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
