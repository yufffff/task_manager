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
        v-on:keyup.enter="signIn"
      ></v-text-field>
      <v-btn large @click="signIn" class="primary">サインイン</v-btn>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      アカウントをお持ちでない方は
      <router-link to="/signup">こちら</router-link>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Signin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    signIn: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(
          (user) => {
            this.$router.push("/");
          },
          (err) => {
            alert(err.message);
          }
        );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.signin {
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