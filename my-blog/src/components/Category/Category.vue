<template>
	<div id="Category">
		<ol class="breadcrumb">
			<li>首页</li>
			<li class="active">分类管理</li>
		</ol>
		<div class="alert alert-warning alert-dismissible" role="alert" v-if="warningMsg">
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert()"><span aria-hidden="true">&times;</span></button>
		  <strong>{{warningMsg}}</strong>
		</div>
		<div class="alert alert-success alert-dismissible" role="alert" v-if="succeedMsg">
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert()"><span aria-hidden="true">&times;</span></button>
		  <strong> {{succeedMsg}}</strong>
		</div>
		<h3>分类列表</h3>
		<form>
			<div class="form-group">
				<label for="exampleInputEmail1">分类名称</label>
				<input v-model="category.catename" type="text" class="form-control" id="exampleInputEmail1" placeholder="请输入分类名称">
			</div>
			<button @click.prevent="addCate()" class="btn btn-default">添加分类</button>
		</form>

		<table class="table table-hover table-striped">
			<thead>
				<tr>
					<th>ID</th>
					<th>分类名称</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(cate,index) in cateList" :key="index">
					<td>{{cate._id}}</td>
					<td>{{cate.catename}}</td>
					<th><a class="red-link" @click.prevent="deleteCate(cate._id)">删除</a>/<a class="red-link" @click.prevent="editCate(cate._id)">编辑</a></th>
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
		    <li :class="start==pagenum?'active':''" v-for="(pagenum,index) in pageNum" :key="index" @click="getAllCates(pagenum)"><a href="javascript:void(0)">{{pagenum}}</a></li>
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
	export default {
		name: "Category",
		data(){
			return {
				category:{
					catename:''
				},
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
			addCate(){
				fetch('http://localhost:8882/admin/category/add',{
					body: JSON.stringify(this.category),
					cache: 'no-cache',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					method: 'POST',
					mode: 'cors',
				}).then(res=>{
					return res.json();
				}).then(data=>{
					if(data.code == 0){
						this.succeedMsg = data.msg;
						this.warningMsg = '';
						this.getAllCates(1);
					}else{
						this.warningMsg = data.msg;
						this.succeedMsg = '';
					}
//					console.log(data)
				})
			},
			getAllCates(start){
				fetch('http://localhost:8882/admin/category/getAllCategory?start='+start+'&pageSize='+this.pageSize, {
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
	//					console.log(data.data.userList);
						this.$store.commit('setCateList', data.data.cateList);
						this.start = start;
					}
				})
			},
			nextPage(){
				if(this.start < this.pageNum){
					this.getAllCates(this.start+1);
				}
			},
			prevPage(){
				if(this.start > 1){
					this.getAllCates(this.start-1);
				}
			},
			deleteCate(id){
				fetch('http://localhost:8882/admin/category/delete',{
					body: JSON.stringify({
						id:id
					}),
					cache: 'no-cache',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					method: 'POST',
					mode: 'cors',
				}).then(res=>{
					return res.json();
				}).then(data=>{
					if(data.code == 0){
						this.succeedMsg = data.msg;
						this.warningMsg = '';
						this.getAllCates(1);
					}else{
						this.warningMsg = data.msg;
						this.succeedMsg = '';
					}
//					console.log(data)
				})
			},
			editCate(id){
				this.$router.push({
					path:"/CategoryEdit",
					query:{
						id:id
					}
				});
			}
		},
		computed:{
			cateList(){
				return this.$store.state.cateList;
			},
			pageNum(){
				return  Math.floor(this.count/this.pageSize)+(this.count%this.pageSize>0?1:0);
			}
		},
		created(){
			fetch('http://localhost:8882/admin/category/getCategoryCount',{
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
					this.getAllCates(1);
				}
			});
		}
	}
</script>

<style scoped>
	.red-link{
		color: #D43F3A;
		font-weight: 500;
		cursor: pointer;
	}
</style>