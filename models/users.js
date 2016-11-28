var bcrypt = require('bcrypt');
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var db = pgp('postgres://localhost:5432/userauth');

getUser = function(id, callback){
  debugger
  db.one('select * from users where id = $1', id)
    .then(function (user) {
      debugger
      return callback(null, user);
    })
    .catch(function (err) {
      debugger
      return callback(err);
    });
}

// authenticate input against database documents
authenticate = function(email, password, callback) {
  db.one('select * from users where email = $1', email)
    .then(function (user) {
      bcrypt.compare(password, user.password , function(error, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    })
    .catch(function (err) {
      if (err) {
        return callback(error);
      } else if ( !user ) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
    });
}

module.exports.authenticate = authenticate;
module.exports.getUser = getUser;
