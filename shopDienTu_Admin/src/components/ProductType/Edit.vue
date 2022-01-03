<template>
  <v-dialog v-model="dialog" max-width="520px">
    <v-card flat tile>
      <v-card-title class="orange headline">
        <span style="color: white">Thêm mới</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
                <v-text-field v-model="data.name" label="Tiêu đề">
                </v-text-field>
          </v-container>
        </v-form>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" class="mr-2" dark @click="$emit('close')">
          Hủy bỏ </v-btn
        ><v-btn color="orange" class="mr-4" dark @click="updateProductType">
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
        createdDate: null,
        isActive: null,
      },
      editorOption: {
        /* quill options */
      },
    };
  },
  props: ["dialogEdit", "currentProductType"],
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
    currentProductType: function () {
      this.data.id = this.currentProductType.id,
      this.data.name = this.currentProductType.name,
      this.data.description = this.currentProductType.description,
      this.data.createdDate = this.currentProductType.createdDate,
      this.data.isActive = this.currentProductType.isActive
    },
  },
  methods: {
    updateProductType() {
      this.$store.dispatch("ProductType/UpdateProductType", {
        ProductType: this.data,
      });
      this.$emit("updateData");
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>
