<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import TODO from "@/components/TODO";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    signOut: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/signin", () => {});
        });
    },
  },
  computed: {
    title: function () {
      console.log(TODO);
      return TODO.data().selected_list
        ? TODO.data().selected_list
        : "タスクマネージャ";
    },
  },
};
</script>
