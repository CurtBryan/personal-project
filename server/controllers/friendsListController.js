module.exports = {
  get_friends_list: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.get_friends_list([id]).then(friends_list => {
      res.status(200).send(friends_list);
    });
  },
  get_all_users: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.get_all_users([id]).then(users => {
      res.status(200).send(users);
    });
  },
  add_friend: (req, res, next) => {
    const { id } = req.params;
    const { friend_id } = req.query;
    const db = req.app.get("db");
    db.add_friend([id, friend_id]).then(friend => {
      res.status(200).send(friend);
    });
  },
  delete_friend: (req, res, next) => {
    const { id } = req.params;
    const { friend_id } = req.query;
    const db = req.app.get("db");
    db.remove_friend([id, friend_id]).then(friend => {
      res.status(200).send(friend);
    });
  }
};
