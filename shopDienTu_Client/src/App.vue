<template>
  <v-app>
    <Header/>
    <ChatBox/>
    <router-view/>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './layout/Header.vue'
import ChatBox from './layout/ChatBox.vue'
import Footer from './layout/Footer.vue'
export default {
  components: { Header, Footer, ChatBox },
  name: 'App'
}
</script>

<style>
</style>
