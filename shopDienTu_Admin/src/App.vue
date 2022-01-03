<template>
  <v-app id="inspire">
    <Header @handleDrawer="drawer = !drawer" />
    <SideBar :drawer="drawer" :loginuser="user" />
    <v-main>
      <v-container class="py-6 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-dialog v-model="dialogLogin" persistent max-width="400px">
      <v-card flat tile>
        <v-card-title class="primary headline">
          <span style="color: white">Đăng nhập</span>
        </v-card-title>
        <div class="mx-5 my-3">


        <v-text-field
            v-model="username"
            label="Tên đăng nhập"
          ></v-text-field>
          <v-text-field
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="Mật khẩu"
          hint="At least 8 characters"
          v-model="password"
          class="input-group--focused"
          @click:append="show= !show"
        ></v-text-field>

        </div>
        <h4
          v-if="showFailureMessage"
          class="bg-danger text-white text-center p-2 red--text"
        >
          Sai tên tài khoản hoặc mật khẩu
        </h4>
        <v-card-actions>
          <div class="text-center">
            <v-btn width="370" color="primary" @click="handleAuth">
              Đăng nhập
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./layout/Header.vue";
import SideBar from "./layout/SideBar.vue";
export default {
  components: { SideBar, Header },
  name: "App",
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: false,
    dialogLogin: true,
    username: null,
    password: null,
    showFailureMessage: false,
    show: false,
    rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
  }),
  computed: {
    ...mapGetters({
        authenticated: "auth/authenticated",
        user: "auth/user",
      }),
  },
  methods: {
    async handleAuth() {
      this.$store.dispatch("auth/authenticate", {username: this.username, password: this.password});
      if (this.authenticated) {
        this.dialogLogin = false;
      } else {
        this.showFailureMessage = true;
      }
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
