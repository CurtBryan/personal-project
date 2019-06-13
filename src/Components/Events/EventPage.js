import React, { Component } from "react";
import Comments from "../Comments/Comments";
import axios from "axios";

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      event_id: this.props.match.params.id
    };
  }

  componentDidMount() {
    axios.get(`/api/get_event_for_page/${this.state.event_id}`).then(res => {
      this.setState({
        event: res.data[0]
      });
    });
  }

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
      <div>
        <div>
          <img src={event_pic} />
        </div>
        <div>
          <h1>{event_name}</h1>
          <h2>Hosted By: {first_name}</h2>
          <h3>Location: {location}</h3>
          <h3>Date: {date}</h3>
          <h3>Time: {time}</h3>
          <p>Details: {info}</p>
        </div>
        <br />
        <div>
          <Comments event_id={this.state.event_id} />
        </div>
      </div>
    );
  }
}

export default EventPage;
