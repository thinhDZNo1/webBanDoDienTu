<template>
  <div>
    <v-expand-transition>
      <v-btn
        icon
        color="#ffffff"
        v-if="showButton"
        class="btn-message transition-fast-in-fast-out"
        x-large
        elevation="6"
        @click="
          reveal = true;
          showButton = false;
        "
      >
        <v-badge left color="orange">
          <span slot="badge">5</span>
          <v-icon color="primary">mdi-message-text</v-icon>
        </v-badge>
      </v-btn>
    </v-expand-transition>
    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal message-box"
      >
        <v-card-actions
          class="pt-0 d-flex justify-space-between"
          style="background-color: blue"
        >
          <v-card-title class="pa-0 mt-2 ml-2" style="color: white">
            Tin nhắn
          </v-card-title>
          <v-btn
            icon
            dark
            @click="
              reveal = false;
              showButton = true;
            "
            class="mt-2"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-actions>
        <div
          ref="conversation"
          style="
            overflow: auto;
            height: 350px;
            position: relative;
            bottom: -25px;
          "
        >
          <div v-for="(item, index) in items" :key="index">
            <v-card-text
              v-if="item.isCustomer"
              class="mess-receive rounded-lg rounded-bl-0 mt-3 mx-3"
            >
              {{ item.message }}
            </v-card-text>
            <v-card-text
              v-if="item.isCustomer == false"
              class="mess-send rounded-lg rounded-br-0 mt-3 mx-3"
            >
              {{ item.message }}
            </v-card-text>
          </div>
        </div>
        <div class="d-flex">
          <v-textarea
            id="id"
            auto-grow
            outlined
            class="ma-2 pt-0"
            style="font-size: 14px; bottom: -25px"
            :clearable="true"
            row-height="15"
            rows="1"
            dense
            v-model="input"
          ></v-textarea>
          <emoji-picker @emoji="append" :search="search">
            <div
              class="emoji-invoker"
              slot="emoji-invoker"
              slot-scope="{ events: { click: clickEvent } }"
              @click.stop="clickEvent"
            >
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                />
              </svg>
            </div>
            <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
              <div class="emoji-picker">
                <div class="emoji-picker__search">
                  <input type="text" v-model="search" v-focus />
                </div>
                <div>
                  <div v-for="(emojiGroup, category) in emojis" :key="category">
                    <h5>{{ category }}</h5>
                    <div class="emojis">
                      <span
                        v-for="(emoji, emojiName) in emojiGroup"
                        :key="emojiName"
                        @click="insert(emoji)"
                        :title="emojiName"
                        >{{ emoji }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </emoji-picker>
          <v-btn icon class="mr-2 mt-9" @click="scrollToBottom">
            <v-icon> mdi-send </v-icon>
          </v-btn>
        </div>
        <div style="position: absolute; z-index: 2300; top: 55px; width: 100%">
          <v-card-text class="py-0" style="color: #a8a8a8">
            <v-icon
              style="
                color: #00a355;
                font-size: 18px;
                margin-bottom: 3px;
                margin-right: 8px;
              "
              >mdi-circle-slice-8</v-icon
            >
            Trả lời 24/7
          </v-card-text>
          <v-divider></v-divider>
        </div>
      </v-card>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  name: "ChatBox",
  data() {
    return {
      reveal: false,
      showButton: true,
      messages: [
        {
          message: "hello",
          isCustomer: true,
        },
        {
          message: "hello",
          isCustomer: true,
        },
        {
          message:
            "hello aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          isCustomer: true,
        },
        {
          message:
            "hello aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          isCustomer: true,
        },
        {
          message:
            "hello aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          isCustomer: true,
        },
        {
          message: "hi",
          isCustomer: false,
        },
      ],
      input: "",
      search: "",
    };
  },
  computed: {
    items() {
      const arr = [];
      for (var i = 0; i < this.messages.length; i++) {
        arr.push(this.messages[i]);
      }
      return arr;
    },
  },
  methods: {
    append(emoji) {
      this.input += emoji;
    },
    scrollToBottom() {
      var messageDisplay = this.$refs.conversation;
      messageDisplay.scrollTop = messageDisplay.scrollHeight;
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  updated() {
    var messageDisplay = this.$refs.conversation;
    messageDisplay.scrollTop = messageDisplay.scrollHeight;
  },
};
</script>

<style scoped>
.btn-message {
  position: fixed;
  background: white;
  z-index: 1000;
  right: 20px;
  bottom: 20px;
}
.btn-message .v-icon {
  font-size: 26px;
}
.message-box {
  position: fixed;
  z-index: 999;
  right: 20px;
  bottom: 20px;
  width: 300px;
  height: auto;
}
.mess-receive {
  width: 220px;
  background-color: rgb(224, 223, 223);
}
.mess-send {
  width: 220px;
  float: right;
  background-color: rgb(77, 160, 238);
}
.emoji-invoker {
  margin-top: 2.6rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  position: absolute;
  z-index: 99999;
  font-family: Montserrat;
  border: 1px solid #ccc;
  height: 20rem;
  top: 120px;
  right: 0px;
  overflow: auto;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>
