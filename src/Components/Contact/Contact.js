import React, { Component } from "react";
import "./Contact.css";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="mainContainerContact">
        <div className="contactContainer">
          <h2 className="messageInfo">
            If you need to contact the adminsters of this website, please fill
            out the form below, and we will get back to you as soon as possible!{" "}
          </h2>
          <input placeholder="Name" />
          <input placeholder="Email" />
          <input
            type="textarea"
            className="contactMessage"
            placeholder="Message"
          />
          <button className="sendContactButton">Send</button>
        </div>
      </div>
    );
  }
}

export default Contact;
