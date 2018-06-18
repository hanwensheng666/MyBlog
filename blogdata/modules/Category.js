const mongoose = require('mongoose');

const categorySchema = require('../schemas/category.js');

//用于对用户表进行操作
module.exports = mongoose.model('Category',categorySchema);
