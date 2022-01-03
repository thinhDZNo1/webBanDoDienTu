<template>
  <div class="container" style="margin-top: 130px">
    <v-breadcrumbs :items="bc_items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card>
      <v-row>
        <v-col cols="6">
          <v-card
            width="500"
            align="center"
            justify="center"
            class="py-5 ml-10"
          >
            <v-img
              max-width="450"
              :src="'data:image/jpeg;base64,' + product.imageFile"
            ></v-img>
          </v-card>
          <v-sheet class="ml-10 rounded-lg mt-3" elevation="2" max-width="500">
            <v-slide-group v-model="model" active-class="success" show-arrows>
              <v-slide-item
                v-for="(item, key) in listProductImage"
                :key="key"
                v-slot="{ active, toggle }"
              >
                <v-card
                  :color="active ? undefined : 'grey lighten-1'"
                  class="ma-2"
                  height="100"
                  width="100"
                  @click="toggle"
                >
                  <v-img :src="'data:image/jpeg;base64,' + item.imageFile" v-if="item.productId === product.id">

                  </v-img>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
        <v-col>
          <v-card-title primary-title style="font-size: 25px" class="pl-0 pb-0">
            {{ product.name }}
          </v-card-title>
          <div class="d-flex sub_title ml-5">
            <p>(<a href="">4.7</a>)</p>
            <v-rating
              small
              readonly
              v-model="rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$ratingFull"
              half-increments
              hover
              large
            ></v-rating>
            <span> | </span>
            <p>
              <a href="">92</a>
              Đánh giá
            </p>
            <span> | </span>
            <p>
              <a href="">36</a>
              Đã bán
            </p>
          </div>

          <v-card-text class="pl-0 pt-0" v-html="product.shortDescription">

          </v-card-text>
          <v-divider class="mr-10"></v-divider>
          <div class="d-flex">
            <p class="mt-4">Giá:</p>
            <v-card-subtitle
              class="font-weight-bold price_product"
              v-if="product.discount !== 0"
            >
              <span>{{ formatMonney(product.discount) }}</span>
              <span>{{ formatMonney(product.price) }}</span>
            </v-card-subtitle>
            <v-card-subtitle
              class="font-weight-bold price_product"
              v-if="product.discount === 0"
            >
              <span></span>
              <span>{{ formatMonney(product.price) }}</span>
            </v-card-subtitle>
          </div>
          <div class="d-flex">
            <p class="mt-2 mr-5">Số lượng:</p>
            <div class="d-flex numberic_box px-1" outlined>
              <v-btn class="my-auto" icon @click="minus">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-text-field
              v-model="quantity"
                class="rounded-0 mx-1"
                dense
                disabled
                value="1"
                outlined
              ></v-text-field>
              <v-btn icon class="my-auto" @click="plus">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>
          <div>
            <v-btn color="pink" large dark width="180" >
              <v-icon>mdi-cart-plus</v-icon>
              <span>Mua ngay</span>
            </v-btn>
            <v-btn color="primary" large width="180" class="ml-3">
              <v-icon>mdi-cart-plus</v-icon>
              <span>Thêm giỏ hàng</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-row class="mt-5">
      <v-col cols="8">
        <v-card class="rounded-lg">
          <v-tabs v-model="tab">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab> Mô tả </v-tab>
            <v-tab> đánh giá </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card-title primary-title class="pb-0">
                <p>Mô tả sản phẩm {{ product.name }}</p>
              </v-card-title>
              <v-card-text class="pt-0 px-5" v-html="product.description">
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card>
                <v-divider></v-divider>
                <v-sheet class="d-flex toolbar-review">
                  <p style="color: #a9a9a9">200 đánh giá</p>
                  <v-spacer></v-spacer>
                  <div class="d-flex">
                    <p style="color: #a9a9a9">
                      <v-icon>mdi-sort</v-icon> <span>Sắp xếp:</span>
                    </p>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <p v-bind="attrs" v-on="on">Gần đây</p>
                      </template>
                      <v-list>
                        <v-list-item v-for="(item, key) in listSort" :key="key">
                          <v-list-item-title>{{
                            item.title
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <p style="color: #a9a9a9" class="ml-4">
                      <v-icon>mdi-filter-outline</v-icon> <span>Lọc:</span>
                    </p>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <p v-bind="attrs" v-on="on">Tất cả</p>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(item, key) in listFilter"
                          :key="key"
                        >
                          <v-list-item-title>{{
                            item.title
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </v-sheet>
                <v-divider></v-divider>
                <div>
                  <div class="d-flex justify-space-between">
                    <div class="mt-3 d-flex">
                      <v-img
                        class="rounded-circle mx-auto ml-3 mr-3"
                        height="50"
                        width="50"
                        src="https://picsum.photos/id/11/500/300"
                      ></v-img>
                      <div>
                        <v-card-title
                          primary-title
                          style="font-size: 16px; line-height: 1rem !important"
                          class="pb-0 pl-0 pt-1"
                        >
                          ThinhTran098o
                        </v-card-title>
                        <div class="rating">
                          <v-rating
                            small
                            value="5"
                            readonly
                            color="#f8b230"
                          ></v-rating>
                        </div>
                      </div>
                    </div>

                    <v-card-title
                      primary-title
                      style="
                        font-size: 12px;
                        line-height: 1rem !important;
                        color: #a9a9a9;
                        font-weight: normal !important;
                      "
                      class="pl-0"
                    >
                      4 tuần trước
                    </v-card-title>
                  </div>

                  <v-card-text class="pl-16 pt-0">
                    Rất đẹp
                  </v-card-text>
                  <div class="d-flex comment-pro justify-space-between">
                    <div>
                      <v-btn icon>
                        <v-icon>mdi-thumb-up</v-icon>
                      </v-btn>
                      <span class="numberperlike">30</span>
                      <v-btn icon>
                        <v-icon>mdi-thumb-down</v-icon>
                      </v-btn>
                      <span class="numberperlike">30</span>
                      <v-btn icon>
                        <v-icon>mdi-flag-variant</v-icon>
                      </v-btn>
                    </div>
                    <div class="d-flex">
                      <p>Loại:</p>
                      <p>Màu:</p>
                    </div>
                  </div>
                </div>
                <v-divider></v-divider>
                <div>
                  <div class="d-flex justify-space-between">
                    <div class="mt-3 d-flex">
                      <v-img
                        class="rounded-circle mx-auto ml-3 mr-3"
                        height="50"
                        width="50"
                        src="https://picsum.photos/id/11/500/300"
                      ></v-img>
                      <div>
                        <v-card-title
                          primary-title
                          style="font-size: 16px; line-height: 1rem !important"
                          class="pb-0 pl-0 pt-1"
                        >
                          ThinhTran098o
                        </v-card-title>
                        <div class="rating">
                          <v-rating
                            small
                            value="5"
                            readonly
                            color="#f8b230"
                          ></v-rating>
                        </div>
                      </div>
                    </div>

                    <v-card-title
                      primary-title
                      style="
                        font-size: 12px;
                        line-height: 1rem !important;
                        color: #a9a9a9;
                        font-weight: normal !important;
                      "
                      class="pl-0"
                    >
                      4 tuần trước
                    </v-card-title>
                  </div>

                  <v-card-text class="pl-16 pt-0">
                    Sản phẩm tốt
                  </v-card-text>
                  <div class="d-flex comment-pro justify-space-between">
                    <div>
                      <v-btn icon>
                        <v-icon>mdi-thumb-up</v-icon>
                      </v-btn>
                      <span class="numberperlike">30</span>
                      <v-btn icon>
                        <v-icon>mdi-thumb-down</v-icon>
                      </v-btn>
                      <span class="numberperlike">30</span>
                      <v-btn icon>
                        <v-icon>mdi-flag-variant</v-icon>
                      </v-btn>
                    </div>
                    <div class="d-flex">
                      <p>Loại:</p>
                      <p>Màu:</p>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title primary-title class="pb-0">
            <p>Thông số kỹ thuật</p>
          </v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <tbody class="table-striped">
                <tr v-for="item in desserts" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="rounded-lg" elevation="5">
          <v-card-title primary-title class="pb-0 ml-5">
            Sản phẩm tương tự
          </v-card-title>
          <v-sheet elevation="0">
            <v-slide-group
              v-model="model"
              class="px-4 pb-0"
              prev-icon="mdi-arrow-left-drop-circle"
              next-icon="mdi-arrow-right-drop-circle"
              show-arrows
            >
              <v-slide-item
                v-for="(item, key) in listProductLikeSame"
                :key="key"
                v-slot="{ active, toggle }"
              >
                <v-card
                  :color="active ? 'primary' : '#f7f7f7'"
                  class="ma-4 pa-6"
                  height="350"
                  width="210"
                  @click="toggle"
                >
                  <v-row class="fill-height" align="center" justify="center">
                    <v-overlay
                      color="none"
                      style="top: -260px; right: -160px"
                      absolute
                    >
                    </v-overlay>
                    <div style="height: 180px" >
                      <v-img
                        class="mt-2"
                        max-width="150"
                        :src="'data:image/jpeg;base64,' + item.imageFile"
                      >
                      </v-img>
                    </div>
                    <v-card-title primary-title style="height: 100px">
                      <p
                        class="text-center"
                        style="line-height: 1.4rem; font-size: 18px"
                      >
                        {{ item.name }}
                      </p>
                    </v-card-title>
                    <div v-if="item.discount !== 0">
                      <v-card-subtitle
                        class="
                          text-center
                          pb-0
                          font-weight-bold
                          text-decoration-line-through
                          red--text
                        "
                        style="font-size: 1rem"
                      >
                        {{ formatMonney(item.discount) }}
                      </v-card-subtitle>
                      <v-card-text class="text-center">
                        {{ formatMonney(item.price) }}
                      </v-card-text>
                    </div>
                    <div v-if="item.discount === 0">
                      <v-card-subtitle
                        class="
                          text-center
                          pb-0
                          font-weight-bold
                          text-decoration-line-through
                          red--text
                        "
                        style="font-size: 1rem"
                      >
                        {{ formatMonney(item.price) }}
                      </v-card-subtitle>
                    </div>
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
        </v-card>
      </v-col>
      <v-col>
        <v-card class="rounded-lg" elevation="5">
          <v-card-title primary-title class="pb-0 ml-5">
            Sản phẩm giảm giá
          </v-card-title>
          <v-sheet elevation="0">
            <v-slide-group
              v-model="model"
              class="px-4 pb-0"
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
                  height="350"
                  width="210"
                  @click="toggle"
                >
                  <v-row class="fill-height" align="center" justify="center">
                    <v-overlay
                      color="none"
                      style="top: -260px; right: -160px"
                      absolute
                    >
                      <img width="90" src="../assets/images/flash_sale.png" />
                    </v-overlay>
                    <div style="height: 180px" >
                      <v-img
                        class="mt-2"
                        max-width="150"
                        :src="'data:image/jpeg;base64,' + item.imageFile"
                      >
                      </v-img>
                    </div>
                    <v-card-title primary-title style="height: 100px">
                      <p
                        class="text-center"
                        style="line-height: 1.4rem; font-size: 18px"
                      >
                        {{ item.name }}
                      </p>
                    </v-card-title>
                    <div v-if="item.discount !== 0">
                      <v-card-subtitle
                        class="
                          text-center
                          pb-0
                          font-weight-bold
                          text-decoration-line-through
                          red--text
                        "
                        style="font-size: 1rem"
                      >
                        {{ formatMonney(item.discount) }}
                      </v-card-subtitle>
                      <v-card-text class="text-center">
                        {{ formatMonney(item.price) }}
                      </v-card-text>
                    </div>
                    <div v-if="item.discount === 0">
                      <v-card-subtitle
                        class="
                          text-center
                          pb-0
                          font-weight-bold
                          text-decoration-line-through
                          red--text
                        "
                        style="font-size: 1rem"
                      >
                        {{ formatMonney(item.price) }}
                      </v-card-subtitle>
                    </div>
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
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Product_Detail",
  data() {
    return {
      bc_items: [
        {
          text: "Trang chủ",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Sản phẩm",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
      ],
      model: null,
      rating: 4.5,
      tab: null,
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
      quantity: 1,
      listSort: [
        { title: "Liên quan" },
        { title: "Gần đây" },
        { title: "Đáng giá: Từ cao tới thấp" },
        { title: "Đánh giá: Từ thấp tới cao" },
      ],
      listFilter: [
        { title: "Tất cả" },
        { title: "5 Sao" },
        { title: "4 Sao" },
        { title: "3 Sao" },
        { title: "2 Sao" },
        { title: "1 Sao" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("Product/GetProductLikeSame", {
      cdId: this.$route.params.product.cdId,
      companyId: this.$route.params.product.companyId,
    });
    this.$store.dispatch("Product/GetProduct", this.$route.params.product.id);
    this.$store.dispatch("Product/GetProduct", this.$route.params.product.id);
    this.$store.dispatch("ProductImage/GetAllProductImage");
  },
  computed: {
    ...mapGetters({
      product: "Product/product",
      listProductSale: "Product/listProductSale",
      listProductLikeSame: "Product/listProductLikeSame",
      listProductImage: "ProductImage/listProductImage"
    }),
  },
  methods: {
    minus(){
      if (parseInt(this.quantity)>1){
        this.quantity -= 1;
      }
    },
    plus(){
      this.quantity += 1;
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
.sub_title {
  font-size: 12px;
}
.sub_title p {
  padding-top: 2px;
}
.sub_title a {
  text-decoration: none;
}
.sub_title span {
  margin-left: 10px;
  margin-right: 10px;
}
.sub_title .v-rating button {
  width: 20px;
  height: 20px;
}
.price_product {
  font-size: 1.2em;
}
.price_product span:first-child {
  color: crimson;
  margin-right: 15px;
  text-decoration: line-through;
}
.price_product span:last-child {
  color: blue;
}
.numberic_box {
  width: 140px;
  border: 0.2px solid #707070;
  border-radius: 5px;
  height: 42px;
}
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
.rating .v-rating .v-icon {
  padding: 0 !important;
}
.toolbar-review {
  margin: 10px 15px;
  padding-top: 6px;
  height: 30px;
}
.toolbar-review p {
  font-size: 13px;
}
.toolbar-review .v-icon {
  font-size: 18px;
  padding-bottom: 4px;
}
.comment-pro {
  padding: 0 30px;
  color: #969595;
}
.comment-pro p {
  font-size: 13px;
  margin-left: 20px;
  margin-top: 9px;
}
.comment-pro .v-btn .v-icon {
  font-size: 16px;
}
.numberperlike {
  font-size: 13px;
  margin-top: 9px;
}
</style>
