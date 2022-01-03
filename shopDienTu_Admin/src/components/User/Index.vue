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
            :items="listUser"
            :items-per-page="10"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.lastName + " " + item.firstName }}</td>
                <td>
                  <v-img
                    max-width="150"
                    :src="'data:image/jpeg;base64,' + item.imageFile"
                  ></v-img>
                </td>
                <td>{{ item.sex }}</td>
                <td>{{ convertDateBD(item.birthDay) }}</td>
                <td> {{item.address}} </td>
                <td> {{item.email}} </td>
                <td>{{ item.phone }}</td>
                <td>{{ item.userName }}</td>
                <td>{{ item.password }}</td>
                <td>{{ item.roleName }}</td>
                <td>{{ convertDate(item.createdDate) }}</td>
                <td>
                  <div class="d-flex justify-end align-center">
                    <v-btn
                      fab
                      dark
                      elevation="3"
                      class="mr-3"
                      @click="(dialogEdit = true), (currentUser = item)"
                      x-small
                      color="blue-grey"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      dark
                      elevation="3"
                      @click="(dialogDelete = true), (userId = item.id)"
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
      :currentUser="currentUser"
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
        { text: "Họ tên", value: "firstName", align: "center" },
        { text: "Ảnh đại diện", value: "avatar", align: "center" },
        { text: "Giới tính", value: "sex", align: "center" },
        { text: "Ngày sinh", value: "birthday", align: "center" },
        { text: "Địa chỉ", value: "address", align: "center" },
        { text: "Email", value: "email", align: "center" },
        { text: "Số điện thoại", value: "phone", align: "center" },
        { text: "Tên tài khoản", value: "username", align: "center" },
        { text: "Mật khẩu", value: "password", align: "center" },
        { text: "Loại tài khoản", value: "roleName", align: "center" },
        { text: "ngày tạo", value: "createdDate", align: "center" },
        { text: "Chức năng", value: "action", align: "right" },
      ],
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      currentUser: null,
      userId: null,
    };
  },
  mounted() {
    this.$store.dispatch("User/GetAllUser");
  },
  computed: {
    ...mapGetters("User", ["listUser"]),
  },
  methods: {
    convertDate(date) {
      return moment(String(date)).format("DD/MM/YYYY h:mm:ss");
    },
    convertDateBD(date) {
      return moment(String(date)).format("DD/MM/YYYY");
    },
    deleteProduct(){
      this.$store.dispatch("User/DeleteUser", this.userId);
      this.dialogDelete = false;
    }
  },
};
</script>

<style>
</style>
