<template>
  <v-app class="mt-0">
    <v-subheader>
      <v-icon class="mr-2">mdi-playlist-minus</v-icon>
      <h3>Quản lý ảnh mô tả sản phẩm</h3>
      <v-spacer></v-spacer>
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
                <td>
                  <div
                    style="max-width: 520px; height: 140px"
                    class="overflow-x-auto d-flex mt-3"
                  >
                  <div v-for="(value, key) in listProductImage" :key="key">
                    <v-card v-if="value.productId === item.id" width="120" height="100" class=" mr-3 image_onhover" >
                      <v-img
                        class="img_hover"
                        width="120"
                        max-height="100"
                        :src="'data:image/jpeg;base64,' + value.imageFile"
                      ></v-img>
                      <v-btn
                        class="show-btns"
                        color="red"
                        fab
                        small
                        dark
                        @click="(dialogDelete = true),(piid = value.id)"
                        style="position: relative; bottom: 50px"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-card>
                  </div>

                  </div>
                </td>
                <td>
                  <v-btn
                      fab
                      dark
                      elevation="3"
                      class="mr-3"
                      @click="(dialogAdd = true), (currentProductId = item.id)"
                      x-small
                      color="blue-grey"
                    >
                      <v-icon>mdi-image-plus</v-icon>
                    </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" persistent class="p-0" max-width="400px">
      <v-card>
        <v-card-title
          primary-title
          style="background-color: #85c9ff; font-size: 18px"
        >
          <v-icon style="color: #f72959" class="mr-3">mdi-alert-circle</v-icon>
          Bạn có đồng ý muốn xóa?
        </v-card-title>
        <div class="d-flex justify-end py-3 pr-5">
          <v-btn color="primary" @click="deleteProductImage" text>Đồng ý</v-btn>
          <v-btn @click="dialogDelete = false" text>Hủy bỏ</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <add :dialogAdd="dialogAdd" @close="dialogAdd = false"
      :currentProductId="currentProductId" />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Add from "./Add.vue";
export default {
  components: { Add },
  name: "ProductImage",
  data() {
    return {
      headers: [
        { text: "Tên sản phẩm", value: "name", align: "center" },
        { text: "Ảnh đại diện", value: "images", align: "center" },
        { text: "Ảnh mô tả", value: "image", align: "center", width: "520" },
        { text: "Chức năng", value: "action", align: "right", width: "120" },
      ],
      dialogAdd: false,
      dialogDelete: false,
      currentProductId: null,
      piid: null,
      products: null,
    };
  },
  mounted() {
    this.$store.dispatch("Product/GetAllProduct");
    this.$store.dispatch("ProductImage/GetAllProductImage");
  },
  computed: {
    ...mapGetters("Product", ["listProduct"]),
    ...mapGetters("ProductImage", ["listProductImage"]),
  },
  methods: {
    deleteProductImage() {
      this.$store.dispatch("ProductImage/DeleteProductImage", this.piid);
      this.dialogDelete = false;
    },
  },
};
</script>

<style scoped>
.image_onhover:hover .img_hover {
  opacity: 0.8;
}
.image_onhover:hover .show-btns {
  display: inline-block;
}
.show-btns {
  display: none;
}
</style>
