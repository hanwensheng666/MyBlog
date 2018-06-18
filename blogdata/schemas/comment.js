const mongoose = require('mongoose');

//定义文章的表结构
module.exports = new mongoose.Schema({
	user:{
		//外键
		type:mongoose.Schema.Types.ObjectId,
		//引用
		ref:'User'
	},
	//文章主体
	commentText:String,
	//添加时间
	addTime:{
		type:Date,
		default:new Date()
	},
	content:{
		//外键
		type:mongoose.Schema.Types.ObjectId,
		//引用
		ref:'Content'
	}
})
