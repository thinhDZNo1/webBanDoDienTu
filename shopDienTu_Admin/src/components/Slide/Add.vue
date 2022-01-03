<template>
  <v-dialog v-model="dialog" max-width="480px">
    <v-card flat tile>
      <v-card-title class="pink headline">
        <span style="color: white">Thêm mới</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
                <div style="margin-left:75px">
                  <img
                  ref="slideImage"
                  src="@/assets/default_product.png"
                  width="250"
                  max-height="250"
                  alt=""
                />
                <v-btn
                dark
                  raised
                  class="pink"
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
                <v-text-field v-model="data.url" label="Url">
                </v-text-field>
          </v-container>
        </v-form>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" class="mr-2" dark @click="$emit('close')">
          Hủy bỏ </v-btn
        ><v-btn color="primary" class="mr-4" dark @click="addProduct">
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
        url: "",
        isActive: true,
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
    addProduct() {
      this.$store.dispatch("Slide/AddSlide", this.data);
       this.data.title= "";
        this.data.image= "";
        this.data.url= "";
      this.$emit("close");
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
