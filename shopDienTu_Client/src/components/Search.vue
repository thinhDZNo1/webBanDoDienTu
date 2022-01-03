<template>
  <div class="container" style="margin-top: 150px">
    <v-card class="mt-8 rounded-lg">
      <div class="d-flex justify-space-between">
        <v-card-title> Tìm kiếm cho : {{ keyWord }} </v-card-title>
        <div style="width: 400px" class="mt-5">
          <v-slider
            v-model="length"
            color="red darken-4"
            min="1000000"
            max="50000000"
            :label="'Xem theo giá: ' + formatMonney(length)"
          ></v-slider>
        </div>
      </div>
      <div class="mx-5 mb-10 d-flex">
        <div v-for="(product, key) in listProductSearch" :key="key">
          <div class="mx-5" style="width: 240px" v-if="product.price <= length">
            <v-card class="mt-5 pt-5 rounded-lg" color="basil">
              <div style="height: 220px">
                <v-img
                  class="mx-auto"
                  max-width="200"
                  max-height="200"
                  :src="'data:image/jpeg;base64,' + product.imageFile"
                ></v-img>
              </div>
              <v-card-title class="" style="height: 100px">
                <p
                  class="mx-auto mb-0"
                  style="line-height: 1.5rem; font-size: 16px"
                >
                  {{ product.name }}
                </p>
              </v-card-title>

              <div v-if="product.discount !== 0" style="height: 80px">
                <v-card-subtitle
                  class="text-center pb-0 font-weight-bold red--text"
                  style="font-size: 1rem"
                >
                  {{ formatMonney(product.discount) }}
                </v-card-subtitle>
                <v-card-subtitle
                  class="text-center pt-0 text-decoration-line-through"
                >
                  {{ formatMonney(product.price) }}
                </v-card-subtitle>
              </div>
              <div v-if="product.discount === 0" style="height: 80px">
                <v-card-subtitle
                  class="text-center pb-0 font-weight-bold red--text"
                  style="font-size: 1rem"
                >
                  {{ formatMonney(product.price) }}
                </v-card-subtitle>
              </div>
              <v-divider></v-divider>
              <div class="d-flex justify-center mt-3">
                <v-btn
                  fab
                  right
                  color="pink"
                  class="white--text mb-3 mr-2"
                  small
                  @click="
                    showProductDetail(
                      product.id,
                      product.categoryDetailId,
                      product.companyId
                    )
                  "
                >
                  <v-icon>mdi-magnify-expand</v-icon>
                </v-btn>
                <v-btn fab right color="orange" class="white--text mb-3" small>
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      keyWord: this.$route.params.keyWord,
      length: 25000000,
    };
  },
  mounted() {
    this.$store.dispatch("Product/Search", this.keyWord);
  },
  computed: {
    ...mapGetters({
      listProductSearch: "Product/listProductSearch",
    }),
  },
  methods: {
    showProductDetail(id, categoryDetailId, companyId) {
      this.$router.push({
        name: "Product_Detail",
        params: {
          product: { id: id, cdId: categoryDetailId, companyId: companyId },
        },
      });
    },
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
