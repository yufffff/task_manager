<template>
  <!-- アカウント登録画面 -->
  <v-container>
    <v-app-bar app color="primary" dark clipped-left>
      <v-toolbar-title>アカウント登録</v-toolbar-title>
    </v-app-bar>
    <v-card class="mx-auto" max-width="500">
      <v-card-text>
        <v-text-field
          filled
          label="Eメールアドレス"
          v-model="username"
        ></v-text-field>
        <v-text-field
          filled
          type="password"
          label="パスワード"
          v-model="password"
          v-on:keyup.enter="signUp"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn large @click="signUp" color="success">登録</v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        既にアカウントをお持ちの方は
        <router-link to="/signin">こちら</router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Signup",
  title: "サインアップ",
  data() {
    return {
      username: "", // ユーザ名
      password: "", // パスワード
    };
  },
  methods: {
    // ユーザ登録
    signUp: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then((user) => {
          this.$router.replace("/signin");
          alert("アカウントが作成されました\rn" + this.username);
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>