require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const port = SERVER_PORT || 4000;

const {
  addComment,
  getComments,
  editComment,
  deleteComment
} = require("./controllers/commentsController");
const {
  login,
  userInfo,
  register,
  logout
} = require("./controllers/authController");
const {
  getAllEvents,
  getEventForPage,
  addToFutureEvents,
  getFutureEvents,
  removeFutureEvent,
  addToEventsAttended,
  getEventsAttended,
  addEvent
} = require("./controllers/eventsController");

app.use(
  session({
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 // twoweeks
    }
  })
);

app.use(express.json());

//auth logic
app.get("/api/user", userInfo);
app.post("/api/register", register);
app.post("/api/login", login);
app.get("/api/logout", logout);

//events logic
app.get("/api/get_events", getAllEvents);
app.get("/api/get_event_for_page/:id", getEventForPage);
app.get("/api/get_future_events/:id", getFutureEvents);
app.post("/api/add_future_event", addToFutureEvents);
app.delete("/api/remove_future_event/:id", removeFutureEvent);
app.get("/api/get_events_attended/:id", getEventsAttended);
app.post("/api/add_event_attended", addToEventsAttended);
app.post("/api/add_event", addEvent);

//comments logic
app.get("/api/get_comments/:id", getComments);
app.post("/api/add_comment", addComment);
app.put("/api/edit_comment/:id", editComment);
app.delete("/api/delete_comment/:id", deleteComment);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is connected");
});

app.listen(port, () => console.log(`server running on port ${port} 🏹`));
