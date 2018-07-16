import mongoose from 'mongoose';
var Schema = mongoose.Schema;
import { hash as _hash, compareSync } from 'bcrypt-nodejs';
import titlize from 'mongoose-title-case';
import validate from 'mongoose-validator';
var nameValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
        message: 'Name must be atleast 3 characters, max 30, no special characters or numbers, must have space in between name.'
      }),
      validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
      })
  ];
  var emailValidator = [
    validate({
        validator: 'isEmail',
        //arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
        message: 'Not a valid Email'
      }),
      validate({
        validator: 'isLength',
        arguments: [3, 30],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
      })
  ];
  var usernameValidator = [
    
    validate({
        validator: 'isLength',
        arguments: [3, 25],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
      }),
      validate({
          validator: 'isAlphanumeric',
          message: 'Username must contain letters and numbers only'
      })
  ];
  var passwordValidator = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
        message: 'Password needs to have one lowercase, one uppercase, one special character, one number and must be atleast 8 characterbut not more than 35.'
      }),
      validate({
        validator: 'isLength',
        arguments: [8, 35],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
      })
  ];

var UserSchema = new Schema({
    name: { type: String, required: true , validate: nameValidator },
    username: {type: String, lowercase: true, required: true, unique: true, validate: usernameValidator},
    password:{type: String, required: true, validate: passwordValidator, select: false },
    email: { type: String, required: true, lowercase: true, unique: true, validate: emailValidator },
    active:{type: Boolean, required: true, default: false},
    temporarytoken: {type: String, required: true} 
});
//var schema = new Schema(..);
UserSchema.pre('save', function(next) {
  // do stuff
  if (!user.isModified('password')) return next();
  var user =this;
  _hash(user.password, null, null, function(err,hash){
  if(err) return next (err);
    user.password = hash;

    next();
    });
});
UserSchema.plugin(titlize, {
    paths: [ 'name' ]
});

UserSchema.methods.comparePassword =function(password){
    return compareSync(password, this.password);
};
module.export = mongoose.model('User', UserSchema);

