<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card flat tile>
      <v-card-title class="primary headline">
        <span style="color: white">Đổi mật khẩu</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="Mật khẩu hiện tại"
          hint="At least 8 characters"
          v-model="password"
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>
        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          label="Mật khẩu"
          hint="At least 8 characters"
          v-model="pasCheck"
          class="input-group--focused"
          @click:append="show2 = !show2"
        ></v-text-field>
        <v-text-field
          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show3 ? 'text' : 'password'"
          name="input-10-2"
          label="Mật khẩu"
          hint="At least 8 characters"
          v-model="pasCheck2"
          class="input-group--focused"
          @click:append="show3 = !show3"
        ></v-text-field>
        <p v-if="error" class="red--text">Lỗi</p>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" class="mr-2" dark @click="$emit('close')">
          Hủy bỏ </v-btn
        ><v-btn color="primary" class="mr-4" dark @click="updateUser">
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ChangePass",
  data() {
    return {
      data: {
        id: 0,
        firstName: "",
        lastName: "",
        avatar: "",
        sex: "Nam",
        address: "",
        email: "email@example.com",
        phone: "",
        userName: "",
        imageFile: "",
        password: "",
        roleName: "",
        isActive: true,
        birthDay: null,
      },
      ListSex: ["Nam", "Nữ", "Khác"],
      menu: false,
      show: false,
      password: "",
      show2: false,
      show3: false,
      passCheck: "",
      passCheck2: "",
      error: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  props: ["dialogChange", "currentUser"],
  computed: {
    dialog: {
      get() {
        return this.dialogChange;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  watch: {
    currentUser: function () {
      (this.data.id = this.currentUser.id),
        (this.data.firstName = this.currentUser.firstName),
        (this.data.lastName = this.currentUser.lastName),
        (this.data.avatar = this.currentUser.avatar),
        (this.data.address = this.currentUser.address),
        (this.data.sex = this.currentUser.sex),
        (this.data.birthDay = this.currentUser.birthDay),
        (this.data.email = this.currentUser.email),
        (this.data.phone = this.currentUser.phone),
        (this.data.userName = this.currentUser.userName),
        (this.data.password = this.currentUser.password),
        (this.data.imageFile = this.currentUser.imageFile),
        (this.data.isActive = this.currentUser.isActive),
        (this.data.createdDate = this.currentUser.createdDate);
    },
  },
  methods: {
    updateUser() {
      if (this.passCheck === this.passCheck2) {
        if (this.data.password === this.password) {
          this.$store.dispatch("User/UpdateUser", {
            user: this.data,
          });
          this.
          this.$emit("close");
        } else {
          this.error = true;
        }
      } else {
        this.error = true;
      }
      this.password= "";
      this.passCheck= "";
      this.passCheck2= "";
    },
  },
};
</script>

<style>
</style>
