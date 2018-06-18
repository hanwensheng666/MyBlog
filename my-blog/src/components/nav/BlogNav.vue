<template>
	<div class="container-fluid nav-wrapper">
		<div class="row">
			<ul>
				<li @click="tabCategory('all')" :class="show_id=='all'?'active':''">首页</li>
				<li v-for="(cate,index) in cateList" :key="index" :class="show_id==cate._id?'active':''"  @click="tabCategory(cate._id)">{{cate.catename}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "BlogNav",
		data(){
			return {
				show_id:'all'
			}
		},
		computed:{
			cateList(){
				return this.$store.state.cateList;
			}
		},
		created(){
			fetch('http://localhost:8882/api/category/getAllCategory',{
//				body: JSON.stringify(this.category),
					cache: 'no-cache',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					method: 'GET',
					mode: 'cors',
			}).then(res=>{
				return res.json();
			}).then(data=>{
				if(data.code == 0){
					this.$store.commit('setCateList', data.data.cateList);
				}else{
					console.log("请求超时！请刷新页面！")
				}
			})
		},
		methods:{
			tabCategory(id){
				this.show_id = id;
				this.$emit('changetab',this.show_id);
			}
		}
	}
</script>

<style scoped>
	ul{
		list-style: none;
	}
	.clear{
		clear: both;
	}
	.nav-wrapper {
		margin-bottom: 30px;
		background: #fff;
	}
	.nav-wrapper ul {
		width: 800px;
		margin: 0 auto;
	}
	.nav-wrapper ul li {
		float: left;
		font-size: 18px;
		font-weight: 700;
		padding: 10px 10px;
		margin-right: 14px;
		box-sizing: border-box;
		cursor: pointer;
	}
	.nav-wrapper ul li.active {
		border-bottom: 3px solid #D43F3A;
	}
	.nav-wrapper ul li:hover {
		border-bottom: 3px solid #D43F3A;
	}
</style>