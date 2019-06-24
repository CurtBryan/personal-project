import React, { Component } from "react";
import axios from "axios";
import "./Contact.css";
import { FaRegGrinAlt } from "react-icons/fa";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      messageSent: false
    };
  }

  handleSubmit = () => {
    const { name, email, message } = this.state;
    axios.post("/api/form", { name, email, message }).catch(err => {
      console.log(err);
    });
  };

  messageSent = () => {
    this.setState({
      messageSent: true
    });
  };

  render() {
    return (
      <div className="mainContainerContact">
        <div className="contactContainer">
          <h2 className="messageInfo">
            If you need to contact the admins of this website, please fill out
            the form below, and we will get back to you as soon as possible!{" "}
          </h2>
          <input
            onChange={event => {
              this.setState({
                name: event.target.value
              });
            }}
            placeholder="Name"
          />
          <input
            onChange={event => {
              this.setState({
                email: event.target.value
              });
            }}
            placeholder="Email"
          />
          <textarea
            onChange={event => {
              this.setState({
                message: event.target.value
              });
            }}
            className="contactMessage"
            placeholder="Message"
          />
          {!this.state.messageSent ? (
            <button
              onClick={() => {
                this.handleSubmit();
                this.messageSent();
              }}
              className="sendContactButton"
            >
              Send
            </button>
          ) : (
            <div>
              Message Sent! <FaRegGrinAlt />{" "}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Contact;
