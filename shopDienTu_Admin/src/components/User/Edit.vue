<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card flat tile>
      <v-card-title class="primary headline">
        <span style="color: white">Chỉnh sửa tài khoản</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="4" class="pt-10">
                <img
                  ref="avatar"
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
                <v-row>
                  <v-col>
                    <v-text-field v-model="data.lastName" label="Họ">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="data.firstName" label="Tên">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      :items="ListSex"
                      v-model="data.sex"
                      label="Giới tính"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="data.birthDay"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="data.birthDay"
                          label="Ngày sinh"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="data.birthDay" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(data.birthDay)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="data.email" no-resize label="email">
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="data.phone"
                      no-resize
                      label="Số điện thoại"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                      v-model="data.address"
                      no-resize
                      label="Địa chỉ"
                    >
                </v-text-field>

                <v-text-field
                      v-model="data.userName"
                      no-resize
                      label="Tên tài khoản"
                    >
                </v-text-field>
                <v-text-field
                      v-model="data.password"
                      no-resize
                      label="mật khẩu"
                    >
                </v-text-field>
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
        ><v-btn color="primary" class="mr-4" dark @click="updateUser">
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
      ListSex: ["Nam", "Nữ", "Khác"],
      menu: false
    };
  },
  props: ["dialogEdit", "currentUser"],
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
      this.$store.dispatch("User/UpdateUser", {
        user: this.data,
      });
      this.$emit("updateData");
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
