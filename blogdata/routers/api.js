const express = require('express');
const User = require('../modules/User.js');
const Category = require('../modules/Category.js');
const Content = require('../modules/Content.js')
const Comment = require('../modules/Comment.js')
const url = require('url');
let router = express.Router();


//统一的返回格式
let responseData;
router.use(function(req,res,next){
	responseData = {
		code:0,
		msg:'',
		data:{}
	}
	next();
});

router.get('/user',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
    responseData.code = 0;
	responseData.msg = '测试数据';
	res.json(responseData)
})
/**
 * 用户数据  注册请求
 * */
router.post('/user/register',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let data = null;
	for(let prop in req.body){
		data = JSON.parse(prop);
		break;
	}
	let username = data.username;
	let password = data.password;
	let repassword = data.repassword;
	
	//用户名是否为空
	if( username == '' || username.trim() == '' ){
		responseData.code = 1;
		responseData.msg = '用户名不能为空！';
		res.json(responseData); 
		return;
	}
	if( password== '' || password.trim() == '' ){
		responseData.code = 1;
		responseData.msg = '密码不能为空！';
		res.json(responseData); 
		return;
	}
	if(password!= repassword){
		responseData.code = 3;
		responseData.msg = '两次输入的密码不一致！';
		res.json(responseData); 
		return;
	}
	
	/**
	 * 查询数据库，看是否用户名已经被注册
	 * */
	User.findOne({
		username:username//查询username字段==username的记录
	}).then(data=>{
		if(data){
			responseData.code = 4;
			responseData.msg = '用户名已经被注册过了';
			res.json(responseData); 
			return;
		}
		//没有被注册过，保存用户信息到数据库中
		let user = new User({
			'username':username,
			'password':password
		});
		return user.save();
	}).then(info=>{
//		console.log(info)
		responseData.code = 0;
		responseData.msg = '注册成功！';
		res.json(responseData); 
	})
	
})


/**
 * 登陆请求处理
 * */
router.post('/user/login',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let data = null;
	for(let prop in req.body){
		data = JSON.parse(prop);
		break;
	}
	let username = data.username;
	let password = data.password;
	
	if( username == '' || username.trim() == '' ){
		responseData.code = 1;
		responseData.msg = '用户名不能为空！';
		res.json(responseData); 
		return;
	}
	if( password== '' || password.trim() == '' ){
		responseData.code = 1;
		responseData.msg = '密码不能为空！';
		res.json(responseData); 
		return;
	}
	
	//从数据库查询用户数据
	User.findOne({
		username:username//查询username字段==username的记录
	}).then(data=>{
//		console.log(data);
		if(data){
			//查询到该用户，核对密码
			if(data.password == password){
				//密码正确
				responseData.code = 0;
				responseData.msg = '登陆成功！';
				responseData.data = data;
				res.json(responseData); 
			}else{
				responseData.code = 1;
				responseData.msg = '密码错误';
				res.json(responseData); 
				return;
			}
		}else{
			//没有该用户，用户名不存在
			responseData.code = 1;
			responseData.msg = '用户名不存在';
			res.json(responseData); 
			return;
		}
	})
	
})



/**
 * 获取所有分类信息
 * */
router.get('/category/getAllCategory',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	
	/*
	 这里要进行分页操作
	 limit(Number)//每页取多少个数据
	 skip(Number):忽略多少条数据
	 sort({_id:-1})按照id排序 1 正序 -1 倒叙
	 * */
	Category.find().sort({_id:-1}).then(cates=>{
		responseData.code = 0;
		responseData.msg = 'OK';
		responseData.data = {
			cateList:cates
		}
		res.json(responseData)
	})
})


/**
 * 获取所有文章的数量
 * */
router.get('/content/getContentCount',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	Content.find().count().then(data=>{
		responseData.code = 0;
		responseData.msg = 'OK';
		responseData.data = {
			count:data
		}
		res.json(responseData)
	}).catch(err=>{
		console.log(err);
		console.log("请求超时！");
	})
});

/**
 * 获取所有文章(分页)
 * */
router.get('/content/getAllContent',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	
	let paramsJSON = url.parse(req.url,true).query;
	let limitNum = parseInt(paramsJSON.pageSize);
	let skipNum = parseInt(paramsJSON.start);
	
	Content.find().sort({_id:-1}).limit(limitNum).skip((skipNum-1)*limitNum).populate(['category','user']).then(contents=>{
		responseData.code = 0;
		responseData.msg = 'OK';
		responseData.data = {
			contentList:contents
		}
//		console.log(responseData.data);
		res.json(responseData)
	})
});


/**
 * 根据分类id获取文章列表
 * */
