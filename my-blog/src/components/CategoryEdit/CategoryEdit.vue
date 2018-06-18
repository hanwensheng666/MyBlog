<template>
	<div id="CategoryEdit">
		<ol class="breadcrumb">
			<li @click="back()" style="cursor: pointer;"><i class="glyphicon glyphicon-chevron-left"></i>返回</li>
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
		    <input type="text" class="form-control" id="exampleInputEmail1" v-model="cate.catename">
		  </div>
		  <button type="button" @click="editCategory()" class="btn btn-default">确认修改</button>
		</form>
	</div>
</template>

<script>
	export default{
		name:"CategoryEdit",
		data(){
			return {
				cate:{
					id:'',
					catename:''
				},
				succeedMsg:'',
				warningMsg:''
			}
		},
		methods:{
			back(){
				this.$router.push("/Category");
			},
			closeAlert(){
				this.succeedMsg = '';
				this.warningMsg = '';
			},
			editCategory(){
				fetch('http://localhost:8882/admin/category/editCategory',{
					body: JSON.stringify(this.cate),
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
					}else{
						this.warningMsg = data.msg;
						this.succeedMsg = '';
					}
				})
			}
		},
		created(){
			this.cate.id = this.$route.query.id;
			fetch('http://localhost:8882/admin/category/findById',{
				body: JSON.stringify({
					id:this.cate.id
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
					this.cate.catename = data.data.catename
				}else{
					alert("请求错误");
				}
			})
		}
	}
</script>

<style>
</style>