const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


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

//statics pro metody typu model (nepracuji s instancemi)
UserSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;

    try {
      decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject(); //kratsi verze deklarace promise, ktera hned provede reject variantu
    }

    //User.findOne() vraci promise takze dame return aby se ta promise vratila do server.js odkus se findByToken bude volat a budeme moct pouzit then()
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,  //key musi byt v uvozovkach kdyz pouzivame dot notation
        'tokens.access': 'auth'
    })
};

UserSchema.pre('save', function (next) {
  let user = this;

  //kontrola jestli bylo zmeneno heslo, kdyz ne (treba zmeneno neco jineho) tak se nic nedela aby se nehashovalo uz jednou hashovane heslo
  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});




let User = mongoose.model('User', UserSchema);

module.exports = {User}
