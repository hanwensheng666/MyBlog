<template>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">My Blog后台管理系统</a>
			</div>

			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<router-link tag="li" :to="{name:'AdminIndex'}">
						<a href="javascript:void(0)">首页</a>
					</router-link>
					<router-link tag="li" :to="{name:'UserManager'}">
						<a href="javascript:void(0)">用户管理</a>
					</router-link>
					<router-link tag="li" :to="{name:'Category'}">
						<a href="javascript:void(0)">分类管理</a>
					</router-link>
					<router-link tag="li" :to="{name:'ContentManager'}">
						<a href="javascript:void(0)">文章管理</a>
					</router-link>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li>
						<a href="#" role="button" aria-haspopup="true" aria-expanded="false">{{user.username}}</a>
					</li>
					<li>
						<a href="index.html" role="button" aria-haspopup="true" aria-expanded="false">退出</a>
					</li>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>
</template>

<script>
	export default {
		name:"AdminHeader",
		data(){
			return {
				
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		}
	}
</script>

<style>

</style>