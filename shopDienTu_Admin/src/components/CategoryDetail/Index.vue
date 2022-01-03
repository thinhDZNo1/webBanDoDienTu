<template>
  <v-app class="mt-0">
    <v-subheader>
      <v-icon class="mr-2">mdi-playlist-minus</v-icon>
      <h3>Quản lý danh mục chi tiết</h3>
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
            :items="listCD"
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
                <td> {{item.category.name}} </td>
                <td v-html="item.description"></td>
                <td>{{ convertDate(item.createdDate) }}</td>
                <td>{{ convertDate(item.modifiedDate) }}</td>
                <td>
                  <div class="d-flex justify-end align-center">
                    <v-btn
                      fab
                      dark
                      elevation="3"
                      class="mr-3"
                      @click="(dialogEdit = true), (currentCD = item)"
                      x-small
                      color="blue-grey"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      dark
                      elevation="3"
                      @click="(dialogDelete = true), (cdId = item.id)"
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
          <v-btn color="primary" @click="deleteCD" text>Đồng ý</v-btn>
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
      :currentCD="currentCD"
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
  name: "CategoryDetail",
  data() {
    return {
      headers: [
        { text: "Tên", value: "name", align:"center" },
        { text: "Hình ảnh", value: "image" , align:"center"},
        { text: "Danh mục", value: "category", align:"center" },
        { text: "Mô tả", value: "url", align:"center" },
        { text: "Ngày tạo", value: "createDate", align:"center" },
        { text: "Ngày sửa", value: "modifiedDate", align:"center" },
        { text: "Chức năng", value: "action", align: "right" },
      ],
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      currentCD: null,
      cdId: null,
      categoryDetail: null,
    };
  },
  mounted() {
    this.$store.dispatch("CategoryDetail/GetAllCD");
  },
  computed: {
    ...mapGetters("CategoryDetail", ["listCD"]),
  },
  methods: {
    convertDate(date) {
      return moment(String(date)).format("DD/MM/YYYY h:mm:ss");
    },
    deleteCD(){
      this.$store.dispatch("CategoryDetail/DeleteCD", this.cdId);
      this.dialogDelete = false;
    }
  },
};
</script>

<style>
</style>
