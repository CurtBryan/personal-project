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
import UserPage from "./Components/Users/UserPage";
import UsersList from "./Components/Users/UsersList";
import FriendsList from "./Components/FriendsList/FriendsList";
// import Messaging from "./Components/Messaging/Messaging";

// colors mint green #4EF39A light blue #4EF3EC purple #F34EA7
// font-family: 'Pacifico', cursive;
// font-family: 'Dancing Script', cursive;
// font-family: 'Quattrocento', serif;
// font-family: 'Quattrocento Sans', sans-serif;
// font-family: 'Indie Flower', cursive;
// font-family: 'Oswald', sans-serif;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        {!this.props.profile.user ? (
          <FrontPage />
        ) : (
          <div>
            <Header />
            <Switch>
              <Route path="/events_dir" component={EventsDir} />
              <Route path="/event_page/:id" component={EventPage} />
              <Route path="/add_event" component={AddEvent} />
              <Route path="/contact" component={Contact} />
              <Route path="/current_user" component={CurrentUserProfile} />
              <Route path="/friendslist" component={FriendsList} />
              <Route path="/users" component={UsersList} />
              <Route path="/userPage" component={UserPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </div>
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
