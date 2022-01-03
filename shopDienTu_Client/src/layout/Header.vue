<template>
  <div>
    <v-app-bar app color="#f7f7f7 " class="customtoolbar" dark height="145">
      <div style="width: 100%">
        <div class="d-flex nav-top">
          <p class="my-auto ml-10 mr-2 nav-top-item">
            <v-icon size="19" class="mb-1">mdi-phone</v-icon
            ><span class="ml-2">0857723345</span>
          </p>
          <span>|</span>
          <p class="my-auto ml-2 nav-top-item">
            <v-icon size="19" class="mb-1">mdi-email</v-icon
            ><span class="ml-2">thinhtran098o@gmail.com</span>
          </p>
          <v-spacer></v-spacer>
          <a href="" class="nav-top-item mr-2">Dịch vụ</a>
          <span>|</span>
          <a href="" class="nav-top-item mr-10">Hỗ trợ</a>
        </div>
        <div class="d-flex middle-header">
          <v-toolbar-title class="mr-10 ml-12 text-center" style="width: 200px">
            <a href="/" class="white--text" style="text-decoration: none">
              <img src="../assets/images/logo.png" width="110" alt="" />
            </a>
          </v-toolbar-title>
          <div class="search-box ml-12 mr-12">
            <v-text-field
              lable="Search"
              v-model="keyWord"
              flat
              append-icon="mdi-magnify"
              solo-inverted
              hide-details
              @keyup.enter="search"
            ></v-text-field>
          </div>
          <div class="ml-10">
            <v-btn icon large @click="viewCard">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
            <v-btn icon class="ml-3" large @click="dialog = true">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="bottom-header d-flex">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div
                class="ml-12 d-flex category justify-space-between"
                v-bind="attrs"
                v-on="on"
              >
                <p class="my-auto">Danh mục</p>
                <v-icon class="mr-3">mdi-menu</v-icon>
              </div>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in listCategory" :key="index">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <div class="d-flex nav-btn">
            <v-btn color="error" tile>Trang chủ</v-btn>
          </div>
          <div class="nav-menu">
            <v-list dense color="#f7f7f7">
              <v-list-item-group v-model="selectedItem" class="d-flex">
                <v-list-item v-for="(item, i) in listMenu" :key="i">
                  <v-list-item-content>
                    <router-link :to="item.url" class="text-decoration-none">
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                    </router-link>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </div>
      </div>
    </v-app-bar>
    <v-dialog v-model="dialog" width="300px">
      <v-card flat tile>
        <v-card-title class="primary headline">
          <span style="color: white">Đăng nhập</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="username" label="Tên tài khoản">
          </v-text-field>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-2"
            label="Mật khẩu"
            hint="At least 8 characters"
            v-model="password"
            class="input-group--focused"
            @click:append="show3 = !show3"
          ></v-text-field>
          <p v-if="error" class="red--text">Sai tên tài khoản hoặc mật khẩu</p>
          <v-divider></v-divider>
        </v-card-text>
        <div class="d-block ml-5">
          <v-btn
            color="primary"
            class="mr-4 mb-2"
            width="260"
            dark
            @click="login"
          >
            Đăng nhập
          </v-btn>
          <v-btn
            color="pink"
            class="mr-4 mb-6"
            style="margin-left: 80px"
            dark
            @click="(dialog = false), (dialogRegister = true)"
          >
            Đăng ký
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogRegister" width="500px">
      <v-card flat tile>
        <v-card-title class="primary headline">
          <span style="color: white">Đăng Ký</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              ><v-text-field v-model="dataRegister.firstName" label="Tên">
              </v-text-field
            ></v-col>
            <v-col
              ><v-text-field v-model="dataRegister.lastName" label="Họ">
              </v-text-field
            ></v-col>
          </v-row>
          <v-text-field v-model="dataRegister.username" label="Tên tài khoản">
          </v-text-field>
          <v-text-field v-model="dataRegister.email" label="Email">
          </v-text-field>
          <v-text-field v-model="dataRegister.phone" label="Phone">
          </v-text-field>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-2"
            label="Mật khẩu"
            hint="At least 8 characters"
            v-model="dataRegister.password"
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
          <p v-if="errorR" class="red--text">Tạo tài khoản Không thành công</p>
          <v-divider></v-divider>
        </v-card-text>
        <div class="d-block ml-5">
          <v-btn
            color="primary"
            class="mr-4 mb-2"
            width="450"
            dark
            @click="register"
          >
            Đăng ký</v-btn
          >
          <v-btn
            color="pink"
            class="mr-4 mb-6"
            style="margin-left: 165px"
            dark
            @click="(dialog = true), (dialogRegister = false)"
          >
            Đăng nhập
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      dataRegister: {
        firtName: "",
        lastName: "",
        email: "",
        phone: "",
        userName: "",
        password: "",
      },
      selectedItem: 1,
      keyWord: "",
      dialog: false,
      username: "",
      password: "",
      show: false,
      show2: false,
      error: false,
      errorR: false,
      pasCheck: "",
      dialogRegister: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },

  mounted() {
    this.$store.dispatch("Category/GetAllCategory");
    this.$store.dispatch("Menu/GetAllMenu");
  },
  computed: {
    ...mapGetters({
      listCategory: "Category/listCategory",
      listMenu: "Menu/listMenu",
      user: "User/user",
      check: "User/check",
    }),
  },
  methods: {
    login() {
      this.$store.dispatch("User/Login", {
        username: this.username,
        password: this.password,
      });
      if (this.user !== null) {
        this.dialog = false;
      } else {
        this.error = true;
      }
    },
    register() {
      if (this.dataRegister.password === this.pasCheck) {
        this.$store.dispatch("User/AddUser", this.dataRegister);
        if (this.check === true) {
          this.dialogRegister = false;
          this.dialog = true;
          this.dataRegister.firtName = "";
          this.dataRegister.lastName = "";
          this.dataRegister.email = "";
          this.dataRegister.phone = "";
          this.dataRegister.userName = "";
          this.dataRegister.password = "";
        }
      } else {
        this.errorR = true;
      }
    },
    search() {
      this.$router.push({ name: "Search", params: { keyWord: this.keyWord } });
      this.keyWord = "";
    },
    viewUser() {},
    viewCard() {
      this.$router.push("/Cart");
    },
  },
};
</script>

<style scoped>
.middle-header {
  padding: 10px 20px;
  background-color: #1976d2;
}
.customtoolbar >>> .v-toolbar__content {
  padding: 0px !important;
}
.nav-top {
  background: #f7f7f7;
  color: #717171;
}
.nav-top i {
  color: #717171;
}
.nav-top-item {
  font-size: 15px;
  color: #717171;
  text-decoration: none;
}
.category {
  background-color: #60c496;
  padding-left: 25px;
  height: 52px;
  width: 220px;
}
.search-box >>> .v-input__control {
  width: 600px !important;
}
.nav-btn >>> .v-btn {
  height: 51px !important;
}
.nav-menu >>> .v-list {
  padding: 0px !important;
}
.nav-menu >>> .v-list-item__content .v-list-item__title {
  color: black !important;
  height: 35px;
  font-size: 16px;
  padding-top: 10px;
}
.bottom-header {
}
</style>
