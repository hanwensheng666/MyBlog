<template>
	<div id="user-manager">
		<ol class="breadcrumb">
		  <li>首页</li>
		  <li class="active">用户管理</li>
		</ol>
		<h3>用户列表</h3>
		<table class="table table-hover table-striped">
			<thead>
				<tr>
					<th>ID</th>
					<th>用户名</th>
					<th>密码</th>
					<th>管理员</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(user,index) in userList" :key="index">
					<td>{{user._id}}</td>
					<td>{{user.username}}</td>
					<td>{{user.password}}</td>
					<td>{{user.isAdmin?'是':' '}}</td>
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
		    <li :class="start==pagenum?'active':''" v-for="(pagenum,index) in pageNum" :key="index" @click="getAllUsers(pagenum)"><a href="javascript:void(0)">{{pagenum}}</a></li>
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
		name:"UserManager",
		data(){
			return{
				start:1,
				pageSize:6,
				count:0,
			}
		},
		methods:{
			getAllUsers(start){
				fetch('http://localhost:8882/admin/user/getAllUser?start='+start+'&pageSize='+this.pageSize, {
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
						this.$store.commit('setUserList', data.data.userList);
						this.start = start;
					}
				})
			},
			nextPage(){
				if(this.start < this.pageNum){
					this.getAllUsers(this.start+1);
				}
			},
			prevPage(){
				if(this.start > 1){
					this.getAllUsers(this.start-1);
				}
			}
		},
		computed:{
			userList(){
				return this.$store.state.userList;
			},
			pageNum(){
				return  Math.floor(this.count/this.pageSize)+(this.count%this.pageSize>0?1:0);
			}
		},
		created(){
			fetch('http://localhost:8882/admin/user/getUserCount',{
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
					this.getAllUsers(1);
				}
			});
		}
	}
</script>

<style scoped>
	/*.table{
		background: #f5f5f5;
		text-align: center;
		margin: 0 auto;
	}
	.table tr{
		text-align: center;
		border-bottom: 1px solid #eee;
		padding:30px 0;
	}
	.table tr th {
		text-align: center;
	}*/
</style>