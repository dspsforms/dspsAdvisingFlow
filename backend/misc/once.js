const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const User = require('../models/user-model');

// set this to true only once. will create an admin user
if (true) {

  const pass = '123'; // set this once, run it, then erase!
  const adminHash = bcrypt.hashSync(pass, 10);

  const currentTime = new Date();
  let user = new User({
    email: 't@test.com', // 'missiondsps@vannev.com',
    password: adminHash,
    name: 'test user',
    role: {
      isAdmin: true,
      isStaff: false,
      isFaculty: false,
      isStudent: false,
      isInstructor: false
    },
    isAdmin: true,
    isStaff: false,
    isFaculty: false,
    isStudent: false,
    isInstructor: false,
    created: currentTime,
    lastMod: currentTime

  });

  user.save().then(createdUser => {
    console.log(createdUser);
  });
}

// test admin user

if (false) {
  const pass = '123'; // set this for testing, run it, then erase!
  User.findOne({ email: 't@test.com' })
    .then(user => {
      const match = bcrypt.compareSync(pass, user.password);
      console.log("match=", match);
      return match;
    }), err => {
      console.log(err);
    };
}
