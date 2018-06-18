<template>
	<div class="ContentDetails col-xs-8 ">
		<ul>
			<li>
				<div class="ContentDetails-title">
					<h3>{{content.title}}</h3>
					<p>
						<span>作者：</span><span>{{content.user.username}}</span>-
						<span>时间：</span><span>{{content.addTime | time}}</span>-
						<span>阅读：</span><span>{{content.views}}</span>-
						<span>评论：</span><span>10</span>
					</p>
				</div>
				<div class="ContentDetails-content">
					<p>{{content.contentText}}</p>
				</div>
			</li>
			<li>
				<!--评论模块-->
				<div class="listBox message">
					<h3 class="textLeft">
						<strong>评论</strong><span class="em">一共有10条评论</span>
					</h3>
					<p class="textLeft">{{user.username}}</p>
					<p v-if="user._id" class="textLeft clear">
						<textarea class="form-control" rows="3" v-model="commentText"></textarea>
						<button class="btn btn-success" style="margin-top: 0.5rem; float: right;" @click="subComment()">提交评论</button>
						<div class="clear"></div>
					</p>
					<div v-if="!user._id" class="alert alert-warning" role="alert">您还没有登录，请先登录</div>
					<p class="text-center replay">暂无更多回复</p>
					<!--评论列表-->
					<div id="messDivId">
						<div class="story" v-for="(comment,index) in commentList" :key="index">
							<div class="opbtn"></div>
							<p class="story_t">{{comment.user.username}}<span class="lou">{{index+1}}楼</span><a class="deletepl" v-if="user.isAdmin" @click="deletepl(comment._id)">删除</a></p>
							<p class="story_time">{{comment.addTime | time}}</p>
							<p class="story_m">{{comment.commentText}}</p>
							<!--<p class="story_hf">@剑花烟雨:的是相对无言眼波如流的默契的是相对无言眼波如流的默契的是相对无言眼波如流的默契的是相对无言眼波如流的默契的是相对无言眼波如流的默契的是相对无言眼波如流的默契</p>-->
						</div>
					</div>
				</div>
			</li>
		</ul>
		<ul>
			<li class="no-bg">
				<button v-if="start<pageNum" class="btn btn-success btn-block" @click="getMore()">查看更多</button>
				<button v-if="start>=pageNum"  class="btn btn-success btn-block">没有更多了</button>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "ContentDetails",
		data() {
			return {
				content: {
					user: {
						username: 'admin'
					},
				},
				commentText:'',
				contentId:'',
				commentList:[],
				start: 1,
				pageSize: 6,
				count: 0,
			}
		},
		methods:{
			deletepl(id){
				fetch('http://localhost:8882/api/comment/removeCommentById?_id='+id,{
					cache: 'no-cache',
					//					credentials: 'same-origin',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					method: 'GET',
					mode: 'cors',
				}).then(res => {
					return res.json();
				}).then(data => {
					this.getCommentByContentId(1);
					alert(data.msg);
				})
			},
			getMore(){
				this.getCommentByContentId(this.start+1);
			},
			subComment(){
				let comment = {
					commentText:this.commentText,
					userId:this.user._id,
					contentId:this.contentId
				}
				fetch('http://localhost:8882/api/comment/addComment', {
					body: JSON.stringify(comment),
					cache: 'no-cache',
					//					credentials: 'same-origin',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					method: 'POST',
					mode: 'cors',
				})
				.then(res => {
					return res.json();
				}).then(data => {
					this.getCommentByContentId(1);
					alert(data.msg);
				})
			},
			getCommentByContentId(start){
				fetch('http://localhost:8882/api/comment/getCommentByContentId?'+this.contentId+'&start='+start+'&pageSize=' + this.pageSize, {
					cache: 'no-cache',
					//					credentials: 'same-origin',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					method: 'GET',
					mode: 'cors',
				})
				.then(res => {
					return res.json();
				}).then(data => {
					this.count = data.data.count;
					data.data.commentList.forEach(comm=>{
						this.commentList.push(comm);
					})
					this.start = start;
				})
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			pageNum() {
				return Math.floor(this.count / this.pageSize) + (this.count % this.pageSize > 0 ? 1 : 0);
			}
		},
		created() {
			function GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return decodeURI(r[2]);
				return null;
			}
			this.contentId = GetQueryString('id');
			fetch('http://localhost:8882/api/content/getContentById?id=' + GetQueryString('id'), {
					cache: 'no-cache',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					method: 'GET',
					mode: 'cors',
				})
				.then(res => {
					return res.json();
				}).then(data => {
					if(data.code == 0) {
						this.content = data.data.content;
						this.getCommentByContentId(1);
					}
				})
		}
	}
