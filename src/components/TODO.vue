<template>
  <v-app>
    <v-app-bar color="primary" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>タスクマネージャ</v-toolbar-title>
    </v-app-bar>

    <v-container>
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
            <v-list-item
              v-for="list in nav_lists"
              :key="list.name"
              @click="list.click ? undefined : ''"
            >
              <v-list-item-action>
                <v-list-item-title>{{ list.name }}</v-list-item-title>
              </v-list-item-action>
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

      <v-text-field
        v-model="newItemTitle"
        label="TODOを入力しましょう！"
        solo
        v-on:keyup.enter="addTodo"
      >
        <template v-slot:append>
          <v-fade-transition>
            <v-icon v-if="newItemTitle" @click="addTodo()">
              mdi-plus-circle-outline
            </v-icon>
          </v-fade-transition>
        </template>
      </v-text-field>

      <v-list-item v-for="item in items" :key="item.title" clipped>
        <label v-bind:class="{ done: item.isChecked }">
          <input
            type="checkbox"
            v-model="item.isChecked"
            v-on:change="saveTodo"
          />
          {{ item.title }}
        </label>
      </v-list-item>
    </v-container>

      <!-- <v-card flat tile width="100%"> -->
      <v-footer fixed padless app>
        <v-bottom-navigation>
          <v-btn v-on:click="deleteTodo()"><v-icon>mdi-delete</v-icon></v-btn>
        </v-bottom-navigation>
      </v-footer>
      <!-- </v-card> -->
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  name: "TODO",
  data() {
    return {
      drawer: null,
      newItemTitle: "",
      dbPath: "",
      items: [],
      nav_lists: [],
    };
  },
  methods: {
    addTodo: function () {
      if (this.checkItem()) {
        this.items.push({
          title: this.newItemTitle,
          isChecked: false,
        });
        this.saveTodo();
      } else {
        alert("既に同じタスクが存在します");
      }
      this.newItemTitle = "";
    },
    deleteTodo: function () {
      this.items = this.items.filter(function (item) {
        return item.isChecked === false;
      });
      this.saveTodo();
    },
    saveTodo: function () {
      var db = firebase.database();
      db.ref(this.dbPath).set(this.items);
    },
    loadTodo: function () {
      let uid = firebase.auth().currentUser.uid;
      this.dbPath = uid + "/items";
      var db = firebase.database();
      db.ref(this.dbPath).on("value", (data) => {
        if (data) {
          const rootList = data.val();
          let list = [];

          if (rootList != null) {
            Object.keys(rootList).forEach((key) => {
              list.push(rootList[key]);
            });
            this.items = list;
          }
        }
      });
    },
    checkItem: function () {
      let result = true;
      Object.keys(this.items).forEach((key) => {
        let title = this.items[key].title;
        if (title == this.newItemTitle) result = false;
      });
      return result;
    },
    signOut: function () {
      if (this.isSignIn == false) return;

      this.nav_lists = [];

      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/signin", () => {});
        });
    },
  },
  mounted: function () {
    this.loadTodo();
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
};
</script>
