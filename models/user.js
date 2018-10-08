const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


// {
//   email: 'andrew@example.com',
//   password: 'adpsofijasdfmpoijwerew',
//   tokens: [{
//     access: 'auth',
//     token: 'poijasdpfoimasdpfjiweproijwer'
//   }]
// }

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

//override existujici metody aby nevracela cely objekt ale jen to co chceme
UserSchema.methods.toJSON = function () {
  let user = this;
  //prevede promennou user z mongoose objektu na klasicky objekt
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email'])
}

//vytvoreni nove metody typu instance (ma pristup ke konkretnim polozkam v db)
UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString(); 
  
  user.tokens = user.tokens.concat([{access: access, token: token}]);

  //tady return aby se to dalo pouzit v server.js - navratova hodnota metody generateAuthToken je Promise
  return user.save().then(() => {
    //tady return aby se ten token dal pouzit v dalsim then() - je to vlastne hodnota argumentu do then() kterou ta promise bude vracet
    return token
  });

};



let User = mongoose.model('User', UserSchema);

module.exports = {User}
