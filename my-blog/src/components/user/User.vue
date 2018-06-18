<template>
	<div class="col-xs-3 user-wrapper">
		<!--用户操作-->
		<!--管理员用户登录的信息-->
		<div class="user" id="admin-info" v-if="showtable=='ADMIN'">
			<div class="user-header">
				<h3>用户信息</h3></div>
			<p>{{user.username}}</p>
			<p>你好，尊敬的管理员!
				<a href="admin.html">您可以点击这里进入管理</a>
			</p>
			<button class="btn btn-danger" @click="quitLogin()">退出</button>
		</div>
		<!--普通用户登录的信息-->
		<div class="user" id="user-info" v-if="showtable=='USER'">
			<div class="user-header">
				<h3>用户信息</h3></div>
			<p>游客</p>
			<p>你好，尊敬的{{user.username}}！</p>
			<button class="btn btn-danger" @click="quitLogin()">退出</button>
		</div>
		<!--用户登录-->
		<div class="user" id="login" v-if="showtable=='LOGIN'">
			<div class="user-header">
				<h3>登陆</h3>
			</div>
			<div class="input-box">
				<label for="text">用户名:</label>
				<input type="text" v-model="userLogin.username" />
			</div>
			<div class="input-box">
				<label for="password">密码:</label>
				<input type="password" v-model="userLogin.password" />
			</div>
			<div class="user-link">
				<span><a href="javascript:void(0)" @click="tabToRegist()">新用户注册</a></span>
				<span><a href="javascript:void(0)">忘记密码</a></span>
			</div>
			<button class="btn btn-block btn-warning" id="login-btn" @click="login()">登陆</button>
		</div>
		<!--用户注册-->
		<div class="user" id="regist" v-if="showtable=='REGIST'">
			<div class="user-header">
				<h3>注册</h3></div>
			<div class="input-box">
				<label for="text">用户名:</label>
				<input type="text" v-model="userRegist.username" />
			</div>
			<div class="input-box">
				<label for="password">密码:</label>
				<input type="password" v-model="userRegist.password" />
			</div>
			<div class="input-box">
				<label for="password">确认密码:</label>
				<input type="password" v-model="userRegist.repassword" />
			</div>
			<div class="user-link">
				<span></span>
				<span>已有账号？<a @click="tabToLogin()" href="javascript:void(0)">马上登陆</a></span>
			</div>
			<button class="btn btn-block btn-warning" id="regist-btn" @click="regist()">注册</button>
		</div>
		<div class="user" v-show="top>1000">
			<button class="btn btn-block btn-success" @click="backToTop()">返回顶部<i class="glyphicon glyphicon-arrow-up"></i></button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "User",
		data() {
			return {
				userLogin: {
					username: '',
					password: '',
				},
				userRegist: {
					username: '',
					password: ''
				},
				showtable: 'LOGIN',
				top:0
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		methods: {
			tabToRegist() {
				this.showtable = 'REGIST'
			},
			tabToLogin() {
				this.showtable = 'LOGIN'
			},
			regist() {
				fetch('http://localhost:8882/api/user/register', {
						body: JSON.stringify(this.userRegist),
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
						alert(data.msg);
						if(data.code == 0) {
							this.showtable = 'LOGIN'
						}
					})
			},
			login() {
				fetch('http://localhost:8882/api/user/login', {
						body: JSON.stringify(this.userLogin),
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
						alert(data.msg);
						if(data.code == 0) {
							this.$store.commit('setUser', data.data);
							//将用户信息保存到cookie
							this.setCookie('user',data.data);
							if(data.data.isAdmin){
								this.showtable = 'ADMIN';
							}else{
								this.showtable = 'USER'
							}
						}
					})
			},
			quitLogin() {
				this.$store.commit('quitLogin');
				this.delCookie('user');
				this.showtable = 'LOGIN'
			},
			getCookie(name){
				let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				if(arr = document.cookie.match(reg))
					return unescape(arr[2]);
				else
					return null;
			},
			setCookie(key,val){
				let date = new Date();
				let expiresDays = 10; //设置过期天数
				date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //10天后cookie过期
				document.cookie = key+"=" + escape(JSON.stringify(val)) + "; expires=" + date.toGMTString() + ";path=/";
			},
			delCookie(name){
				let exp = new Date();
				exp.setTime(exp.getTime() - 1);
				let cval=this.getCookie(name);
				if(cval!=null)
				document.cookie= name + "="+cval+";expires="+exp.toGMTString();
			},
			handleScroll(){
				let scrollNode = document.getElementsByClassName("user-wrapper")[0];
				scrollNode.style.marginTop = '0px';
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
 				this.top = scrollTop;
 				if(this.top>326){
					scrollNode.style.marginTop = parseInt(scrollNode.style.marginTop)+(this.top-300)+'px';
				}
			},
			backToTop(){
				document.documentElement.scrollTop = "0px";
				document.body.scrollTop = "0px";
			}
		},
		created(){
			let userInfo = JSON.parse(this.getCookie('user'));
			if(userInfo){
				//如果cookie中已经存了用户信息，则直接为登陆状态
				this.$store.commit('setUser',userInfo);
				if(userInfo.isAdmin){
					this.showtable = 'ADMIN';
				}else{
					this.showtable = 'USER'
				}
			}
		},
		mounted () {
		    window.addEventListener('scroll', this.handleScroll);
		},
		destroyed () {
		  	window.removeEventListener('scroll', this.handleScroll)
		}
	}
</script>

<style scoped>
	.user-wrapper {
		padding: 0;
	}
	
	.user-wrapper .user {
		background: #fff;
		padding: 10px 15px;
		margin-bottom: 20px;
		box-sizing: border-box;
	}
	
	.user-wrapper .user .user-header {
		border-bottom: 1px solid #ccc;
	}
	
	.user-wrapper .user p:nth-of-type(1) {
		margin-top: 10px;
	}
	
	.user-wrapper .user p:nth-of-type(2) {
		font-size: 12px;
	}
	
	.input-box {
		margin: 8px 0;
	}
	
	.input-box label {
		width: 80px;
		text-align: center;
		font-size: 14px;
		font-weight: 600;
	}
	
	.input-box input {
		padding-left: 10px;
	}
	
	.user-link {
		font-size: 12px;
		height: 20px;
		padding: 0 5px 5px 5px;
	}
	
	.user-link span:nth-of-type(1) {
		float: left;
	}
	
	.user-link span:nth-of-type(2) {
		float: right;
	}
	
	.user-link a {
		color: #D9534F;
	}
</style>