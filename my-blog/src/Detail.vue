<template>
	<div id="Detail">
		<app-header></app-header>
		<app-nav></app-nav>
		<div class="container">
			<div class="row">
				<app-ContentDetails></app-ContentDetails>
				<app-user></app-user>
			</div>
		</div>
	</div>
</template>

<script>
	import BlogHeader from './components/header/BlogHeader'
	import BlogNav from './components/nav/BlogNav'
	import ContentDetails from './components/ContentDetails/ContentDetails'
	import User from './components/user/User'
	export default {
		name: 'Detail',
		components: {
			'app-header': BlogHeader,
			'app-nav': BlogNav,
			'app-ContentDetails': ContentDetails,
			'app-user': User
		},
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