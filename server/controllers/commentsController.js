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
    const { message } = req.body;
    const db = req.app.get("db");
    db.edit_comment([message, id]).then(comments => {
      res.status(200).send(comments);
    });
  },
  deleteComment: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.delete_comments([id]).then(comments => {
      res.status(200).send(comments);
    });
  }
};
