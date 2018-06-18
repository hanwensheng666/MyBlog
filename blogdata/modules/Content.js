const mongoose = require('mongoose');

const contentSchema = require('../schemas/content.js');

//用于对用户表进行操作
module.exports = mongoose.model('Content',contentSchema);
