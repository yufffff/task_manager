<template>
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
      <v-btn large @click="signUp" color="success">登録</v-btn>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      既にアカウントをお持ちの方は
      <router-link to="/signin">こちら</router-link>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/auth';

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
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

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>