</script>

<style scoped>
	.ContentDetails {
		margin-right: 30px;
		box-sizing: border-box;
	}
	
	.ContentDetails ul li {
		padding: 20px 30px;
		background: #fff;
		margin-bottom: 25px;
	}
	
	.user-wrapper {
		padding: 10px;
		box-sizing: border-box;
	}
	
	.ContentDetails-title {
		text-align: center;
	}
	
	.ContentDetails-title h3 {
		font-size: 32px;
		font-weight: bold;
	}
	
	.ContentDetails-title p span:nth-of-type(2n) {
		color: #2572bd;
		margin-right: 10px;
	}
	
	.ContentDetails-content p {
		color: #8fbdeb;
	}
	
	ul li.no-bg {
		background: none;
		padding: 0;
	}
	
	.textLeft {
		text-align: left;
	}
	
	.textLeft strong {
		font-size: 24px;
		font-weight: 800;
	}
	
	.textLeft .em {
		font-size: 18px;
		float: right;
		line-height: 30px;
	}
	
	.clear {
		clear: both;
	}
	
	.replay {
		font-size: 20px;
		font-weight: 700;
		color: #333;
		border-top: 1px solid #ccc;
		padding: 10px;
	}
	
	.in2 {
		padding: 20px 25px;
		border-radius: 3px 3px 0 0;
		border-top: 1px solid #e8e8e8;
		height: auto;
		margin: auto;
		position: relative;
	}
	
	.z14 {
		font-size: 14px;
	}
	
	.pl {
		width: 90%;
		border: 1px solid #e8e8e8;
		padding: 4px;
		border-radius: 5px;
		margin-left: 8%;
		position: relative;
		margin-top: 20px;
	}
	
	.tx {
		position: absolute;
		top: 0px;
		left: -55px;
		width: 55px;
		height: 50px;
		background-image: url(./img/tx.png);
		background-repeat: no-repeat;
		background-position: right 10px;
		padding-right: 12px;
	}
	
	.pl a {
		color: #5d6c80;
		text-decoration: none;
		cursor: pointer;
	}
	
	.tx img {
		width: 100%;
		border-radius: 45px;
	}
	
	.pl ul {
		padding: 0px 20px;
		line-height: 26px;
	}
	
	.plbg {
		background-color: #eff6f9;
	}
	
	.f {
		float: left;
	}
	
	.r {
		float: right;
	}
	
	.z12 {
		font-size: 12px;
	}
	
	.dr {
		clear: right;
	}
	
	.pl ul {
		padding: 0px 20px;
		line-height: 26px;
	}
	
	.pl a {
		color: #5d6c80;
		text-decoration: none;
		cursor: pointer;
	}
	
	.hf {
		float: right;
		font-size: 12px;
		line-height: 26px;
	}
	
	.nr {
		padding-top: 15px;
	}
	
	ul,
	li {
		list-style: none;
	}
	
	.ylcon {
		width: 100%;
		min-width: 320px;
	}
	
	.tit {
		height: 26px;
		line-height: 26px;
		padding: 0px 15px;
		position: relative;
		font-size: 15px;
		color: #aaa;
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	}
	
	.story {
		border-bottom: 1px dashed #cecece;
		padding: 0 15px 3px;
		position: relative;
	}
	
	.story_t {
		font-size: 1.2em;
		color: rgba(0, 0, 0, 1);
		padding-top: 5px;
		padding-bottom: 2px;
	}
	
	.story_m {
		color: rgba(110, 110, 110, 1);
		line-height: 21px;
		word-break: break-all;
		word-wrap: break-word;
		overflow: hidden;
		font-size: 1.2em;
		padding: 2px 0;
	}
	
	.story_time {
		color: rgba(154, 154, 154, 1);
		padding: 2px 0;
	}
	
	.story_hf {
		background: rgb(245, 245, 245);
		font-size: 1.2em;
		border: 1px solid rgba(204, 204, 204, 0.2);
		border-radius: 2px;
		color: rgba(110, 110, 110, 1);
		padding: 4px;
		margin-bottom: 5px;
	}
	
	.opbtn {
		position: absolute;
		top: 0;
		right: 0;
	}
	.deletepl{
		float: right;
		color: red;
		font-size: 12px;
		margin-top: 5px;
		cursor: pointer;
	}
	span.lou{
		padding-left: 10px;
		color: #999;
		font-size: 12px;
	}
</style>