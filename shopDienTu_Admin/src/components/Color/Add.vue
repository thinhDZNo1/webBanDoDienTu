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
        ><v-btn color="green" class="mr-4" dark @click="addColor">
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
        code:"",
        name: "",
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
    addColor() {
      this.$store.dispatch("Color/AddColor", this.data);
      this.data.code = "",
      this.data.name = "",
      this.$emit("updateData");
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>
