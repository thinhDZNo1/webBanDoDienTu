<template>
  <div class="container" style="margin-top: 130px">
    <v-breadcrumbs :items="bc_items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card class="mt-8 rounded-lg">
      <v-row class="pt-5">
        <v-col cols="3">
          <v-card width="200" height="200" class="ml-12">
            <v-img height="200" :src="'data:image/jpeg;base64,' + user.imageFile">
          </v-img>
          </v-card>
        </v-col>
        <v-col cols="7">
          <v-card-title class="pb-0">
            <p>Tên tài khoản: {{user.userName}}</p>
          </v-card-title>
          <v-card-title  class="py-0">
            <p>Họ tên: {{user.lastName + user.firstName}}</p>
          </v-card-title>
          <v-card-title  class="pb-0">
            <p>Ngày sinh: {{convertDateBD(user.birthDay)}}</p>
            <p class="ml-5">Giới tính: {{user.sex}}</p>
          </v-card-title>
          <v-card-title class="pb-0">
            <p>Địa chỉ: {{user.address}}</p>
          </v-card-title>
          <v-card-title class="pb-0">
            <p>Email: {{user.email}}</p>
          </v-card-title>
          <v-card-title class="pb-0">
            <p>Số điện thoại: {{user.phone}}</p>
          </v-card-title>
        </v-col>
        <v-col>
          <v-btn
                    fab
                    right
                    color="pink"
                    class="white--text mb-3 mr-2"
                    small
                    @click="(dialogEdit = true), (currentUser = user)"
                  >
                    <v-icon >mdi-pencil</v-icon>
                  </v-btn>
                   <v-btn
                    fab
                    right
                    color="blue"
                    class="white--text mb-3 mr-2"
                    small
                    @click="(dialogChange = true), (currentUser = user)"
                  >
                    <v-icon >mdi-lock-plus</v-icon>
                  </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="my-4">
      <v-card-title primary-title>
        Quản lý đơn hàng
      </v-card-title>
      <v-row>
        <v-col cols="12">
          <div class=d-flex>
            <v-card height="100" width="100" class="ml-15">
              <v-img src="https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2021/09/15/image-removebg-preview-15.png"></v-img>
            </v-card>

            <div class="ml-8">
              <v-card-title class="py-0">
              Điện thoại iPhone 13 Pro 128GB
            </v-card-title>
              <v-card-title class="red--text" style="font-size: 18px">
                <p>29.990.000 VND</p> <p class=" ml-4 grey--text text-decoration-line-through" style="font-size: 17px">30.990.000 VND</p>
              </v-card-title>
            </div>
            <div class="ml-8">
              <p class="mt-8"><b>Số lượng</b>: 4</p>
            </div>
            <v-spacer></v-spacer>
            <div>
              <v-btn class="mr-15" color="pink" dark> Hủy</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <edit
      :dialogEdit="dialogEdit"
      @close="dialogEdit = false"
      :currentUser="currentUser"
    />
    <change-pass :dialogChange="dialogChange"
      @close="dialogChange = false"
      :currentUser="currentUser"/>
  </div>
</template>

<script>
import moment from "moment"
import {mapGetters} from 'vuex'
import Edit from './Edit.vue';
import ChangePass from './ChangePass.vue';
export default {
  components: { Edit, ChangePass },
  name: "Account",
  data() {
    return {
      bc_items: [
        {
          text: "Trang chủ",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Tài khoản",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
      ],
      dialogEdit: false,
      dialogChange : false,
      currentUser : null
    };
  },
  computed: {
    ...mapGetters({
      user: "User/user",
    }),
  },
  methods: {
    convertDateBD(date) {
      return moment(String(date)).format("DD/MM/YYYY");
    },
  },
};
</script>

<style>
</style>>
