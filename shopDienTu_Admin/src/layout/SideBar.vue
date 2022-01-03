<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-sheet color="grey lighten-4" class="pa-4">
      <v-avatar class="mb-4 ml-16"  color="grey darken-1" size="64">
        <v-img :src="'data:image/jpeg;base64,' + user.imageFile" alt=""></v-img>
      </v-avatar>
      <div class="text-center"><p>{{user.name}}</p></div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="(item, key) in links" :key="key">
        <router-link :to="item.link" class="d-flex text-decoration-none">
          <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",
  data(){
    return{
      links: [
      {icon: "mdi-view-dashboard-outline", text: "Dashboard", link: "/"},
      {icon: "mdi-account-multiple",text: "Tài khoản", link:"/User"},
      {icon: "mdi-devices",text: "Sản phẩm", link:"/Product"},
      {icon: "mdi-chili-medium-outline",text: "Loại sản phẩm", link:"/Product-Type"},
      {icon: "mdi-magnify-minus-outline",text: "Chi tiết sản phẩm", link:"/Product-Detail"},
      {icon: "mdi-devices",text: "Ảnh mô tả sản phẩm", link:"/Product-Image"},
      {icon: "mdi-post-outline", text:"Bài viết",link:"/Post"},
      {icon: "mdi-pinwheel-outline", text:"Slide",link:"/Slide"},
      {icon: "mdi-menu", text:"Menu",link:"/Menu"},
      {icon: "mdi-shape-outline", text:"Danh mục",link:"/Category"},
      {icon: "mdi-details", text:"Danh mục chi tiết",link:"/Category-Detail"},
      {icon: "mdi-domain", text:"Thương hiệu",link:"/Company"},
      {icon: "mdi-palette", text:"Màu sản phẩm",link:"/Color"},
      {icon: "mdi-pinwheel-outline", text:"Đơn hàng",link:"/Confirm-Order"},
    ],
    user: {
      name: "",
      imageFile : "",
    }
    }
  },
  props: ['drawer', 'loginuser'],
   watch: {
     loginuser: function(){
       this.user.name = this.loginuser.userName;
       this.user.imageFile = this.loginuser.imageFile
     }
   }
};
</script>

<style>
</style>
