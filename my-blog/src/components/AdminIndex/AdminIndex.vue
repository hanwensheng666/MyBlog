<template>
	<div class="jumbotron">
	  <h1>Hello, {{user.username}}!</h1>
	  <p>欢迎进入我的博客后台管理！</p>
	</div>
</template>

<script>
	export default {
		name:"AdminIndex",
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
	}
</script>

<style>
</style>