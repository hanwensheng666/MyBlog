const mongoose = require('mongoose');

const contentSchema = require('../schemas/comment.js');

//用于对用户表进行操作
module.exports = mongoose.model('Comment',contentSchema);
