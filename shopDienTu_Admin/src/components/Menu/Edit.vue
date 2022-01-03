<template>
  <v-dialog v-model="dialog" max-width="480px">
    <v-card flat tile>
      <v-card-title class="green headline">
        <span style="Menu: white">Thêm mới</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-text-field v-model="data.title" label="Tiêu đề">
                </v-text-field>
                <v-text-field v-model="data.url" label="Url">
                </v-text-field>
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
        ><v-btn Menu="green" class="mr-4" dark @click="updateMenu">
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
        title: "",
        url: "",
        status: "",
        createdDate: null,
        isActive: null,
      },
    };
  },
  props: ["dialogEdit", "currentMenu"],
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
  },
  watch: {
    currentMenu: function () {
      this.data.id = this.currentMenu.id,
      this.data.title = this.currentMenu.title,
      this.data.url = this.currentMenu.url,
      this.data.status = this.currentMenu.status,
      this.data.createdDate = this.currentMenu.createdDate,
      this.data.isActive = this.currentMenu.isActive
    },
  },
  methods: {
    updateMenu() {
      this.$store.dispatch("Menu/UpdateMenu", {
        menu: this.data,
      });
      this.$emit("updateData");
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>
