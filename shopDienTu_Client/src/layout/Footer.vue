<template>
  <div>
    <v-footer color="primary" dark style="font-size:14px" padless>
      <v-row class="mx-13 mt-4">
        <v-col cols="5" class="contact">
          <div class="d-flex">
            <img src="../assets/images/logo.png" width="150" alt="">
          </div>
          <p>
            <v-icon>mdi-map-marker</v-icon>
            <span
              >Địa chỉ: Thôn Kim Quan Sơn, xã Hà Ngọc, huyện Hà Trung, tỉnh
              Thanh Hóa</span
            >
          </p>
          <p>
            <v-icon>mdi-phone</v-icon>
            <span>Điện thoại: 0123456789</span>
          </p>
          <p>
            <v-icon>mdi-email</v-icon>
            <span>thinhtran098o@gmail.com</span>
          </p>
          <p>
            <v-icon>mdi-web</v-icon>
            <span></span>
          </p>
          <p>Theo dõi chúng tôi:</p>
          <div class="lien-he">
            <v-icon>mdi-facebook</v-icon>
            <v-icon>mdi-twitter</v-icon>
            <v-icon>mdi-instagram</v-icon>
            <v-icon>mdi-youtube</v-icon>
          </div>
        </v-col>
        <v-col cols="2" >
          <v-list color="primary" dense>
            <v-list-item-group >
              <v-list-item v-for="(item, i) in menu" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.text" style="font-size:14px; font-weight: normal;"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="2">
          <v-list color="primary" dense>
            <v-list-item-group>
              <v-list-item v-for="(item, i) in category" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"  style="font-size:14px; font-weight: normal;"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col>
          <p class="title">Bản đồ:</p>
          <iframe class="ml-4" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.1295021904107!2d105.7565695143671!3d20.94731389593087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452eaa9c461c3%3A0x2a3e1c421f299adc!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyDEkOG6oWkgTmFt!5e0!3m2!1svi!2s!4v1637502219890!5m2!1svi!2s" width="260" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center" style="background: #1941a4; height: 35px;">
        <p class="mt-2">Copyright &copy; 2021 by ThinhdzNo1</p>
      </v-row>
    </v-footer>

  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      menu:[
        { text: 'Trang chủ'},
        { text: 'Giới thiệu'},
        { text: 'Dịch vụ'},
        { text: 'Tin tức và sự kiện'},
        { text: 'Liên hệ'},
      ],
      category:[
        { text: 'Đồ gia dụng'},
        { text: 'Laptop'},
        { text: 'Điện thoại'},
      ],
    };
  },
};
</script>

<style scoped>
  .lien-he i{
    font-size: 30px !important;
    margin-right: 15px !important;
}
  .contact i{
    font-size:14px;
    margin-right: 5px;
  }
  .title{
    font-size:16px !important;
  }
</style>
