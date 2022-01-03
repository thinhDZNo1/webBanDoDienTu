<template>
  <v-app class="mt-0">
    <v-subheader>
      <v-icon class="mr-2">mdi-playlist-minus</v-icon>
      <h3>Quản lý bài viết</h3>
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
            :items="listPost"
            :items-per-page="10"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.title }}</td>

                <td>
                  <v-img
                    max-width="150"
                    :src="'data:image/jpeg;base64,' + item.imageFile"
                  ></v-img>
                </td>
                <td>
                  <v-sheet class="overflow-auto"  v-html="item.content" width="400" height="200">

                  </v-sheet>
                </td>
                <td>{{ item.source }}</td>
                <td>{{ convertDate(item.createdDate) }}</td>
                <td>{{ convertDate(item.modifiedDate) }}</td>
                <td>
                   <v-btn
                      fab
                      dark
                      elevation="3"
                      @click="(dialogView = true), (postContent = item.content), (postTitle = item.title)"
                      x-small
                      color="blue"
                    >
                      <v-icon>mdi-magnify-expand</v-icon>
                    </v-btn>
                  <div class="d-flex justify-end align-center">

                    <v-btn
                      fab
                      dark
                      elevation="3"
                      class="mr-3"
                      @click="(dialogEdit = true), (currentPost = item)"
                      x-small
                      color="blue-grey"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      dark
                      elevation="3"
                      @click="(dialogDelete = true), (postId = item.id)"
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
          <v-btn color="primary" @click="deletePost" text>Đồng ý</v-btn>
          <v-btn @click="dialogDelete = false" text>Hủy bỏ</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogView" class="p-0" max-width="700px">
      <v-card>
        <v-card-title primary-title>
          {{postTitle}}
        </v-card-title>
      <v-card-text v-html="postContent"></v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn @click="dialogView = false" text>đóng</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>
    <add
      :dialogAdd="dialogAdd"
      @close="dialogAdd = false"
    />
    <edit
      :dialogEdit="dialogEdit"
      :currentPost="currentPost"
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
        { text: "Tiêu đề", value: "name", align: "center" },
        { text: "Ảnh bìa", value: "image", align: "center", width: 160  },
        { text: "nội dung", value: "images", align: "center", width: 400 },
        { text: "Nguồn", value: "source", align: "center" },
        { text: "Ngày tạo", value: "createdDate", align: "center" },
        { text: "Ngày sửa", value: "modifiedDate", align: "center" },
        { text: "Chức năng", value: "action", align: "right" },
      ],
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogView: false,
      currentPost: null,
      postId: null,
      postTitle: "",
      postContent: ""
    };
  },
  mounted() {
    this.$store.dispatch("Post/GetAllPost");
  },
  computed: {
    ...mapGetters("Post", ["listPost"]),
  },
  methods: {
    convertDate(date) {
      return moment(String(date)).format("DD/MM/YYYY h:mm:ss");
    },
    deletePost(){
      this.$store.dispatch("Post/DeletePost", this.postId);
      this.dialogDelete = false;
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const file = event.target.files;
      let fileName = file[0].name;
      if (fileName.lastIndexOf(".") <= 0) {
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.$refs.categoryIcon.src = fileReader.result;
        this.data.icon = fileReader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      });
      fileReader.readAsDataURL(file[0]);
    },
  },
};
</script>

<style>
</style>
