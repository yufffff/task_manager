<template>
  <v-container>
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

    <v-list-item> リスト名：{{ selected_list }} </v-list-item>

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
    loadTodo: function () {
      let db = firebase.database();
      let list_name = "";

      if (this.selected_list) {
        list_name = this.selected_list;
      } else {
        list_name = "newlist";
      }

      console.log(list_name);

      this.dbPath = this.uid + "/" + list_name + "/items";
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
    saveTodo: function () {
      let db = firebase.database();
      db.ref(this.dbPath).set(this.items);
    },
    addList: function () {
      this.selected_list = this.newListName;
      this.items = [];
      this.dialog = false;
      setTimeout(this.loadTodo());
    },
    changeListName: function () {},
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
    let db = firebase.database();
    this.uid = firebase.auth().currentUser.uid;
    db.ref(this.uid).on("value", (data) => {
      if (data.val()) {
        const rootList = data.val();
        let list = [];
        Object.keys(rootList).forEach((key) => {
          list.push(key);
        });
        this.nav_lists = list;
      console.log(list)
      }
    });
    
    if (this.nav_lists) {
      this.selected_list = this.nav_lists[0];
      console.log(this.selected_list)
      this.loadTodo();
    }
  },
};
</script>
