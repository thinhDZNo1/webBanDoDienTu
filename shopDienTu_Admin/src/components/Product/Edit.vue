<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card flat tile>
      <v-card-title class="primary headline">
        <span style="color: white">Chỉnh sửa</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="4" class="pt-10">
                <img
                  ref="productImage"
                  :src="'data:image/jpeg;base64,' + data.imageFile"
                  width="250"
                  height="250"
                  alt=""
                />
                <v-btn
                  raised
                  class="primary"
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
              </v-col>
              <v-col>
                <v-text-field v-model="data.name" label="Tên sản phẩm">
                </v-text-field>
                <p class="pl-1 mb-0">Mô tả</p>
                <quill-editor
                  v-model="data.description"
                  ref="myQuillEditor"
                  :options="editorOption"
                >
                </quill-editor>
                <p class="pl-1 mb-0">Mô tả ngắn</p>
                <quill-editor
                  v-model="data.shortDescription"
                  ref="myQuillEditor"
                  :options="editorOption"
                >
                </quill-editor>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="data.categoryDetailId"
                      :items="listCD"
                      item-text="name"
                      item-value="id"
                      label="Chọn loại sản phẩm"
                      return-object
                    >
                    </v-select>
                  </v-col>
                  <v-col
                    ><v-select
                      v-model="data.companyId"
                      :items="listCompany"
                      item-text="name"
                      item-value="id"
                      label="chọn thương hiệu"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="data.quantity"
                      no-resize
                      label="Số lượng"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="data.price" no-resize label="Giá">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="data.discount"
                      no-resize
                      label="Giảm giá"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col>
                    <v-select
                      :items="ListStatus"
                      v-model="data.status"
                      label="Trạng thái"
                    ></v-select>
                  </v-col>
                </v-row>
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
        ><v-btn color="primary" class="mr-4" dark @click="updateProduct()">
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState} from "vuex";
export default {
  name: "Edit",
  data() {
    return {
      data: {
        id: 0,
        name: "",
        images: "",
        imageFile: "",
        price: 0,
        discount: 0,
        status: 1,
        quantity: 0,
        description: "",
        companyId: 1,
        categoryDetailId: 1,
        isActive: true,
        createdDate: null,
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
  props: ["dialogEdit", "currentProduct"],
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
    ...mapState({
      listCD: (state) => state.CategoryDetail.listCD,
      listCompany: (state) => state.Company.listCompany,
    }),
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  created() {
    this.$store.dispatch("CategoryDetail/GetAllCD");
    this.$store.dispatch("Company/GetAllCompany");
  },
  watch: {
    currentProduct: function () {
      (this.data.id = this.currentProduct.id),
        (this.data.name = this.currentProduct.name),
        (this.data.images = this.currentProduct.images),
        (this.data.imageFile = this.currentProduct.imageFile),
        (this.data.price = this.currentProduct.price),
        (this.data.discount = this.currentProduct.discount),
        (this.data.status = this.currentProduct.status),
        (this.data.quantity = this.currentProduct.quantity),
        (this.data.description = this.currentProduct.description),
        (this.data.companyId = this.currentProduct.companyId),
        (this.data.categoryDetailId = this.currentProduct.categoryDetailId),
        (this.data.isActive = this.currentProduct.isActive),
        (this.data.createdDate = this.currentProduct.createdDate);
    },
  },
  methods: {
    updateProduct() {
      this.$store.dispatch("Product/UpdateProduct", {
        product: this.data,
      });
      this.$emit("updateData");
      this.$emit("close");
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.data.description = html;
    },

    onEditorChange2({ quill, html, text }) {
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
        this.$refs.productImage.src = fileReader.result;
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
