<template>
  <v-app class="mt-0">
    <v-subheader>
      <v-icon class="mr-2">mdi-playlist-minus</v-icon>
      <h3>Quản lý Menu</h3>
      <v-spacer></v-spacer>
      <v-btn
        Menu="primary"
        small
        dark
        elevation="3"
        fab
        @click="dialogAdd = true"
      >
        <v-icon Menu="white">mdi-plus</v-icon>
      </v-btn>
    </v-subheader>
    <v-row class="mt-0">
      <v-col>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="listMenu"
            :items-per-page="10"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.title }}</td>
                <td>{{ item.url }}</td>
                <td>
                  {{ item.status }}
                </td>
                <td>{{ convertDate(item.createdDate) }}</td>
                <td>{{ convertDate(item.modifiedDate) }}</td>
                <td>
                  <div class="d-flex justify-end align-center">
                    <v-btn
                      fab
                      dark
                      elevation="3"
                      class="mr-3"
                      @click="(dialogEdit = true), (currentMenu = item)"
                      x-small
                      Menu="blue-grey"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      dark
                      elevation="3"
                      @click="(dialogDelete = true), (MenuId = item.id)"
                      x-small
                      Menu="red"
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
       <v-card-title primary-title style="background-Menu:#85c9ff; font-size: 18px">
              <v-icon style="Menu: #f72959" class="mr-3">mdi-alert-circle</v-icon>
              Bạn có đồng ý muốn xóa?
        </v-card-title>
        <div class="d-flex justify-end py-3 pr-5">
          <v-btn Menu="primary" @click="deleteMenu" text>Đồng ý</v-btn>
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
      :currentMenu="currentMenu"
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
  name: "Menu",
  data() {
    return {
      headers: [
        { text: "Tên", value: "name", align: "center" },
        { text: "Url", value: "url", align: "center" },
        { text: "Trạng thái", value: "status", align: "center" },
        { text: "Ngày tạo", value: "createDate", align: "center" },
        { text: "Ngày sửa", value: "modifiedDate", align: "center" },
        { text: "Chức năng", value: "action", align: "right" },
      ],
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      currentMenu: null,
      MenuId: null,
      Menu: null,
    };
  },
  mounted() {
    this.$store.dispatch("Menu/GetAllMenu");
  },
  computed: {
    ...mapGetters("Menu", ["listMenu"]),
  },
  methods: {
    convertDate(date) {
      return moment(String(date)).format("DD/MM/YYYY h:mm:ss");
    },
    deleteMenu(){
      this.$store.dispatch("Menu/DeleteMenu", this.MenuId);
      this.dialogDelete = false;
    }
  },
};
</script>

<style>
</style>
