<template>
<div class="container" style="margin-top: 130px">
  <v-breadcrumbs :items="bc_items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row>
      <v-col cols="8">
        <v-card class="elevation-3">
          <div class="d-flex ">
            <v-checkbox label="Chọn tất cả" v-model="value" value="value" class="ml-2 pt-5" dense></v-checkbox>
            <v-spacer></v-spacer>
            <v-btn class="my-auto mr-3 elevation-0" color="white">
              <v-icon style="color: red; font-size: 20px">mdi-trash-can-outline</v-icon>
              <span class="text-capitalize font-weight-regular" style="color: grey">Xóa tất cả</span>
            </v-btn>
          </div>
          <v-divider></v-divider>
          <div>
            <div v-if="user!==null">
              <div v-for="(item, key) in listCD" :key="key">
            <div class="d-flex">
             <div class="my-auto ml-2" style="width: 140px; height: 100px;">
               <v-img
              max-width="140"
              max-height="100"
              :src="'data:image/jpeg;base64,' + item.product.imageFile"
            ></v-img>
             </div>
             <div>
              <div style="width: 390px">
                 <v-card-title primary-title class="pb-0 pt-1 pl-5" style="font-size: 18px;height: 70px; line-height: 1.4rem">
               {{item.product.name}}
             </v-card-title>
             <div class="d-flex pl-4" v-if="item.product.discount !== 0">
               <v-card-title primary-title style="font-size:16px; color:red" class="pt-0">
               {{formatMonney(item.product.discount)}}
             </v-card-title>
             <v-card-title primary-title style="font-size:15px; " class="pl-0 pt-0 grey--text text-decoration-line-through">
              {{formatMonney(item.product.price)}}
             </v-card-title>
              </div>
              <div class="d-flex pl-4" v-if="item.product.discount === 0">
               <v-card-title primary-title style="font-size:16px; color:red" class="pt-0">
               {{formatMonney(item.product.price)}}
             </v-card-title>
              </div>
             </div>
             </div>
             <div class="my-auto ml-10">
              <v-btn icon class="ml-9">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
              <div class="d-flex numberic_box px-1" outlined>
              <v-btn class="my-auto" icon @click="minus">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-text-field
                class="rounded-0 mx-1"
                dense
                disabled
                value="1"
                v-model="item.quantity"
                outlined
              ></v-text-field>
              <v-btn icon class="my-auto" @click="plus">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
             </div>
          </div>
          </div>
            </div>
          <v-divider></v-divider>
          </div>
          <div>
            <v-card-title primary-title v-if="user===null">
              Đăng nhập để xem giỏ hàng
            </v-card-title>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="elevation-3">
          <v-card-title  style="background-color: #2878c6 !important; color:white; padding-left: 100px;">
              Xác nhận đơn hàng
          </v-card-title>
          <div>
            <div class="d-flex">
              <v-card-text class="py-0 mt-5" style="font-size: 18px">
              Địa điểm
            </v-card-text>
            <v-spacer></v-spacer>
            <v-btn icon class="mt-3 mr-3">
              <v-icon style="font-size: 18px; color: blue">mdi-pen</v-icon>
            </v-btn>
            </div>
            <v-card-text style="font-size: 14px" class="pt-2">
              <v-icon style="font-size: 16px">mdi-map-marker</v-icon>
              {{user.address}}
            </v-card-text>
            <v-divider></v-divider>
            <div class="info-order">
              <v-card-title class="pb-0 font-weight-regular" style="font-size: 18px">
              Thông tin đơn hàng
            </v-card-title>
            <div class="d-flex px-2" >
              <v-card-text>
                Phí giao hàng
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-text class="text-right font-weight-medium">
                30,000 VND
              </v-card-text>
            </div>
            <div class="d-flex px-2">
              <v-card-text>
                Tổng cộng
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-text class="text-right font-weight-medium">
              </v-card-text>
            </div>
            <v-btn width="93%" class="ma-3" color="primary">
              Xác nhận đơn hàng
            </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  data() {
    return {
      bc_items: [
        {
          text: "Trang chủ",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Giỏ hàng",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
      ],
    }
  },
  mounted() {
    this.$store.dispatch("CartDetail/GetCartByUser", this.user.id);
  },
  computed: {
    ...mapGetters({
      user: "User/user",
      listCD: "CartDetail/listCartDetail",
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
    minus(){
      if (parseInt(this.quantity)>1){
        this.quantity -= 1;
      }
    },
    plus(){
      this.quantity += 1;
    },

  },
}
</script>

<style>
.numberic_box {
  width: 140px;
  border: 0.2px solid #707070;
  border-radius: 5px;
  height: 42px;
  zoom:0.8;
}
.info-order .v-card__text{
  padding-top: 10px !important;
  padding-bottom: 0 !important;
}
</style>
