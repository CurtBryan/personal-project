module.exports = {
  addComment: (req, res, next) => {
    const { message, user_id, event_id } = req.body;
    const db = req.app.get("db");
    db.add_comment([message, user_id, event_id]).then(comments => {
      res.status(200).send(comments);
    });
  },
  getComments: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.pull_comments([id]).then(comments => {
      res.status(200).send(comments);
    });
  },
  editComment: (req, res, next) => {
    const { id } = req.params;
    const { message, event_id } = req.body;
    const db = req.app.get("db");
    db.edit_comment([message, id, event_id]).then(comments => {
      res.status(200).send(comments);
    });
  },
  deleteComment: (req, res, next) => {
    const { id } = req.params;
    const { event_id } = req.query;
    const db = req.app.get("db");
    console.log(id);
    console.log(req.query);
    db.delete_comments([id, event_id]).then(comments => {
      // console.log(id, event_id);
      res.status(200).send(comments);
    });
  }
};
