<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card flat tile>
      <v-card-title class="primary headline">
        <span style="color: white">Thêm mới</span>
      </v-card-title>
      <v-card-text>
        <div
          @dragenter.prevent=""
          @dragover.prevent=""
          @drop.prevent="handleFiles"
          class="dropzone-wrapper mx-auto"
          style="width: 500px"
        >
          <input
            type="file"
            @change="handleFiles"
            ref="dropzoneFile"
            id="dropzone-file"
            multiple
            accept="image/*"
          />
          <div>
            <label for="dropzone-file" class="dropzone-label">
              <v-icon class="dropzone-label-icon">mdi-upload-multiple</v-icon>
            </label>
          </div>
          <div>
            <p>
              <strong>Kéo ảnh để tải lên</strong>
            </p>
            <p>
              <small class="secondary-text">hoặc</small>
            </p>
            <v-btn @click="onPickFile" class="btn-dropzone"> Chọn file</v-btn>
          </div>
        </div>
        <div class="d-flex justify-center overflow-x-auto">
          <v-card class="card-img mt-5 mr-3 pt-1" width="160" height="172" v-for="(value, key) in imageFiles" :key="key">
            <img :src="value.image" width="160" height="160px" alt="">
            <v-btn fab small color="red" class="btn-remove" @click="remove(value.id)"><v-icon style="color: white">mdi-close-circle</v-icon></v-btn>
        </v-card>
        </div>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" class="mr-2" dark @click="$emit('close')">
          Hủy bỏ </v-btn
        ><v-btn color="primary" class="mr-4" dark @click="addProductImage">
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
      productId: "",
      imageFiles: [],
      username: null,
      password: null,
      showFailureMessage: false,
    };
  },
  props: ["dialogAdd","currentProductId"],
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
  },
watch: {
    currentProductId: function () {
      this.productId = this.currentProductId
    },
  },
  methods: {
    handleFiles(event) {
      const inputValue =
        event.target.files ||
        event.dataTransfer.files ||
        this.$refs.dropzoneFile.files;
      for (let i = 0; i < inputValue.length; i++) {
        if (inputValue[i].name.lastIndexOf(".") <= 0) {
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          if (this.imageFiles.length === 0) {
            this.imageFiles.push({id: 0 ,image:  fileReader.result});
          }else{
            const id = this.imageFiles[this.imageFiles.length-1].id;
            this.imageFiles.push({id: id ,image:  fileReader.result});
          }
        });
        fileReader.readAsDataURL(inputValue[i]);
      }
    },
    addProductImage() {
      const data = [];
      for (let i = 0; i < this.imageFiles.length; i++) {
        const img = this.imageFiles[i].image.replace("data:", "")
          .replace(/^.+,/, "");
        data.push({productId: this.productId, images: img, isActived: true});
      }
      for (let i = 0; i < data.length; i++) {
        this.$store.dispatch("ProductImage/AddProductImage", data[i]);
      }
      this.imageFiles = null;
      this.$emit("close");
    },
    onPickFile() {
      this.$refs.dropzoneFile.click();
    },
    remove(id){
       this.imageFiles = this.imageFiles.splice(id, 1);
    },
  },
};
</script>

<style>
.dropzone-wrapper {
  padding-top: 30px;
  margin-top: 20px;
  border: 1px dashed rgb(25, 4, 148);
}
.dropzone-wrapper p {
  text-align: center;
}
#dropzone-file {
  display: none;
}
.dropzone-label {
  margin-left: 222px;
}
.dropzone-label .dropzone-label-icon {
  font-size: 50px;
  padding-bottom: 15px;
}
.btn-dropzone {
  margin: 0 0 20px 190px;
}
.card-img:hover img{
  opacity: 0.4;
}
.card-img:hover .btn-remove{
  display: block;
}
.btn-remove{
  position: relative;
  top: -100px;
  right: -60px;
  display: none;
}
</style>
