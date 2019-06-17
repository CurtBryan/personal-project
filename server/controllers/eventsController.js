module.exports = {
  getAllEvents: (req, res, next) => {
    const db = req.app.get("db");
    db.get_events().then(events => {
      res.status(200).send(events);
    });
  },
  getEventForPage: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.get_event_for_page([id]).then(event => {
      res.status(200).send(event);
    });
  },
  addToFutureEvents: (req, res, next) => {
    const { user_id, event_id } = req.body;
    const db = req.app.get("db");
    db.add_future_event([user_id, event_id]).then(event => {
      res.status(200).send(event);
    });
  },
  getFutureEvents: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.pull_future_events([id]).then(events => {
      res.status(200).send(events);
    });
  },
  removeFutureEvent: (req, res, next) => {
    const { id } = req.params;
    const { user_id } = req.body;
    const db = req.app.get("db");
    db.remove_future_event([id, user_id]).then(events => {
      res.status(200).send(events);
    });
  },
  addToEventsAttended: (req, res, next) => {
    const { user_id, event_id } = req.body;
    const db = req.app.get("db");
    db.add_event_attended([user_id, event_id]).then(event => {
      res.status(200).send(event);
    });
  },
  getEventsAttended: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.pull_events_attended([id]).then(events => {
      res.status(200).send(events);
    });
  },
  addEvent: (req, res, next) => {
    const {
      event_name,
      date,
      time,
      location,
      info,
      event_pic,
      creator_id
    } = req.body;
    const db = req.app.get("db");
    db.add_event([
      event_name,
      date,
      time,
      location,
      info,
      event_pic,
      creator_id
    ]).then(events => {
      res.status(200).send(events);
    });
  }
};
