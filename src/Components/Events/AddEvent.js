import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import "./AddEvent.css";

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event_name: "",
      date: "",
      time: "",
      location: "",
      info: "",
      event_pic: "",
      creator_id: this.props.profile.user.user_id,
      addedEvent: false,
      failure: false
    };
  }

  addEvent = () => {
    const {
      event_name,
      date,
      time,
      location,
      info,
      event_pic,
      creator_id
    } = this.state;
    Axios.post(`/api/add_event`, {
      event_name,
      date,
      time,
      location,
      info,
      event_pic,
      creator_id
    })
      .then(() => {
        this.setState({
          addedEvent: true,
          failure: false
        });
      })
      .catch(() => {
        this.setState({
          failure: true
        });
      });
  };

  render() {
    console.log(this.props.profile.user.user_id);
    // const { event_name, date, time, location, info, event_pic } = this.state;
    return (
      <div>
        {this.state.addedEvent ? (
          <div>
            <h1>Addition was successful! Just like you!</h1>
          </div>
        ) : null}
        {this.state.failure ? (
          <div>
            <h1>
              Something went wrong! Oh no! Please double check all inputs.
            </h1>
          </div>
        ) : null}
        <div className="addEventBody">
          <div className="demInputs">
            <input
              onChange={event => {
                this.setState({
                  event_name: event.target.value
                });
              }}
              placeholder="Event Name"
            />
            <input
              onChange={event => {
                this.setState({
                  date: event.target.value
                });
              }}
              placeholder="Date (MM-DD-YYYY)"
            />
            <input
              onChange={event => {
                this.setState({
                  time: event.target.value
                });
              }}
              placeholder="Time (0:00AM) "
            />
            <input
              onChange={event => {
                this.setState({
                  location: event.target.value
                });
              }}
              placeholder="Location (Address)"
            />
            <textarea
              onChange={event => {
                this.setState({
                  info: event.target.value
                });
              }}
              placeholder="Information"
            />
            <input
              onChange={event => {
                this.setState({
                  event_pic: event.target.value
                });
              }}
              placeholder="Event Picture (URL)"
            />
            <div>
              <button
                className="addEventPageButton"
                onClick={() => this.addEvent()}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const invokedConnect = connect(mapStateToProps);
export default invokedConnect(AddEvent);
