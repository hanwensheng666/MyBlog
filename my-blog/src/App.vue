<template>
	<div id="app">
		<app-header></app-header>
		<app-nav  @changetab="changetab"></app-nav>
		<div class="container">
			<div class="row">
				<app-article-list ref="article"></app-article-list>
				<app-user></app-user>
			</div>
		</div>
	</div>
</template>

<script>
	import BlogHeader from './components/header/BlogHeader'
	import BlogNav from './components/nav/BlogNav'
	import ArticleList from './components/article/ArticleList'
	import User from './components/user/User'
	export default {
		name: 'App',
		data(){
			return {
				top:0,
				cateId:'all'
			}
		},
		components: {
			'app-header': BlogHeader,
			'app-nav': BlogNav,
			'app-article-list': ArticleList,
			'app-user': User
		},
		methods:{
			changetab(cateId){
				this.cateId = cateId;
				this.$refs.article.$emit('changetab',this.cateId,1);
			}
		}
	}
</script>

<style>
	html,
	body {
		background: #e9f1f9;
		color: #061a2e;
	}
	ul {
		list-style: none;
	}
	
	.clear {
		clear: both;
	}
</style>