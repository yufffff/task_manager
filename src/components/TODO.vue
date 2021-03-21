<template>
  <v-container
    v-on:click.prevent="
      swiped = false;
      eventIndex = null;
    "
  >
    <v-app-bar app color="primary" dark>
      <v-toolbar-items max-width="250px">
        <v-select
          filled
          dense
          :items="aryLists"
          @change="changeList"
          v-model="selected_list"
          label="選択中のリスト"
        ></v-select>
        <NewList v-on:addList="addList" />
        <EditList
          :editing="selected_list"
          v-on:changeListName="changeListName"
        />
      </v-toolbar-items>
      <v-spacer />
    </v-app-bar>

    <draggable
      v-model="items"
      @change="saveTodo"
      handle=".sort"
      animation="200"
    >
      <template v-for="(item, i) in items">
        <!-- <v-divider :key="`${i}`" v-if="i !== 0"></v-divider> -->
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
      <NewTODO v-on:addTodo="addTodo" />
      <v-bottom-navigation>
        <v-btn v-on:click="sortable = !sortable">
          <span v-if="sortable != true">並替</span>
          <span v-if="sortable == true">編集</span>
          <v-icon v-if="sortable == true">mdi-wrench</v-icon>
          <v-icon v-if="sortable != true">mdi-sort</v-icon>
        </v-btn>
        <v-btn v-on:click="deleteCheckedAll()">
          <span>完了</span><v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn v-on:click="signOut()">
          <span>ログアウト</span><v-icon>mdi-logout</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
      </v-bottom-navigation>
    </v-footer>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import draggable from "vuedraggable";
import NewTODO from "@/components/NewTODO";
import EditTODO from "@/components/EditTODO";
import NewList from "@/components/NewList";
import EditList from "@/components/EditList";

export default {
  name: "TODO",
  components: {
    draggable,
    NewTODO,
    EditTODO,
    EditList,
    NewList,
  },
  data() {
    return {
      editing: {},
      sortable: true,
      swiped: false,
      eventIndex: null,
      uid: "",
      db: {},
      aryLists: [],
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
    addTodo: function (newItemTitle) {
      if (this.checkItem(newItemTitle)) {
        this.items.push({
          title: newItemTitle,
          isChecked: false,
        });
        this.saveTodo();
      }
    },
    deleteTodo: function (eventIndex) {
      console.log("deleteTodo");
      this.db.ref(this.dbPath + "/" + eventIndex).remove();
      this.loadTodo();
    },
    deleteCheckedAll: function () {
      this.items = this.items.filter(function (item) {
        return item.isChecked === false;
      });
      this.saveTodo();
    },
    loadTodo: function () {
      console.log("loadTodo");
      console.log(this.selected_list);

      this.dbPath = this.uid + "/" + this.selected_list + "/items";

      this.db.ref(this.dbPath).on("value", (data) => {
        let list = [];
        if (data) {
          const rootList = data.val();

          if (rootList != null) {
            Object.keys(rootList).forEach((key) => {
              list.push(rootList[key]);
            });
          }
        }
        this.items = list;
      });
    },
    saveTodo: function () {
      console.log("saveTodo");
      this.db.ref(this.dbPath).set(this.items);
    },
    addList: function (newListName) {
      console.log("addList");
      this.aryLists.push(newListName);
      this.selected_list = newListName;
      this.items = [];
      this.newlist = false;
      this.loadTodo();
    },
    changeList: function () {
      console.log("changeList");
      this.loadTodo();
    },
    changeListName: function (newListName) {
      if (this.aryLists.length > 1) {
        let oldListName = this.selected_list;
        let dbPath = this.uid + "/" + newListName + "/items";
        this.db.ref(dbPath).set(this.items);

        this.db.ref(this.uid + "/" + this.selected_list).remove();
        this.aryLists.filter(function (list) {
          return oldListName !== list;
        });
      } else {
        this.aryLists[0] = newListName;
      }
      this.selected_list = newListName;
    },
    checkItem: function (newItemTitle) {
      let result = true;

      try {
        if (!this.selected_list)
          throw new Error("保存先のリストを選択してください");

        if (newItemTitle === "") throw new Error("タスク名が空っぽ！");

        Object.keys(this.items).forEach((key) => {
          let title = this.items[key].title;
          if (title == newItemTitle)
            throw new Error("そのタスク名は既に存在しています");
        });
      } catch (err) {
        result = false;
        alert(err);
      }

      return result;
    },
    signOut: function () {
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
    let db = this.db;
    this.uid = firebase.auth().currentUser.uid;
    let uid = this.uid;
    let list = [];
    db.ref(uid).on("value", (data) => {
      if (data.val()) {
        const rootList = data.val();
        Object.keys(rootList).forEach((key) => {
          list.push(key);
        });
        this.aryLists = list;
      }
      if (this.aryLists.length === 0) this.aryLists.push("新規リスト");
      this.selected_list = this.aryLists[0];
      this.loadTodo();
    });
  },
};
</script>