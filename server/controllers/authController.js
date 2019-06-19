const bcrypt = require("bcrypt");

module.exports = {
  login: (req, res, next) => {
    const { email, password } = req.body;
    const db = req.app.get("db");
    db.check_if_user_exist(email).then(userFound => {
      if (!userFound[0]) {
        res.status(401).send("Incorrect Username/Password");
      } else {
        bcrypt
          .compare(password, userFound[0].password)
          .then(matchedPassword => {
            if (matchedPassword) {
              const {
                first_name,
                last_name,
                email,
                charity,
                profile_pic,
                rating,
                bio,
                future_events,
                events_attended,
                user_id
              } = userFound[0];
              req.session.user = {
                first_name,
                last_name,
                email,
                charity,
                profile_pic,
                rating,
                bio,
                future_events,
                events_attended,
                user_id
              };
              res.status(200).send(req.session.user);
            } else {
              res.status(401).send("initializing self-destruct");
            }
          });
      }
    });
  },
  register: (req, res, next) => {
    const {
      first_name,
      last_name,
      password,
      email,
      charity,
      profile_pic
    } = req.body;
    const db = req.app.get("db");
    db.check_if_user_exist(email).then(foundUser => {
      if (foundUser.length) {
        res.status(401).send("User Already Exist. Please Login.");
      } else {
        const saltRounds = 12;
        bcrypt.genSalt(saltRounds).then(salt => {
          bcrypt.hash(password, salt).then(hashedPassword => {
            db.register([
              first_name,
              last_name,
              hashedPassword,
              email,
              charity,
              profile_pic
            ]).then(createdUser => {
              req.session.user = createdUser[0];
              res.status(200).send(req.session.user);
            });
          });
        });
      }
    });
  },
  userInfo: (req, res, next) => {
    res.status(200).send(req.session.user);
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send("logged out");
  }
};
