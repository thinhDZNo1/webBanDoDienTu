<template>
  <v-app class="mt-0">
    <v-subheader>
      <v-icon class="mr-2">mdi-playlist-minus</v-icon>
      <h3>Quản lý sản phẩm</h3>
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
            :items="listProduct"
            :items-per-page="10"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>
                <td>
                  <v-img
                    max-width="150"
                    :src="'data:image/jpeg;base64,' + item.imageFile"
                  ></v-img>
                </td>
                <td>{{ item.price }}</td>
                <td>{{ item.discount }}</td>
                <td v-if="item.status == 1">Còn hàng</td>
                <td v-if="item.status == 0">Hết hàng</td>
                <td>{{ item.quantity }}</td>
                <td><div style="height: 160px; width: 200px" class="overflow-hidden" v-html="item.description">
                  </div></td>
                <td><div style="height: 160px;width: 200px" class="overflow-hidden" v-html="item.shortDescription">
                  </div></td>
                <td>{{ item.company.name }}</td>
                <td>{{ item.categoryDetail.name }}</td>
                <td>{{ convertDate(item.createdDate) }}</td>
                <td>
                  <div class="d-flex justify-end align-center">
                    <v-btn
                      fab
                      dark
                      elevation="3"
                      class="mr-3"
                      @click="(dialogEdit = true), (currentProduct = item)"
                      x-small
                      color="blue-grey"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
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
import Add from "./Add.vue";
import Edit from "./Edit.vue";
export default {
  components: { Add, Edit },
  name: "Product",
  data() {
    return {
      headers: [
        { text: "Tên sản phẩm", value: "name", align: "center" },
        { text: "Ảnh đại diện", value: "images", align: "center" },
        { text: "Giá sản phẩm", value: "price", align: "center" },
        { text: "Giảm giá", value: "discount", align: "center" },
        { text: "Trạng thái", value: "status", align: "center" },
        { text: "Số lượng", value: "quantity", align: "center" },
        { text: "Mô tả", value: "description", align: "center" },
        { text: "Mô tả ngắn", value: "shortDescription", align: "center" },
        { text: "Thương hiệu", value: "companyId", align: "center" },
        { text: "Loại sản phẩm", value: "categoryDetailId", align: "center" },
        { text: "ngày tạo", value: "createdDate", align: "center" },
        { text: "Chức năng", value: "action", align: "right" },
      ],
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      currentProduct: null,
      productId: null,
      products: null,
    };
  },
  mounted() {
    this.$store.dispatch("Product/GetAllProduct");
  },
  computed: {
    ...mapGetters("Product", ["listProduct"]),
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
