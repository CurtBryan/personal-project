require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const port = SERVER_PORT || 4000;

const {
  login,
  userInfo,
  register,
  logout
} = require("./controllers/authController");
const {
  getAllEvents,
  getEventForPage
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

app.get("/api/user", userInfo);
app.post("/api/register", register);
app.post("/api/login", login);
app.get("/api/logout", logout);

app.get("/api/get_events", getAllEvents);
app.get("/api/get_event_for_page/:id", getEventForPage);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is connected");
});

app.listen(port, () => console.log(`server running on port ${port} 🏹`));
