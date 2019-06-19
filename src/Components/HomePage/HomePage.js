import React, { Component } from "react";
import "./HomePage.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="homePageMainContainer">
        <div className="homePageCont">
          <div className="titleContainer">
            <h1>Welcome to Your Helping Hands Phoenix!</h1>
            <h2>Changing the world, one event at a time.</h2>
          </div>
          <div className="homePagePhotoCont">
            <img
              className="homePagePic1"
              src="https://www.volunteerforever.com/uploads/editor_uploads/ivhq-volunteer-forever-image.jpg"
            />

            <img
              className="homePagePic2"
              src="http://www8.miamidade.gov/resources/images/services/volunteer.jpg"
            />

            <img
              className="homePagePic3"
              src="https://unionstationhs.org/wp-content/uploads/2012/07/keep-volunteer.jpg"
            />
          </div>
          <div className="missionStatement">
            <p>
              We believe that each and every charitable moment is very
              important. We are so thankful for all the charities and users
              donating their time and effort to the great causes of today. Each
              and every community can do its part, let's see you do yours
              Phoenix!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
