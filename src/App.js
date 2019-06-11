import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import FrontPage from "./Components/FrontPage/FrontPage";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import EventsDir from "./Components/Events/EventsDir";
import EventPage from "./Components/Events/EventPage";
import AddEvent from "./Components/Events/AddEvent";
import Contact from "./Components/Contact/Contact";
import CurrentUserProfile from "./Components/CurrentUserProfile/CurrentUserProfile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <Header />
        {!this.props.profile.user ? (
          <FrontPage />
        ) : (
          <Switch>
            <Route path="/events_dir" component={EventsDir} />
            <Route path="/event_page/:id" component={EventPage} />
            <Route path="/add_event" component={AddEvent} />
            <Route path="/contact" component={Contact} />
            <Route path="/current_user" component={CurrentUserProfile} />
            <Route path="/" component={HomePage} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const invokedConnect = connect(mapStateToProps);

export default invokedConnect(App);
