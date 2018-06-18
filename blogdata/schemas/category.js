const mongoose = require('mongoose');


//定义文章分类的表结构
module.exports = new mongoose.Schema({
	catename:String, //分类名称
})

