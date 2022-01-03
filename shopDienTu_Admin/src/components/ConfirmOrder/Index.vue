<template>
  <v-app class="mt-0">
    <v-subheader>
      <v-icon class="mr-2">mdi-playlist-minus</v-icon>
      <h3>Quản lý sản đơn hàng</h3>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        small
        dark
        elevation="3"
        fab
        @click="dialogAdd = true"
      >
        <v-icon color="white">mdi-plus</v-icon>
      </v-btn>
    </v-subheader>
    <v-row class="mt-0">
      <v-col>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="listConfirmOrder"
            :items-per-page="10"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.cartDetail.product.name }}</td>
                <td>
                  <v-img
                    max-width="150"
                    :src="'data:image/jpeg;base64,' + item.cartDetail.productimageFile"
                  ></v-img>
                </td>
                <td>{{ item.cartDetail.product.price }}</td>
                <td>{{ item.cartDetail.quantity }}</td>
                <td>{{ convertDate(item.createdDate) }}</td>
                <td>
                  <div class="d-flex justify-end align-center">
                    <v-btn
                      fab
                      dark
                      elevation="3"
                      @click="(dialogDelete = true), (productId = item.id)"
                      x-small
                      color="red"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" persistent class="p-0" max-width="400px">
      <v-card>
       <v-card-title primary-title style="background-color:#85c9ff; font-size: 18px">
              <v-icon style="color: #f72959" class="mr-3">mdi-alert-circle</v-icon>
              Bạn có đồng ý muốn xóa?
        </v-card-title>
        <div class="d-flex justify-end py-3 pr-5">
          <v-btn color="primary" @click="deleteProduct" text>Đồng ý</v-btn>
          <v-btn @click="dialogDelete = false" text>Hủy bỏ</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <add
      :dialogAdd="dialogAdd"
      @close="dialogAdd = false"
    />
    <edit
      :dialogEdit="dialogEdit"
      :currentProduct="currentProduct"
      @close="dialogEdit = false"
    />
  </v-app>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "ConfirmOrder",
  data() {
    return {
      headers: [
        { text: "Tên sản phẩm", value: "name", align: "center" },
        { text: "Ảnh đại diện", value: "images", align: "center" },
        { text: "Giá sản phẩm", value: "price", align: "center" },
        { text: "Trạng thái", value: "status", align: "center" },
        { text: "Số lượng", value: "quantity", align: "center" },
        { text: "Tổng tiền", value: "total", align: "center" },
        { text: "ngày tạo", value: "createdDate", align: "center" },
        { text: "Chức năng", value: "action", align: "right" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("ConfirmOrder/GetAllConfirmOrder");
  },
  computed: {
    ...mapGetters("ConfirmOrder", ["listConfirmOrder"]),
  },
  methods: {
    convertDate(date) {
      return moment(String(date)).format("DD/MM/YYYY h:mm:ss");
    },
    deleteProduct(){
      this.$store.dispatch("Product/DeleteProduct", this.productId);
      this.dialogDelete = false;
    }
  },
};
</script>

<style>
</style>
