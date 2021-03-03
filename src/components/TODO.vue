<template>
  <v-container>
    <v-select
      :items="nav_lists"
      @change="changeList"
      v-model="selected_list"
      label="選択中のリスト"
      outlined
    ></v-select>

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

    <v-list-item v-for="item in items" :key="item.title">
      <v-checkbox
        v-model="item.isChecked"
        :label="item.title"
        v-on:change="saveTodo"
      />
    </v-list-item>

    <v-footer fixed padless app>
      <v-bottom-navigation>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on"
              ><v-icon>mdi-text-box-plus-outline</v-icon></v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">新規リスト作成</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newListName"
                      label="リストの名前"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="
                  dialog = false;
                  newListName = '';
                "
              >
                キャンセル
              </v-btn>
              <v-btn color="blue darken-1" text @click="addList()">
                追加
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn v-on:click="deleteTodo()"><v-icon>mdi-delete</v-icon></v-btn>
        <v-btn v-on:click="signOut()"><v-icon>mdi-logout</v-icon></v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-container>
  <!-- </v-card> -->
</template>

<script>
import firebase from "firebase";
export default {
  name: "TODO",
  data() {
    console.log("data");
    return {
      drawer: null,
      dialog: false,
      newItemTitle: "",
      newListName: "",
      db: {},
      uid: "",
      nav_lists: [],
      selected_list: "",
      items: [],
    };
  },
  methods: {
    addTodo: function () {
      console.log("add todo");

      if (this.checkItem()) {
        this.items.push({
          title: this.newItemTitle,
          isChecked: false,
        });
        console.log(this.selected_list);
        this.saveTodo();
      }
      this.newItemTitle = "";
    },
    deleteTodo: function () {
      this.items = this.items.filter(function (item) {
        return item.isChecked === false;
      });
      this.saveTodo();
    },
    loadTodo: function () {
      console.log("loaded");

      this.dbPath = this.uid + "/" + this.selected_list + "/items";

      this.db.ref(this.dbPath).on("value", (data) => {
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
    saveTodo: function () {
      console.log("save");
      this.db.ref(this.dbPath).set(this.items);
    },
    addList: function () {
      console.log("add list");
      this.nav_lists.push(this.newListName);
      this.selected_list = this.newListName;
      this.items = [];
      this.dialog = false;
      this.loadTodo();
    },
    changeList: function () {
      console.log("combo changed");
      this.loadTodo();
    },
    changeListName: function () {},
    checkItem: function () {
      console.log("check item");

      let result = true;

      try {
        if (!this.selected_list)
          throw new Error("保存先のリストを選択してください");

        Object.keys(this.items).forEach((key) => {
          let title = this.items[key].title;
          if (title == this.newItemTitle)
            throw new Error("そのタスク名は既に存在しています");
        });
      } catch (err) {
        result = false;
        alert(err);
      }

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
    console.log("mounted");
    this.db = firebase.database();
    this.uid = firebase.auth().currentUser.uid;
    if (this.selected_list.length == 0) {
      this.db.ref(this.uid).on("value", (data) => {
        if (data.val()) {
          const rootList = data.val();
          let list = [];
          Object.keys(rootList).forEach((key) => {
            list.push(key);
          });
          console.log(list);
          this.nav_lists = list;

          if (this.nav_lists.length == 0) {
            this.nav_lists.push("newlist");
          }
          
          if(this.selected_list == "") {
            this.selected_list = this.nav_lists[0];
            this.changeList();
          }
        }
      });
    }
  },
};
</script>
