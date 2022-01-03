<template>
  <v-dialog v-model="dialog" max-width="520px">
    <v-card flat tile>
      <v-card-title class="purple headline">
        <span style="color: white">Thêm mới</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
                <div class="d-flex justify-center">
                  <img
                  ref="cdIcon"
                  src="@/assets/default_product.png"
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
        ><v-btn color="purple" class="mr-4" dark @click="addCD">
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters} from "vuex";
export default {
  name: "Add",
  data() {
    return {
      data: {
        name: "",
        icon: "",
        categoryId: 0,
        description: "",
        isActive: true,
      },
      editorOption: {
        /* quill options */
      },
    };
  },
  props: ["dialogAdd"],
  computed: {
    ...mapGetters("Category", ["listCategory"]),

    dialog: {
      get() {
        return this.dialogAdd;
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
  created() {
    this.$store.dispatch("Category/GetAllCategory");
  },
  methods: {
    addCD() {
      if (this.data.categoryId===0){
        alert("Vui lòng chọn danh mục");
      }else{
        this.$store.dispatch("CategoryDetail/AddCD", this.data);
        this.data.name= "";
        this.data.icon= "";
        this.data.categoryId ="";
        this.data. description = "";
        this.$emit("updateData");
        this.$emit("close");
      }
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
        this.$refs.cdIcon.src = fileReader.result;
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
