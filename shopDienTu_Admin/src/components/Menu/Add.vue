<template>
  <v-dialog v-model="dialog" max-width="480px">
    <v-card flat tile>
      <v-card-title class="green headline">
        <span style="menu: white">Thêm mới</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-text-field v-model="data.title" label="Tiêu đề"> </v-text-field>
            <v-text-field v-model="data.url" label="Url"> </v-text-field>
            <v-text-field v-model="data.status" label="Trạng thái">
            </v-text-field>
          </v-container>
        </v-form>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn Menu="grey darken-1" class="mr-2" dark @click="$emit('close')">
          Hủy bỏ </v-btn
        ><v-btn Menu="green" class="mr-4" dark @click="addMenu"> Lưu </v-btn>
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
        status: "",
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
  },
  methods: {
    addMenu() {
      this.$store.dispatch("Menu/AddMenu", this.data);
      this.data.title = "";
      this.data.status = "";
      this.data.url = "";
      this.$emit("updateData");
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>
