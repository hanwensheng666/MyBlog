/**
 * 应用程序的启动入口页
 * */

//加载express模块
const express = require('express');
//加载模板模块
const swig = require('swig');
//加载数据库模块
const mongoose = require('mongoose');
//
//加载body-parser,用来处理post提交的数据
const bodyParser = require('body-parser');

//加载cookies模块
//const cookie = require('cookies');

//创建app应用 相当于 http.createServer()
let app = express();

//设置cookie
//app.use(function(req,res,next){
//	req.cookies = new Cookies(req,res);
//	next();
//})


//bodyParser设置
app.use(bodyParser.urlencoded({extended:true}));
//设置静态文件托管  当请求是以/public开始的，则直接返回__dirname+'/public'对应的文件
//app.use('/public',express.static(__dirname+'/public'));


//配置应用模板
//定义当前应用所使用的模板引擎
//app.engine(模板引擎名字(后缀)，用于解析模板内容的方法)
//app.engine('html',swig.renderFile);
////设置模板所在目录，第一个参数必须是 'views'
//app.set('views','./views');
////注册所使用的模板引擎，第一个参数必须是'view engine' , 第二个参数和app.engine这个方法中定义的模板引擎名称是一样的
//app.set('view engine','html')

/**
 * swig.setDefaults({cache:false});
 * 在开发过程中，需要取消模板缓存,上线后删除
 * */
//swig.setDefaults({cache:false});


/**
 * 根据不同功能划分模块
 * */
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));


//app.listen(8882);
mongoose.connect('mongodb://localhost:27017/myblog',err=>{
	if(err){
		console.log("数据库连接失败")
	}else{
		console.log("数据库连接成功")
		app.listen(8882);
	}
});
//console.log(mongoose);




