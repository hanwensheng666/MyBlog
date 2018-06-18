<template>
	<div id="EditContent">
		<ol class="breadcrumb">
			<li @click="back()" style="cursor: pointer;"><i class="glyphicon glyphicon-chevron-left"></i>返回</li>
			<li>修改文章</li>
		</ol>
		<div class="alert alert-warning alert-dismissible" role="alert" v-if="warningMsg">
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert()"><span aria-hidden="true">&times;</span></button>
		  <strong>{{warningMsg}}</strong>
		</div>
		<div class="alert alert-success alert-dismissible" role="alert" v-if="succeedMsg">
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert()"><span aria-hidden="true">&times;</span></button>
		  <strong> {{succeedMsg}}</strong>
		</div>
		<form class="form-horizontal">
		  <div class="form-group">
		    <label class="col-sm-2 control-label">文章标题</label>
		    <div class="col-sm-7">
		      <input type="text" v-model="content.title" class="form-control"placeholder="请输入文章标题">
		    </div>
		  </div>
		  <div class="form-group">
		    <label class="col-sm-2 control-label">文章分类</label>
		    <div class="col-sm-7">
		      <select  class="form-control" name="category" v-model="content.cateId">
				 <option v-for="(cate,index) in cateList" :key="index" :value="cate._id">{{cate.catename}}</option>		
			  </select>
		    </div>
		  </div>
		  <div class="form-group">
		    <label class="col-sm-2 control-label">文章简介</label>
		    <div class="col-sm-7">
		      <input type="text" v-model="content.summary" class="form-control"  placeholder="请输入文章标题">
		    </div>
		  </div>
		   <div class="form-group">
		    <label  class="col-sm-2 control-label">文章内容</label>
		    <div class="col-sm-7" >
		     <textarea  v-model="content.contentText" class="form-control" rows="3"></textarea>
		    </div>
		  </div>
		  <div class="form-group">
		    <div class="col-sm-offset-2 col-sm-10">
		      <button type="button" class="btn btn-default" @click="EditContent()">确认修改</button>
		    </div>
		  </div>
		</form>
	</div>
</template>

<script>
	export default{
		name:"EditContent",
		data(){
			return {
				succeedMsg:'',
				warningMsg:'',
				cateList:[],
				content:{
					_id:'',
					title:'',
					cateId:'',
					summary:'',
					contentText:''
				}
			}
		},
		methods:{
			back(){
				this.$router.push('/ContentManager');
			},
			closeAlert(){
				this.succeedMsg = '';
				this.warningMsg = '';
			},
			EditContent(){
				fetch('http://localhost:8882/admin/content/edit',{
					body: JSON.stringify(this.content),
					cache: 'no-cache',
					//					credentials: 'same-origin',
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
			},
			getAllCate(){
				fetch('http://localhost:8882/admin/category/getAllCategory',{
					cache: 'no-cache',
					//					credentials: 'same-origin',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					method: 'GET',
					mode: 'cors',
				}).then(res=>{
					return res.json();
				}).then(data=>{
					this.cateList = data.data.cateList;
				})
			}
		},
		created(){
			this.getAllCate();
			let con = JSON.parse(this.$route.query.content);
			this.content = {
				_id:con._id,
				title:con.title,
				cateId:con.category._id,
				summary:con.summary,
				contentText:con.contentText
			}
		}
	}
</script>

<style>
</style>