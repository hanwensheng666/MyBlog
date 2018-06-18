<template>
	<div>
		<admin-header></admin-header>
		<div class="container-fluid">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import AdminHeader from './components/AdminHeader/AdminHeader'
	export default{
		name:'Admin',
		methods:{
			getCookie(name){
				let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				if(arr = document.cookie.match(reg))
					return unescape(arr[2]);
				else
					return null;
			}
		},
		created(){
			let userInfo = JSON.parse(this.getCookie('user'));
			if(userInfo){
				//如果cookie中已经存了用户信息，则直接为登陆状态
				if(userInfo.isAdmin){
					this.$store.commit('setUser',userInfo);
				}else{
					alert("您不是管理员，不能进入管理页面");
					window.location.href='index.html';
				}
			}
		},
		components:{
			'admin-header':AdminHeader
		}
	}
</script>

<style>
	
</style>