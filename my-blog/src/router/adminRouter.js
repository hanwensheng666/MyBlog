import Vue from 'vue'
import Router from 'vue-router'
import AdminIndex from '@/components/AdminIndex/AdminIndex'
import UserManager from '@/components/UserManager/UserManager'
import Category from '@/components/Category/Category'
import CategoryEdit from '@/components/CategoryEdit/CategoryEdit'
import ContentManager from '@/components/ContentManager/ContentManager'
import AddContent from '@/components/AddContent/AddContent'
import ContentEdit from '@/components/ContentEdit/ContentEdit'
import EditContent from '@/components/EditContent/EditContent'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/AdminIndex',
      name: 'AdminIndex',
      component: AdminIndex
    },
    {
      path: '/UserManager',
      name: 'UserManager',
      component: UserManager
    },
    {
    	path: '/Category',
      name: 'Category',
      component: Category
    },
    {
    	path: '/CategoryEdit',
      name: 'CategoryEdit',
      component: CategoryEdit
    },
    {
    	path: '/ContentManager',
      name: 'ContentManager',
      component: ContentManager
    },
    {
    	path: '/AddContent',
      name: 'AddContent',
      component: AddContent
    },
    {
    	path: '/ContentEdit',
      name: 'ContentEdit',
      component: ContentEdit
    },
    {
    	path: '/EditContent',
      name: 'EditContent',
      component: EditContent
    },
    {path:"*",redirect:"/AdminIndex"}//如果以上都没有匹配到，跳转到跟路径
  ],
//mode:'history',
  linkActiveClass: 'active'
})
