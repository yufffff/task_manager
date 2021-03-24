<template>
  <v-container v-on:click="eventIndex = null">
    <!-- トップバー -->
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-items>
        <v-select
          v-model="select"
          :items="aryLists"
          item-text="name"
          return-object
          label="選択中のリスト"
          filled
          dense
          @change="changeIndex"
        ></v-select>
      </v-toolbar-items>
    </v-app-bar>

    <!-- ナビゲーションバー -->
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-list nav dense>
        <NewList :drawer="drawer" v-on:addList="addList" />
        <EditList
          :drawer="drawer"
          :editing="select"
          v-on:changeListName="changeListName"
        />
        <v-list-item v-on:click="deleteList()">
          <v-list-item-icon
            ><v-icon>mdi-playlist-remove</v-icon></v-list-item-icon
          >
          <v-list-item-title>リスト削除</v-list-item-title>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>
        <div class="pa-2">
          <v-btn block color="error" v-on:click="signOut()">
            <v-icon>mdi-logout</v-icon>
            <span>ログアウト</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- TODOリスト -->
    <draggable
      v-model="select.items"
      @change="saveItems"
      handle=".sort"
      animation="200"
    >
      <template v-for="(item, i) in select.items">
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
            v-on:change="saveItems"
          />
          <v-spacer></v-spacer>

          <EditTODO
            v-if="eventIndex != `${i}` && sortable == false"
            :editing="item"
            :sortable="sortable"
            v-on:saveTodo="saveItems"
          />

          <v-icon class="sort" v-if="eventIndex != `${i}` && sortable == true"
            >mdi-menu</v-icon
          >

          <v-slide-x-reverse-transition>
            <v-btn
              color="red"
              tile
              v-if="swiped && eventIndex == `${i}`"
              v-on:click="deleteTodo(eventIndex)"
              ><span class="white--text">削除</span></v-btn
            >
          </v-slide-x-reverse-transition>
        </v-list-item>
      </template>
    </draggable>

    <!-- フッタ― -->
    <v-footer app fixed padless>
      <NewTODO v-on:addTodo="addTodo" />
      <v-bottom-navigation>
        <v-btn v-on:click="sortable = !sortable">
          <span v-if="sortable != true">並替</span>
          <span v-if="sortable == true">編集</span>
          <v-icon v-if="sortable == true">mdi-playlist-edit</v-icon>
          <v-icon v-if="sortable != true">mdi-sort</v-icon>
        </v-btn>
        <v-btn v-on:click="deleteCheckedAll()">
          <span>完了</span><v-icon>mdi-delete</v-icon>
        </v-btn>
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
  title: "メインページ",
  components: {
    draggable, // 並べ替え機能用
    NewTODO, // 新規TODO追加
    EditTODO, // TODO編集
    EditList, // リスト名変更
    NewList, // 新規リスト追加
  },
  data() {
    return {
      drawer: false,
      sortable: true, // 並べ替えモードフラグ
      swiped: false, // スワイプフラグ
      index: null, // リストのインデックス
      eventIndex: null, // TODOのインデックス
      aryLists: [], // TODOリスト配列
      select: {}, // 選択中のリスト
    };
  },
  computed: {
    // RealtimeDatabaseリファレンス
    lists: function () {
      const path = firebase.auth().currentUser.uid + "/lists";
      return firebase.database().ref(path);
    },
    items: function () {
      return this.lists.child(this.index).child("items");
    },
  },
  methods: {
    loadLists: function () {
      this.aryLists = [];
      this.select = {};
      
      // ユーザに紐づくタスクリストを取得
      this.lists.on("value", (data) => {
        if (data.val()) {
          this.aryLists = data.val();
        }

        // ユーザに紐づくタスクリストがない場合
        if (this.aryLists.length === 0) {
          this.aryLists.push({ name: "新規リスト" });
          console.log("タスクリストなし");
        }

        // 選択中のリストが無い場合はリストの一番目にセット
        if (!Object.keys(this.select).length) this.select = this.aryLists[0];
        if (this.index == null) this.changeIndex();
      });
      console.log("データ取得");
    },
    changeIndex: function () {
      if (!Object.keys(this.select).length) return;
      console.log("list index: " + this.aryLists.indexOf(this.select));
      this.index = this.aryLists.indexOf(this.select);
    },
    // スワイプ時イベント
    onSwipe: function (eventIndex) {
      this.swiped = false;
      this.eventIndex = eventIndex;
      this.swiped = true;
    },
    // TODO保存
    saveItems: function () {
      console.log("saveItems");
      this.saveLists();
      this.items.set(this.select.items);
    },
    // TODO追加
    addTodo: function (newItemTitle) {
      console.log("addTodo");
      if (this.select.items == undefined) this.select.items = [];

      // 登録可能なタスク名であればリストに追加する
      if (this.checkItem(newItemTitle)) {
        let newItem = {
          title: newItemTitle,
          isChecked: false,
        };
        this.select.items.push(newItem);
        this.saveItems();
      }
    },
    // TODO削除
    deleteTodo: function (eventIndex) {
      console.log("deleteTodo");
      this.select.items.splice(eventIndex, 1);
      this.saveItems();
    },
    // チェック済みのTODOをすべて削除する
    deleteCheckedAll: function () {
      console.log("deleteCheckedAll");
      if (this.select.items == undefined) return;
      this.select.items = this.select.items.filter(function (item) {
        return item.isChecked === false;
      });
      this.saveItems();
    },
    // リスト保存
    saveLists: function () {
      console.log("saveLists");
      this.lists.set(this.aryLists);
    },
    // 新規リスト追加
    addList: function (newListName) {
      console.log("addList");
      let objNewList = { name: newListName };
      this.aryLists.push(objNewList);
      this.select = objNewList;
      this.changeIndex();
      this.newlist = false; // ダイアログを閉じる
      this.drawer = false;
      this.saveLists();
    },
    // リスト名変更
    changeListName: function (newListName) {
      console.log("changeListName");
      this.lists.child(this.index).child("name").set(newListName);
      this.drawer = false;
    },
    // リスト削除
    deleteList: function () {
      console.log("deleteList");
      this.aryLists.splice(this.index, 1);
      this.saveLists();
      this.drawer = false;
      this.loadLists();
    },
    // タスク追加時にタスク名が正しいかチェックする
    checkItem: function (newItemTitle) {
      let result = true;

      try {
        // 選択中のリストがない場合
        if (!Object.keys(this.select).length)
          throw new Error("保存先のリストを選択してください");

        // タスク名が空の場合
        if (newItemTitle === "") throw new Error("タスク名が空っぽ！");

        // タスク名が重複している場合
        Object.keys(this.select.items).forEach((key) => {
          let title = this.select.items[key].title;
          if (title == newItemTitle)
            throw new Error("そのタスク名は既に存在しています");
        });
      } catch (err) {
        result = false;
        alert(err);
      }

      return result;
    },
    // ログアウト
    signOut: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/signin", () => {});
        });
    },
  },
  // 画面読み込み時に呼び出される
  mounted: function () {
    console.log("mounted");
    this.loadLists();
  },
};
</script>