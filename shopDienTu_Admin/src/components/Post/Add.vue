<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card flat tile>
      <v-card-title class="primary headline">
        <span style="color: white">Thêm mới</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col>
                <div class="d-flex justify-center">
                  <img
                  ref="postImage"
                  src="@/assets/default_product.png"
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
                <v-text-field v-model="data.title" label="Tiêu đề">
                </v-text-field>

                <p class="pl-1 mb-0">Mô tả</p>
                <quill-editor
                  v-model="data.content"
                  ref="myQuillEditor"
                  :options="editorOption"
                >
                </quill-editor>
                    <v-text-field
                      v-model="data.source"
                      no-resize
                      label="Nguồn"
                    >
                    </v-text-field>

              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" class="mr-2" dark @click="$emit('close')">
          Hủy bỏ </v-btn
        ><v-btn color="primary" class="mr-4" dark @click="addPost">
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Add",
  data() {
    return {
      data: {
        title: "",
        image: "",
        content: "",
        source: "",
        isActive: true,
      },
      ListStatus: [
        {
          text: "Còn hàng",
          value: 1,
        },
        {
          text: "Hết hàng",
          value: 0,
        },
      ],
      editorOption: {
        /* quill options */
      },
    };
  },
  props: ["dialogAdd"],
  computed: {
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
  methods: {
    addPost() {
      this.$store.dispatch("Post/AddPost", this.data);
      this.data.title= "";
        this.data.image= "";
        this.data.content= "";
        this.data.source= "";
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
        this.$refs.postImage.src = fileReader.result;
        this.data.image = fileReader.result
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
