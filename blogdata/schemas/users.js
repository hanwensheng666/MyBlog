const mongoose = require('mongoose');


//定义用户的表结构
module.exports = new mongoose.Schema({
	username:String,
	password:String,
	isAdmin:{
		type:Boolean,
		default:false
	} 
})


