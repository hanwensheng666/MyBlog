const express = require('express');

let router = express.Router();

const User = require('../modules/User.js');
const Category = require('../modules/Category.js');
const Content = require('../modules/Content.js');

const url = require('url');



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
	
	User.find().then(users=>{
		
	})
})
/**
 * 获取所有用户数据
 * */
router.get('/user/getAllUser',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	
	let paramsJSON = url.parse(req.url,true).query;
	let limitNum = parseInt(paramsJSON.pageSize);
	let skipNum = parseInt(paramsJSON.start);
	
	/*
	 这里要进行分页操作
	 limit(Number)//每页取多少个数据
	 skip(Number):忽略多少条数据
	 * */
	User.find().limit(limitNum).skip((skipNum-1)*limitNum).then(users=>{
		responseData.code = 0;
		responseData.msg = 'OK';
		responseData.data = {
			userList:users
		}
		res.json(responseData)
	})
});
/**
 * 获取所有用户数据的数量
 * */
router.get('/user/getUserCount',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	User.find().count().then(data=>{
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

router.post('/category/add',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let data = null;
	for(let prop in req.body){
		data = JSON.parse(prop);
		break;
	}
	let catename = data.catename;
	
	if(catename == '' || catename.trim() == ''){
		responseData.code = 3;
		responseData.msg = '名称不能为空！';
		res.json(responseData); 
		return;
	}
	
	Category.findOne({
		catename:catename//查询username字段==username的记录
	}).then(data=>{
		if(data){
			responseData.code = 4;
			responseData.msg = '已经存在此分类！';
			res.json(responseData); 
			return;
		}
		let cate = new Category({
			'catename':catename,
		});
		return cate.save();
	}).then(info=>{
		responseData.code = 0;
		responseData.msg = '添加分类成功！';
		res.json(responseData); 
	})
});

/**
 * 获取所有分类的数量
 * */
router.get('/category/getCategoryCount',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	Category.find().count().then(data=>{
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
 * 获取所有分类数据(分页)
 * */
router.get('/category/getAllCategory',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	
	let paramsJSON = url.parse(req.url,true).query;
	let limitNum = parseInt(paramsJSON.pageSize);
	let skipNum = parseInt(paramsJSON.start);
	
	/*
	 这里要进行分页操作
	 limit(Number)//每页取多少个数据
	 skip(Number):忽略多少条数据
	 * */
	Category.find().limit(limitNum).skip((skipNum-1)*limitNum).then(cates=>{
		responseData.code = 0;
		responseData.msg = 'OK';
		responseData.data = {
			cateList:cates
		}
		res.json(responseData)
	})
});

/**
 * 获取所有分类数据不分页
 * */
router.get('/category/getAllCategory',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	Category.find().sort({_id:-1}).then(cates=>{
		responseData.code = 0;
		responseData.msg = 'OK';
		responseData.data = {
			cateList:cates
		}
		res.json(responseData)
	})
});

/**
 * 删除指定id的分类
 * */
router.post('/category/delete',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let data = null;
	for(let prop in req.body){
		data = JSON.parse(prop);
		break;
	}
	let id = data.id;
	Category.remove({
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
	})
});



/**
 * 获取制定id的用户
 * */
router.post('/category/findById',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let data = null;
	for(let prop in req.body){
		data = JSON.parse(prop);
		break;
	}
	let id = data.id;
	Category.findOne({
		_id:id		
	}).then(data=>{
		if(data){
			responseData.code = 0;
			responseData.msg = 'OK！';
			console.log(data);
			responseData.data = data;
			res.json(responseData); 
		}else{
			responseData.code = 4;
			responseData.msg = 'err！';
			res.json(responseData); 
		}
	})
});


/**
 * 修改指定分类的信息
 * */
router.post('/category/editCategory',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let data = null;
	for(let prop in req.body){
		data = JSON.parse(prop);
		break;
	}
	let id = data.id;
	let catename = data.catename;
	
	Category.update({'_id':id},{$set:{'catename':catename}}).then(info=>{
		if(info.ok = 1){
			responseData.code = 0;
			responseData.msg = '编辑成功！';
			res.json(responseData); 
		}else{
			responseData.code = 4;
			responseData.msg = '编辑失败！发生未知错误';
			res.json(responseData); 
		}
	})
})



/**
 * 添加文章
 * 
 * */
router.post('/content/add',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let data = null;
	for(let prop in req.body){
		data = JSON.parse(prop);
		break;
	}
	let title = data.title;
	let cateId = data.cateId;
	let summary = data.summary;
	let contentText = data.contentText;
	let userId = data.userId;
	if(title == '' || title.trim() == ''){
		responseData.code = 3;
		responseData.msg = '标题不能为空！';
		res.json(responseData); 
		return;
	}
	if(cateId == '' || cateId.trim() == ''){
		responseData.code = 3;
		responseData.msg = '请选择文章分类！';
		res.json(responseData); 
		return;
	}
	if(contentText == '' || contentText.trim() == ''){
		responseData.code = 3;
		responseData.msg = '文章内容为空！';
		res.json(responseData); 
		return;
	}
	
	Content.findOne({
		title:title//查询username字段==username的记录
	}).then(data=>{
		if(data){
			responseData.code = 4;
			responseData.msg = '标题重复！';
			res.json(responseData); 
			return;
		}
		let cont = new Content({
			'title':title,
			'category':cateId,
			'summary':summary,
			'contentText':contentText,
			'user':userId
		});
		return cont.save();
	}).then(info=>{
//		console.log(info)
		responseData.code = 0;
		responseData.msg = '添加文章成功！';
		res.json(responseData); 
	})
});






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
 * 获取所有文章数据(分页)
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
		console.log(responseData.data);
		res.json(responseData)
	})
});


/**
 * 删除指定分类的文章
 * 
 * */
router.post('/content/deleteContent',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let data = null;
	for(let prop in req.body){
		data = JSON.parse(prop);
		break;
	}
	let id = data.id;
	Content.remove({
		_id:id
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
	})
})



/**
 * 修改文章
 * */

router.post('/content/edit',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let data = null;
	for(let prop in req.body){
		data = JSON.parse(prop);
		break;
	}
	Content.update({'_id':data._id},{$set:{
			'title':data.title,
			'cateId':data.cateId,
			'summary':data.summary,
			'contentText':data.contentText
		}
	}).then(info=>{
		if(info.ok = 1){
			responseData.code = 0;
			responseData.msg = '修改成功！';
			res.json(responseData); 
		}else{
			responseData.code = 4;
			responseData.msg = '修改成功失败！发生未知错误';
			res.json(responseData); 
		}
	})
})

module.exports = router;

