<template>
  <v-dialog v-model="dialog" max-width="520px">
    <v-card flat tile>
      <v-card-title class="orange headline">
        <span style="color: white">Thêm mới</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
                <v-text-field v-model="data.name" label="Tên">
                </v-text-field>
          </v-container>
        </v-form>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" class="mr-2" dark @click="$emit('close')">
          Hủy bỏ </v-btn
        ><v-btn color="orange" class="mr-4" dark @click="addProductType">
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
        name: "",
        isActive: true,
      }
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
  },
  methods: {
    addProductType() {
      this.$store.dispatch("ProductType/AddProductType", this.data);
      this.name= "";
      this.$emit("close");
    }
  },
};
</script>

<style>
</style>
