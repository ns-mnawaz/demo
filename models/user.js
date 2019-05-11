'use strict';

const mongoose = require('mongoose');

const User = new Schema({
  first_name: String,
  last_name: String,
  age: Number,
  username: String,
  password: String
});


module.exports = mongoose.model('User', User)