import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/Product/Index'
import Slide from '@/components/Slide/Index'
import Category from '@/components/Category/Index'
import CategoryDetail from '@/components/CategoryDetail/Index'
import Color from '@/components/Color/Index'
import Company from '@/components/Company/Index'
import Menu from '@/components/Menu/Index'
import ProductImage from '@/components/ProductImage/Index'
import User from '@/components/User/Index'
import Post from '@/components/Post/Index'
import ProductDetail from '@/components/ProductDetail/Index'
import ProductType from '@/components/ProductType/Index'
import ConfirmOrder from '@/components/ConfirmOrder/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Product',
      name: 'Product',
      component: Product
    },
    {
      path: '/Category',
      name: 'Category',
      component: Category
    },
    {
      path: '/Category-Detail',
      name: 'Category-Detail',
      component: CategoryDetail
    },
    {
      path: '/Slide',
      name: 'Slide',
      component: Slide
    },
    {
      path: '/Color',
      name: 'Color',
      component: Color
    },
    {
      path: '/Company',
      name: 'Company',
      component: Company
    },
    {
      path: '/Menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/Product-Image',
      name: 'ProductImage',
      component: ProductImage
    },
    {
      path: '/User',
      name: 'User',
      component: User
    },
    {
      path: '/Post',
      name: 'Post',
      component: Post
    },

    {
      path: '/Product-Detail',
      name: 'ProductDetail',
      component: ProductDetail
    },

    {
      path: '/Product-Type',
      name: 'ProductType',
      component: ProductType
    },
    {
      path: '/Confirm-Order',
      name: 'ConfirmOrder',
      component: ConfirmOrder
    },
  ]
})
