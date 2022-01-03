<template>
  <v-dialog v-model="dialog" max-width="520px">
    <v-card flat tile>
      <v-card-title class="orange headline">
        <span style="color: white">Thêm mới</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
                <div class="d-flex justify-center">
                  <img
                  ref="categoryImage"
                  :src="'data:image/jpeg;base64,' + data.imageFile"
                  width="120"
                  max-height="120"
                  alt=""
                />
                <v-btn
                dark
                  raised
                  class="orange my-auto"
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
                <v-text-field v-model="data.name" label="Tiêu đề">
                </v-text-field>
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
        ><v-btn color="orange" class="mr-4" dark @click="updateCategory">
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      data: {
        id: 0,
        name: "",
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
  props: ["dialogEdit", "currentCategory"],
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
  },
  watch: {
    currentCategory: function () {
      this.data.id = this.currentCategory.id,
      this.data.name = this.currentCategory.name,
      this.data.icon = this.currentCategory.icon,
      this.data.imageFile = this.currentCategory.imageFile,
      this.data.description = this.currentCategory.description,
      this.data.createdDate = this.currentCategory.createdDate,
      this.data.isActive = this.currentCategory.isActive
    },
  },
  methods: {
    updateCategory() {
      this.$store.dispatch("Category/UpdateCategory", {
        category: this.data,
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
        this.$refs.categoryImage.src = fileReader.result;
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
