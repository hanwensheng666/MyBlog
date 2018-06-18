<template>
	<div id="ContentManager">
		<ol class="breadcrumb">
			<li>首页</li>
			<li class="active">文章管理</li>
			<li class="right btn-group btn-group-xs">
				<button class="btn btn-success" @click="addContent()">添加文章</button>
			</li>
		</ol>
		<div class="alert alert-warning alert-dismissible" role="alert" v-if="warningMsg">
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert()"><span aria-hidden="true">&times;</span></button>
		  <strong>{{warningMsg}}</strong>
		</div>
		<div class="alert alert-success alert-dismissible" role="alert" v-if="succeedMsg">
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert()"><span aria-hidden="true">&times;</span></button>
		  <strong> {{succeedMsg}}</strong>
		</div>
		<h3>文章列表</h3>
		<table class="table table-hover table-striped">
			<thead>
				<tr>
					<th>ID</th>
					<th>文章标题</th>
					<th>文章类别</th>
					<th>作者</th>
					<th>点击量</th>
					<th>时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(content,index) in contentList" :key="index">
					<td>{{content._id}}</td>
					<td>{{content.title}}</td>
					<td>{{content.category.catename}}</td>
					<td>{{content.user.username}}</td>
					<td>{{content.views}}</td>
					<td>{{content.addTime | time}}</td><!--admin.js中定义了这个过滤器-->
					<td><a @click="EditContent(content)">编辑</a>/<a @click="DeleteContent(content._id)">删除</a></td>
				</tr>
			</tbody>
		</table>
		<nav aria-label="Page navigation" class="text-center">
		  <ul class="pagination">
		    <li  :class="start==1?'disable':''"  @click="prevPage()">
		      <a href="#" aria-label="Previous">
		        <span aria-hidden="true">&laquo;</span>
		      </a>
		    </li>
		    <li :class="start==pagenum?'active':''" v-for="(pagenum,index) in pageNum" :key="index" @click="getAllContent(pagenum)"><a href="javascript:void(0)">{{pagenum}}</a></li>
		    <li :class="start==pageNum?'disable':''" @click="nextPage()">
		      <a href="#" aria-label="Next">
		        <span aria-hidden="true">&raquo;</span>
		      </a>
		    </li>
		  </ul>
		</nav>
		
	</div>
</template>

<script>
	export default{
		name:"ContentManager",
		data(){
			return {
				succeedMsg:'',
				warningMsg:'',
				start:1,
				pageSize:6,
				count:0,
			}
		},
		methods:{
			closeAlert(){
				this.succeedMsg = '';
				this.warningMsg = '';
			},
			EditContent(content){
				this.$router.push({
					path:"/EditContent",
					query:{
						content:JSON.stringify(content)
					}
				});
			},
			DeleteContent(id){
				fetch('http://localhost:8882/admin/content/deleteContent', {
					body: JSON.stringify({'id':id}),
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
					if(data.code == 0){
						this.succeedMsg = data.msg;
						this.warningMsg = '';
						getAllContent(1);
					}else{
						this.warningMsg = data.msg;
						this.succeedMsg = '';
					}
				})
			},
			addContent(){
				this.$router.push("/AddContent");
			},
			getAllContent(start){
				fetch('http://localhost:8882/admin/content/getAllContent?start='+start+'&pageSize='+this.pageSize, {
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
						this.$store.commit('setContentList', data.data.contentList);
						this.start = start;
					}
				})
			},
			nextPage(){
				if(this.start < this.pageNum){
					this.getAllContent(this.start+1);
				}
			},
			prevPage(){
				if(this.start > 1){
					this.getAllContent(this.start-1);
				}
			},
			getCounts(){
				fetch('http://localhost:8882/admin/content/getContentCount',{
					cache: 'no-cache',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					method: 'GET',
					mode: 'cors',
				}).then(res=>{
					return res.json();
				}).then(data=>{
					if(data.code == 0) {
						this.count = data.data.count;
						this.getAllContent(1);
					}
				});
			}
		},
		computed:{
			contentList(){
				return this.$store.state.contentList;
			},
			pageNum(){
				return  Math.floor(this.count/this.pageSize)+(this.count%this.pageSize>0?1:0);
			}
		},
		created(){
			this.getCounts();
		}
	}
</script>

<style scoped>
	li.right{
		float: right;
	}
	li.right:before{
		content: "";
	}
	a{
		cursor: pointer;
	}
</style>