router.get('/content/getContentByCatId',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	
	let paramsJSON = url.parse(req.url,true).query;
	let limitNum = parseInt(paramsJSON.pageSize);
	let skipNum = parseInt(paramsJSON.start);
	let catId = paramsJSON.catId;
	if(catId == 'all'){
		Content.find().sort({_id:-1}).limit(limitNum).skip((skipNum-1)*limitNum).populate(['category','user']).then(contents=>{
			responseData.code = 0;
			responseData.msg = 'OK';
			responseData.data = {
				contentList:contents
			}
	//		console.log(responseData.data);
			res.json(responseData)
		})
	}else{
		Content.find({category:catId}).sort({_id:-1}).limit(limitNum).skip((skipNum-1)*limitNum).populate(['category','user'])
		.then(contents=>{
			responseData.code = 0;
			responseData.msg = 'OK';
			responseData.data = {
				contentList:contents
			}
			res.json(responseData)
		})
	}
})


/**
 * 根据分类id获取文章数量
 * */
router.get('/content/getContentCountByCatId',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let paramsJSON = url.parse(req.url,true).query;
	let catId = paramsJSON.catId;
	
	if(catId == 'all'){
		Content.find().count().then(data=>{
			responseData.code = 0;
			responseData.msg = 'OK';
			responseData.data = {
				count:data
			}
			res.json(responseData)
		}).catch(err=>{
			console.log(err);
			console.log("请求超时！");
		})
	}else{
		Content.find({category:catId}).count().then(data=>{
			responseData.code = 0;
			responseData.msg = 'OK';
			responseData.data = {
				count:data
			}
			res.json(responseData)
		}).catch(err=>{
			console.log(err);
			console.log("请求超时！");
		})
	}
})

/**
 * 根据文章id获取文章
 * */
router.get('/content/getContentById',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let paramsJSON = url.parse(req.url,true).query;
	let id = paramsJSON.id;
	Content.find({
		_id:id
	}).populate(['category','user']).then(data=>{
		responseData.code = 0;
		responseData.msg = 'OK';
//		console.log(data)
		data[0].views++;
		data[0].save();
		responseData.data = {
			content:data[0]
		}
		res.json(responseData)
	}).catch(err=>{
		console.log(err);
		console.log("请求超时！");
	})
})

/**
 * 添加评论Comment
 * */
router.post('/comment/addComment',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let data = null;
	for(let prop in req.body){
		data = JSON.parse(prop);
		break;
	}
	let userId = data.userId;
	let contentId = data.contentId;
	let commentText = data.commentText;
	
	let comment = new Comment({
		'user':userId,
		'content':contentId,
		'commentText':commentText
	});
	comment.save().then(info=>{
		responseData.code = 0;
		responseData.msg = '评论成功！';
		res.json(responseData);
	})
	
})


/**
 * 根据文章id查询评论
 * */
router.get('/comment/getCommentByContentId',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let paramsJSON = url.parse(req.url,true).query;
	let id = '';
	let limitNum = parseInt(paramsJSON.pageSize);
	let skipNum = parseInt(paramsJSON.start);
	for(let props in paramsJSON){
		id = props.toString();
		break;
	}
//	console.log(id);
	let count = 0;
	Comment.find({content:id}).count().then(data=>{
		count = data;
	})
	Comment.find({content:id}).sort({_id:-1}).limit(limitNum).skip((skipNum-1)*limitNum).populate(['user']).then(data=>{
//		console.log(data);
		responseData.code = 0;
		responseData.msg = 'OK';
		responseData.data = {
			commentList:data,
			count:count
		}
		res.json(responseData)
	}).catch(err=>{
		console.log(err);
		console.log("请求超时！");
	})
	
})


/**
 * 根据评论id删除评论
 * */
router.get('/comment/removeCommentById',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let paramsJSON = url.parse(req.url,true).query;
	let id = paramsJSON._id;
//	for(let props in paramsJSON){
//		id = props.toString();
//		break;
//	}
//	console.log(id);
	Comment.remove({'_id':id}).then(info=>{
		if(info.ok == 1){
			responseData.code = 0;
			responseData.msg = '删除成功！';
			res.json(responseData); 
		}else{
			responseData.code = 4;
			responseData.msg = '删除失败！请重试！';
			res.json(responseData); 
		}
	})
	
})
/*Category.remove({
		'_id':id
	}).then(info=>{
		if(info.ok == 1){
			responseData.code = 0;
			responseData.msg = '删除成功！';
			res.json(responseData); 
		}else{
			responseData.code = 4;
			responseData.msg = '删除失败！请重试！';
			res.json(responseData); 
		}
	})*/

module.exports = router;

