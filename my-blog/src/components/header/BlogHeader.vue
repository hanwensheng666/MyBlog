<template>
	<div class="container-fluid blog-header">
		<div class="row">
			<div class="logo-box">
				<img src="./img/blog.png" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'BlogHeader'
	}
</script>

<style scoped>
	.blog-header{
		width: 100%;
		height: 250px;
		background: url(./img/32eaa4054704e13ef074c1e64a46c44b.jpg) center center;
		background-size: cover;
	}
	.logo-box{
		width: 180px;
		margin:90px auto;
	}
	.logo-box img{
		width: 100%;
	}
</style>