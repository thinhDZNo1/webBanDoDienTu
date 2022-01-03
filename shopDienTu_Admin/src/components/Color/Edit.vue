<template>
  <v-dialog v-model="dialog" max-width="480px">
    <v-card flat tile>
      <v-card-title class="green headline">
        <span style="color: white">Thêm mới</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <div class="d-flex justify-center"><v-color-picker v-model="data.code"
      hide-inputs></v-color-picker>
                <v-text-field class="ml-3 my-auto" label="Mã màu" v-model="data.code"></v-text-field></div>

                <v-text-field v-model="data.name" label="Tên màu">
                </v-text-field>
          </v-container>
        </v-form>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" class="mr-2" dark @click="$emit('close')">
          Hủy bỏ </v-btn
        ><v-btn color="green" class="mr-4" dark @click="updateColor">
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
        code: "",
        createdDate: null,
        isActive: null,
      },
    };
  },
  props: ["dialogEdit", "currentColor"],
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
    currentColor: function () {
      this.data.id = this.currentColor.id,
      this.data.name = this.currentColor.name,
      this.data.code = this.currentColor.code
      this.data.createdDate = this.currentColor.createdDate,
      this.data.isActive = this.currentColor.isActive
    },
  },
  methods: {
    updateColor() {
      this.$store.dispatch("Color/UpdateColor", {
        color: this.data,
      });
      this.$emit("updateData");
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>
