var {User} = require('../models/user');



let authenticate = (req, res, next) => {
    let token = req.header('x-auth');
  
    User.findByToken(token).then((user) => {
      if (!user) {
        //pokud je token validni ale user v db neexistuje, kod se zastavi a preskoci do catch
        return Promise.reject();
      }
  
      req.user = user;
      req.token = token;
      next();
    }).catch((e) => {
      res.status(401).send();
    })
  };

module.exports = {authenticate};