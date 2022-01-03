<template>
  <v-dialog v-model="dialog" max-width="520px">
    <v-card flat tile>
      <v-card-title class="purple headline">
        <span style="color: white">Chỉnh sửa</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
                <div class="d-flex justify-center">
                  <img
                  ref="cdIcon"
                  :src="'data:image/jpeg;base64,' + data.imageFile"
                  width="120"
                  max-height="120"
                  alt=""
                />
                <v-btn
                dark
                  raised
                  class="purple my-auto"
                  style="margin-left: 70px"
                  @click="onPickFile"
                  >Chọn ảnh</v-btn
                >
                <input
                  type="file"
                  style="display: none"
                  ref="fileInput"
                  accept="image/*"
                  @change="onFilePicked"
                />
                </div>
                <v-text-field v-model="data.name" label="Tên">
                </v-text-field>
                <v-select
                      v-model="data.categoryId"
                      :items="listCategory"
                      item-text="name"
                      item-value="id"
                      label="Chọn danh mục"
                    >
                    </v-select>
                <p class="mb-1" style="font-size:16px">Mô tả</p>
                <quill-editor
                  v-model="data.description"
                  ref="myQuillEditor"
                  :options="editorOption"
                >
                </quill-editor>
          </v-container>
        </v-form>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" class="mr-2" dark @click="$emit('close')">
          Hủy bỏ </v-btn
        ><v-btn color="purple" class="mr-4" dark @click="updateCD">
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters} from "vuex";
export default {
  name: "Edit",
  data() {
    return {
      data: {
        id: 0,
        name: "",
        categoryId: 0,
        icon: "",
        imageFile: "",
        description: "",
        createdDate: null,
        isActive: null,
      },
      editorOption: {
        /* quill options */
      },
    };
  },
  props: ["dialogEdit", "currentCD"],
  computed: {
    dialog: {
      get() {
        return this.dialogEdit;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    ...mapGetters("Category", ["listCategory"]),
  },
  watch: {
    currentCD: function () {
      this.data.id = this.currentCD.id,
      this.data.name = this.currentCD.name,
      this.data.categoryId = this.currentCD.categoryId
      this.data.icon = this.currentCD.icon,
      this.data.imageFile = this.currentCD.imageFile,
      this.data.description = this.currentCD.description,
      this.data.createdDate = this.currentCD.createdDate,
      this.data.isActive = this.currentCD.isActive
    },
  },
  created() {
    this.$store.dispatch("Category/GetAllCategory");
  },
  methods: {
    updateCD() {
      this.$store.dispatch("CategoryDetail/UpdateCD", {
        categoryDetail: this.data,
      });
      this.$emit("updateData");
      this.$emit("close");
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.data.description = html;
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
        this.$refs.slideImage.src = fileReader.result;
        this.data.imageFile = fileReader.result
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
