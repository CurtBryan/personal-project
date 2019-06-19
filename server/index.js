require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const nodemailer = require("nodemailer");

app.use(express.json());
const {
  SERVER_PORT,
  SESSION_SECRET,
  CONNECTION_STRING,
  NODEMAILEREMAIL,
  NODEMAILERPASS
} = process.env;
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

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is connected");
});
//nodemailer
app.post("/api/form", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: NODEMAILEREMAIL,
      pass: NODEMAILERPASS
    }
  });
  const mailOptions = {
    from: `${req.body.email}`,
    to: NODEMAILEREMAIL,
    subject: `${req.body.name}`,
    text: `${req.body.message}`,
    replyTo: `${req.body.email}`
  };
  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error("there was an error: ", err);
    } else {
      console.log("here is the res: ", res);
    }
  });
});

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
app.delete("/api/remove_future_event/:future_events_id", removeFutureEvent);
app.get("/api/get_events_attended/:id", getEventsAttended);
app.post("/api/add_event_attended", addToEventsAttended);
app.post("/api/add_event", addEvent);

//comments logic
app.get("/api/get_comments/:id", getComments);
app.post("/api/add_comment", addComment);
app.put("/api/edit_comment/:id", editComment);
app.delete("/api/delete_comment/:id", deleteComment);

app.listen(port, () => console.log(`server running on port ${port} 🏹`));
