import Vue from 'vue'
import Vuex from 'vuex'
import Product from './modules/Product'
import Slide from './modules/Slide'
import Category from './modules/Category'
import CategoryDetail from './modules/CategoryDetail'
import Menu from './modules/Menu'
import Post from './modules/Post'
import CartDetail from './modules/CartDetail'
import User from './modules/User'
import ProductImage from './modules/ProductImages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Product: Product,
    Slide: Slide,
    Category: Category,
    CategoryDetail: CategoryDetail,
    Menu: Menu,
    Post: Post,
    User: User,
    CartDetail: CartDetail,
    ProductImage: ProductImage,
  },
})
