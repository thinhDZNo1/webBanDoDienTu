import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/Product'
import categoryDetail from './modules/CategoryDetail'
import Category from './modules/Category'
import company from './modules/Company'
import Slide from './modules/Slide'
import Color from './modules/Color'
import Menu from './modules/Menu'
import ProductImage from './modules/ProductImages'
import auth from './modules/auth'
import User from './modules/User'
import Post from './modules/Post'
import ConfirmOrder from "./modules/ConfirmOrder"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Product: product,
    Company: company,
    Slide: Slide,
    Category: Category,
    CategoryDetail: categoryDetail,
    Color: Color,
    Menu: Menu,
    ProductImage: ProductImage,
    auth: auth,
    User: User,
    Post: Post,
    ConfirmOrder: ConfirmOrder
  },
})
