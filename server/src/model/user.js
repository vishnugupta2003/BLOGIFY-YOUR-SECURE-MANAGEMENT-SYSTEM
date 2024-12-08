const mongoose = require('mongoose');
var CryptoJS = require('crypto-js');
const { v4: uuidv4 } = require('uuid');
// Schema take two object first one is collection of structure Schema and second one is options and configuration of particular schema.
const UserSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    encry_password: String,
    salt: String,

    role: {
      type: String,
      default: 'Reader',
      enum: ['Admin', 'writer', 'Reader'],
    },
  },

  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'auth_user',
  }
);

// virtual field

UserSchema.virtual('full_name').get(function () {
  return this.first_name + ' ' + this.last_name;
});

UserSchema.virtual('password').set(function (planPassword) {
  this.salt = uuidv4();
  this.encry_password = CryptoJS.HmacSHA1(planPassword, this.salt).toString();
});

UserSchema.methods = {
  authentication: function (planPassword) {
    return (
      CryptoJS.HmacSHA1(planPassword, this.salt).toString() ===
      this.encry_password
    );
  },
};
const User = mongoose.model('User', UserSchema);

module.exports = { User };
// In this getter and setter function use normal function because arrow function not support this keywords.
