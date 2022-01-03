import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Product_Detail from '@/components/Product_Detail'
import Cart from '@/components/Cart'
import Search from '@/components/Search'
import ListPost from '@/components/ListPost'
import Post from '@/components/Post'
import Account from '@/components/Account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Product-Detail/:product',
      name: 'Product_Detail',
      component: Product_Detail
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/Search/:keyWord',
      name: 'Search',
      component: Search
    },
    {
      path: '/List-Post',
      name: 'ListPost',
      component: ListPost
    },
    {
      path: '/Post/:postId',
      name: 'Post',
      component: Post
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account
    }
  ]
})
