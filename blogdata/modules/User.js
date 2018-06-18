const mongoose = require('mongoose');

const userSchema = require('../schemas/users.js');

//用于对用户表进行操作
module.exports = mongoose.model('User',userSchema);
