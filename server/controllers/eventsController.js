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
  }
};
