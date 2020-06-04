const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

// add existing admin user to dspsEmployee
const DspsEmployee = require('../models/dsps-employee-model');

// set this to true only once. will create an admin user
if (true) {

  const pass = '123'; // set this once, run it, then erase!
  const adminHash = bcrypt.hashSync(pass, 10);

  const currentTime = new Date();
    
  let dspsEmployee = new DspsEmployee({
    email: 't@test.com', // 'missiondsps@vannev.com',
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
    lastMod: currentTime,
    metaHistoryArr: [ 
      { ip: 'localhost', date: currentTime, type: 'newUser' }
    ]

  });

  dspsEmployee.save().then(createdDspsEmp => {
      console.log("dsps employee=", createdDspsEmp);
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
