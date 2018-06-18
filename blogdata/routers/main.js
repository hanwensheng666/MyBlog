const express = require('express');

let router = express.Router();


router.get('/',(req,res,next)=>{
	res.render('main/index');
})
router.get('/test',(req,res,next)=>{
	res.render('main/test');
})


module.exports = router;

