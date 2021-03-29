<template>
  <!-- ログイン画面 -->
  <v-container>
    <v-app-bar app color="primary" dark clipped-left>
      <v-toolbar-title>サインイン</v-toolbar-title>
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
          v-on:keyup.enter="signIn"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn large @click="signIn" class="primary">サインイン</v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        アカウントをお持ちでない方は
        <router-link to="/signup">こちら</router-link>
      </v-card-text>
    </v-card>
  </v-container>
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