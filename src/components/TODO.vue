<template>
  <v-container
    v-on:click.prevent="
      swiped = false;
      eventIndex = null;
    "
  >
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

    <draggable
      v-model="items"
      @change="saveTodo"
      handle=".sort"
      animation="200"
    >
      <template v-for="(item, i) in items">
        <v-list-item
          :key="`${i}`"
          v-touch="{
            left: () => onSwipe(`${i}`),
          }"
        >
          <v-checkbox
            v-model="item.isChecked"
            :label="item.title"
            :color="(item.isChecked && 'grey') || 'primary'"
            v-on:change="saveTodo"
          />
          <v-spacer></v-spacer>

          <EditTODO
            v-if="eventIndex != `${i}` && sortable == false"
            :editing="item"
            :sortable="sortable"
            v-on:saveTodo="saveTodo"
          />

          <v-icon class="sort" v-if="sortable == true && swiped == false"
            >mdi-menu</v-icon
          >

          <!-- <v-btn color="red" tile><v-icon color="white">mdi-trash-can-outline</v-icon></v-btn> -->
          <v-slide-x-reverse-transition>
            <v-btn
              color="red"
              tile
              v-if="!sortable && swiped && eventIndex == `${i}`"
              v-on:click="deleteTodo(eventIndex)"
              ><span class="white--text">削除</span></v-btn
            >
          </v-slide-x-reverse-transition>
        </v-list-item>
      </template>
    </draggable>

    <v-footer fixed padless app>
      <v-bottom-navigation>
        <NewList v-on:addList="addList" />
        <EditList
          :editing="selected_list"
          v-on:changeListName="changeListName"
        />

        <v-btn v-on:click="sortable = !sortable">
          <span v-if="sortable != true">編集モード</span>
          <span v-if="sortable == true">並替モード</span>
          <v-icon v-if="sortable != true">mdi-wrench</v-icon>
          <v-icon v-if="sortable == true">mdi-sort</v-icon>
        </v-btn>
        <v-btn v-on:click="deleteCheckedAll()"
          ><span>チェック済</span><v-icon>mdi-delete</v-icon></v-btn
        >
        <v-btn v-on:click="signOut()"
          ><span>ログアウト</span><v-icon>mdi-logout</v-icon></v-btn
        >
      </v-bottom-navigation>
    </v-footer>
  </v-container>
</template>

<script>
import firebase from "firebase";
import draggable from "vuedraggable";
import EditTODO from "@/components/EditTODO";
import EditList from "@/components/EditList";
import NewList from "@/components/NewList";

export default {
  name: "TODO",
  components: {
    draggable,
    EditTODO,
    EditList,
    NewList,
  },
  data() {
    return {
      newItemTitle: "",
      editing: {},
      sortable: false,
      swiped: false,
      eventIndex: null,
      uid: "",
      db: {},
      nav_lists: [],
      selected_list: "",
      items: [],
    };
  },
  methods: {
    onSwipe: function (eventIndex) {
      this.swiped = false;
      if (this.sortable) return;
      this.eventIndex = eventIndex;
      this.swiped = true;
    },
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
    deleteTodo: function (eventIndex) {
      console.log("delete todo");
      this.db.ref(this.dbPath + "/" + eventIndex).remove();
      this.saveTodo();
    },
    deleteCheckedAll: function () {
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
    addList: function (newListName) {
      console.log("add list");
      this.nav_lists.push(newListName);
      this.selected_list = this.newListName;
      this.items = [];
      this.newlist = false;
      this.loadTodo();
    },
    changeList: function () {
      console.log("combo changed");
      this.loadTodo();
    },
    changeListName: function (newListName) {
      console.log("change list name");
      let dbPath = this.uid + "/" + newListName + "/items";
      this.db.ref(dbPath).set(this.items);
      this.db.ref(this.uid + "/" + this.selected_list).remove();

      this.selected_list = newListName;
    },
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
          // console.log(list);
          this.nav_lists = list;

          if (this.selected_list == "") {
            this.selected_list = this.nav_lists[0];
            this.changeList();
          }
        } else {
          console.log("no data");
          if (this.nav_lists.length == 0) {
            this.nav_lists.push("新規リスト");
          }
          if (this.selected_list == "") {
            this.selected_list = this.nav_lists[0];
            this.changeList();
          }
        }
      });
    }
  },
};
</script>
