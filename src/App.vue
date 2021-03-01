<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2">
              メニュー
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item v-for="list in nav_lists" :key="list.name">
            <v-list-item-content>
              <v-list-item-title>{{ list.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list-item @click="signOut">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-action>
            <v-list-item-title class="text--darken-2">
              ログアウト
            </v-list-item-title>
          </v-list-item-action>
        </v-list-item>

      </v-container>
    </v-navigation-drawer>

    <v-app-bar color="primary" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>タスクマネージャ</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  name: "App",
  data() {
    return {
      drawer: null,
      nav_lists: [],
    };
  },
  methods: {
    getNavigation: function () {
      let db = firebase.database();
      db.ref("nav_lists").on("value", (data) => {
        if (data) {
          const rootList = data.val();
          let list = [];
          if (rootList != null) {
            Object.keys(rootList).forEach((val) => {
              list.push(rootList[val]);
            });
            this.nav_lists = list;
          }
        }
      });
    },
    signOut: function(){
      firebase.auth().signOut().then(()=>{
        this.$router.push('/signin')
      })
    }
  },
  mounted: function () {
    this.getNavigation();
  },
};
</script>
