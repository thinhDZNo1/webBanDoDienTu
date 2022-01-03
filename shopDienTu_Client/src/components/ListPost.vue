<template>
<div class="container" style="margin-top: 150px">
  <v-breadcrumbs :items="bc_items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  <v-card class="mt-8 rounded-lg">
      <div v-for="(item, key) in listPost" :key="key" >
        <v-card-title primary-title class="ml-5">
          {{item.title}}
      </v-card-title>
      <v-row  @click="showPost(item.id)">
          <v-col cols="3">
            <v-card class=" mx-auto" width="180" height="180">
              <v-img height="180" :src="'data:image/jpeg;base64,' + item.imageFile" ></v-img>
            </v-card>
          </v-col>
          <v-col class="pl-0" cols="9">
            <div ><v-card-text class="pl-0 pt-0">
              <p style="height:195px" class="overflow-hidden" v-html="item.content">
              </p>
            </v-card-text></div>
          </v-col>
        </v-row>


      <v-divider></v-divider>
      </div>
    </v-card>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Search",
  data() {
    return {
    bc_items: [
        {
          text: "Trang chủ",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Danh mục bài viết",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
      ],
      postId: null
    }
  },
   mounted() {
    this.$store.dispatch("Post/GetAllPost");
  },
  computed: {
    ...mapGetters({
      listPost: "Post/listPost",
    }),
  },
  methods: {
    showPost(id){
      this.$router.push({name: 'Post', params: {postId: id}})
    },
    formatMonney(price) {
      var pricecv = price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      return pricecv;
    },
  },
}
</script>

<style>

</style>
