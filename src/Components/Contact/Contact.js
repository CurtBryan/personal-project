import React, { Component } from "react";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div>
          <h2>
            If you need to contactthe adminsters of this website, please fill
            out the form below, and we will get back to you as soon as possible!{" "}
          </h2>
          <h1>Name:</h1>
          <input />
          <h1>Email:</h1>
          <input />
          <h1>Message:</h1>
          <input />
        </div>
      </div>
    );
  }
}

export default Contact;
