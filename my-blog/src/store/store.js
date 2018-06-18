import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const store = new Vuex.Store({
	state:{
		user:{},
		cateList:[],
		contentList:[],
		userList:[],
		cateList:[],
	},
	getters:{
		
	},
	mutations:{
		setUser:(state,data)=>{
			state.user = data;
		},
		quitLogin:(state)=>{
			state.user = {};
		},
		setCateList:(state,list)=>{
			state.cateList = [];
			list.forEach(cate=>{
				state.cateList.push(cate);
			})
		},
		addContentList:(state,list)=>{
			list.forEach(content=>{
				state.contentList.push(content);
			})
		},
		setContentList:(state,list)=>{
			state.contentList = [];
			list.forEach(content=>{
				state.contentList.push(content);
			})
		},
		setUserList:(state,data)=>{
			state.userList = [];
			data.forEach(user=>{
				state.userList.push(user);
			})
		},
	},
	actions:{
		
	}
})