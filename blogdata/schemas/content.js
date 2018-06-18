const mongoose = require('mongoose');

//定义文章的表结构
module.exports = new mongoose.Schema({
	title:String,
	category:{
		//外键
		type:mongoose.Schema.Types.ObjectId,
		//引用
		ref:'Category'
	},
	//内容摘要
	summary:{
		type:String,
		default:''
	},
	//文章主体
	contentText:{
		type:String,
		default:''
	},
	//作者
	user:{
		//外键
		type:mongoose.Schema.Types.ObjectId,
		//引用
		ref:'User'
	},
	//添加时间
	addTime:{
		type:Date,
		default:new Date()
	},
	//阅读量
	views:{
		type:Number,
		default:0
	}
})
