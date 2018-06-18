<template>
	<div class="col-xs-8 article">
		<!--文章列表-->
		<ul>
			<li v-for="(content,index) in contentList" :key="index">
				<div class="article-title">
					<h3>{{content.title}}</h3>
					<p>
						<span>作者：</span><span>{{content.user.username}}</span>-
						<span>时间：</span><span>{{content.addTime | time}}</span>-
						<span>阅读：</span><span>{{content.views}}</span>-
						<span>评论：</span><span>10</span>
					</p>
				</div>
				<div class="article-content">
					<p>{{content.summary}}</p>
					<button class="btn btn-info" @click="showDetail(content._id)">查看全文</button>
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
		name: "ArticleList",
		data() {
			return {
				start: 1,
				pageSize: 6,
				count: 0,
			}
		},
		methods: {
			showDetail(id){
				window.location.href='detail.html?id='+id;
			},
			getMore(){
				this.getAllContent(this.start+1);
			},
			getAllContent(start) {
				fetch('http://localhost:8882/api/content/getAllContent?start=' + start + '&pageSize=' + this.pageSize, {
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
					if(data.code == 0) {
						this.$store.commit('addContentList', data.data.contentList);
						this.start = start;
					}
				})
			},
			nextPage() {
				if(this.start < this.pageNum) {
					this.getAllContent(this.start + 1);
				}
			},
			prevPage() {
				if(this.start > 1) {
					this.getAllContent(this.start - 1);
				}
			},
			getCounts() {
				fetch('http://localhost:8882/api/content/getContentCount', {
					cache: 'no-cache',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					method: 'GET',
					mode: 'cors',
				}).then(res => {
					return res.json();
				}).then(data => {
					if(data.code == 0) {
						this.count = data.data.count;
						this.getAllContent(1);
					}
				});
			}
		},
		computed: {
			contentList() {
				return this.$store.state.contentList;
			},
			pageNum() {
				return Math.floor(this.count / this.pageSize) + (this.count % this.pageSize > 0 ? 1 : 0);
			}
		},
		created() {
			this.getCounts();
		    this.$on('changetab',function(id,start){
		    	//获取分类文章的总数
		    	fetch('http://localhost:8882/api/content/getContentCountByCatId?catId='+id, {
					cache: 'no-cache',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					method: 'GET',
					mode: 'cors',
				}).then(res => {
					return res.json();
				}).then(data => {
					if(data.code == 0) {
						this.count = data.data.count;
					}
				}).then(()=>{
					//获取分类文章
			    	fetch('http://localhost:8882/api/content/getContentByCatId?start=' + start + '&pageSize=' + this.pageSize +'&catId='+id, {
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
							this.$store.commit('setContentList', data.data.contentList);
							this.start = start;
						}
					})
				})
		    });
		}
	}
</script>

<style>
	ul {
		list-style: none;
	}
	
	.clear {
		clear: both;
	}
	
	.article {
		margin-right: 30px;
		box-sizing: border-box;
	}
	
	.article ul li {
		padding: 20px 30px;
		background: #fff;
		margin-bottom: 25px;
	}
	
	.user-wrapper {
		padding: 10px;
		box-sizing: border-box;
	}
	
	.article-title {
		text-align: center;
	}
	
	.article-title h3 {
		font-size: 32px;
		font-weight: bold;
	}
	
	.article-title p span:nth-of-type(2n) {
		color: #2572bd;
		margin-right: 10px;
	}
	
	.article-content p {
		color: #8fbdeb;
	}
	ul li.no-bg{
		background: none;
		padding: 0;
	}
</style>