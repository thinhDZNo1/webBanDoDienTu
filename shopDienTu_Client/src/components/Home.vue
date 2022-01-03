<template>
  <div class="container" style="margin-top: 150px">
    <v-carousel cycle height="450">
      <v-carousel-item
        v-for="(item, i) in listSlide"
        :key="i"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-img :src="'data:image/jpeg;base64,' + item.imageFile"></v-img>
      </v-carousel-item>
    </v-carousel>
    <div class="mt-4">
      <v-row>
        <v-col>
          <v-card>
            <div class="d-flex ml-4">
              <div class="my-auto card-icon">
                <v-icon class="">mdi-truck-fast</v-icon>
              </div>
              <div>
                <v-card-title primary-title class="pb-0">
                  Miễn phí vẫn chuyển
                </v-card-title>
                <v-card-text>
                  Miễn phí vận chuyển đơn hàng trên 200k
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <div class="d-flex ml-4">
              <div class="my-auto card-icon">
                <v-icon class="">mdi-handshake-outline</v-icon>
              </div>
              <div>
                <v-card-title primary-title class="pb-0">
                  Mua sắm an toàn
                </v-card-title>
                <v-card-text> Đảm bảo hàng chính hãng! </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <div class="d-flex ml-4">
              <div class="my-auto card-icon">
                <v-icon class="">mdi-phone-ring-outline</v-icon>
              </div>
              <div>
                <v-card-title primary-title class="pb-0">
                  Hỗ trợ 24/7
                </v-card-title>
                <v-card-text> Tư vấn trực tuyến </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-sheet class="mt-5 rounded-lg" elevation="2">
        <v-slide-group
          v-model="model"
          class="pa-4"
          prev-icon="mdi-arrow-left-drop-circle"
          next-icon="mdi-arrow-right-drop-circle"
          show-arrows
        >
          <v-slide-item
            v-for="(item, key) in listProductSale"
            :key="key"
            v-slot="{ active, toggle }"
          >
            <v-card
              :color="active ? 'primary' : '#f7f7f7'"
              class="ma-4 pa-6"
              height="300"
              width="210"
              @click="toggle"
            >
              <v-row class="fill-height" align="center" justify="center">
                <v-overlay
                  color="none"
                  style="top: -260px; right: -160px"
                  absolute
                >
                  <img
                    width="90"
                    src="../assets/images/pngtree-sale-icon-png-image_449310-removebg-preview.png"
                  />
                </v-overlay>
                <v-img
                  class="mt-2"
                  max-height="150"
                  max-width="200"
                  :src="'data:image/jpeg;base64,' + item.imageFile"
                ></v-img>
                <v-card-title primary-title style="height: 100px">
                  <p class="text-center" style="line-height: 1.4rem">
                    {{ item.name }}
                  </p>
                </v-card-title>
                <v-card-subtitle
                  class="text-center pb-0 font-weight-bold red--text"
                  style="font-size: 1rem"
                >
                  {{ formatMonney(item.discount) }}
                </v-card-subtitle>
                <v-card-text class="text-center text-decoration-line-through">
                  {{ formatMonney(item.price) }}
                </v-card-text>
              </v-row>
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <v-icon
                    v-if="active"
                    color="white"
                    size="48"
                    v-text="'mdi-close-circle-outline'"
                  ></v-icon>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
    <v-card class="mt-8 rounded-lg">
      <div class="d-flex justify-center">
        <v-card-title> Toàn bộ sản Phẩm </v-card-title>
      </div>
      <v-row class="mx-5 mb-10">
        <v-col cols="3" v-for="(product, key) in listProduct" :key="key">
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
              <v-btn
                fab
                right
                color="orange"
                class="white--text mb-3"
                small
                @click="addCart(product.id)"
              >
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      tab: null,
      items: ["web", "shopping", "videos", "images", "news"],
      model: null,
      cartDetail: {
        quantity: 1,
        productId: null,
        userId: null,
      },
    };
  },
  mounted() {
    this.$store.dispatch("Slide/GetAllSlide");
    this.$store.dispatch("Product/GetProductSale");
    this.$store.dispatch("Category/GetAllCategory");
    this.$store.dispatch("CategoryDetail/GetAllCD");
    this.$store.dispatch("Category/GetProductWithCategory");
    this.$store.dispatch("Product/GetAllProduct");
  },
  computed: {
    ...mapGetters({
      listSlide: "Slide/listSlide",
      listProductSale: "Product/listProductSale",
      listProduct: "Product/listProduct",
      listCategory: "Category/listCategory",
      listCD: "CategoryDetail/listCD",
      listProductWithCategory: "Category/listProductWithCategory",
      user: "User/user",
    }),
  },
  methods: {
    addCart(id) {
      if (this.user !== null) {
        this.cartDetail.userId = this.user.id;
        this.cartDetail.productId = id;
        this.$store.dispatch("CartDetail/AddCartDetail", this.cartDetail);
      } else {
        alert("Đăng nhập để mua hàng!");
      }
    },
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
.card-icon i {
  font-size: 50px !important;
}
.tab-active {
  color: white !important;
  background-color: #1976d2 !important;
}
</style>
