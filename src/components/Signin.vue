<template>
  <!-- ログイン画面 -->
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
        v-on:keyup.enter="signIn"
      ></v-text-field>
      <v-btn large @click="signIn" class="primary">ログイン</v-btn>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      アカウントをお持ちでない方は
      <router-link to="/signup">こちら</router-link>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Signin",
  title: "サインイン",
  data() {
    return {
      username: "", // ユーザ名
      password: "", // パスワード
    };
  },
  methods: {
    // ログイン
    signIn: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(
          (user) => {
            this.$router.push("/", () => {});
          },
          (err) => {
            alert(err.message);
          }
        );
    },
  },
};
</script>