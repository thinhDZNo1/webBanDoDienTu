<template>
  <div class="container" style="margin-top: 150px">
    <v-breadcrumbs :items="bc_items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card class="mt-8 rounded-lg">
      <v-card-title primary-title>
        {{ post.title }}
      </v-card-title>
      <v-card-text v-html="post.content" class="ml-3">
        <p>{{ post.source }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Post",
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
        {
          text: "Bài viết",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
      ],
      postId: this.$route.params.postId,
    };
  },
  mounted() {
    this.$store.dispatch("Post/GetPost", this.$route.params.postId);
  },
  computed: {
    ...mapGetters({
      post: "Post/post",
    }),
  },
  methods: {
    formatMonney(price) {
      var pricecv = price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      return pricecv;
    },
  },
};
</script>

<style>
</style>
