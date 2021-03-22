<template>
  <v-container v-on:click.prevent="eventIndex = null">
    <!-- トップバー -->
    <v-app-bar app color="primary" dark>
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
        ></v-select>
      </v-toolbar-items>
      <v-spacer />
    </v-app-bar>

    <!-- ナビゲーションバー -->
    <v-navigation-drawer app v-model="drawer" absolute temporary>
      <v-list nav dense>
        <NewList :drawer="drawer" v-on:addList="addList" />
        <EditList
          :drawer="drawer"
          :editing="select.name"
          v-on:changeListName="changeListName"
        />
        <v-list-item v-on:click="deleteList()">
          <v-list-item-icon
            ><v-icon>mdi-playlist-remove</v-icon></v-list-item-icon
          >
          <v-list-item-title>リスト削除</v-list-item-title>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-list-item v-on:click="signOut()">
          <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
          <v-list-item-title>ログアウト</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- TODOリスト -->
    <draggable
      v-model="select.items"
      @change="saveTodo"
      handle=".sort"
      animation="200"
    >
      <template v-for="(item, i) in select.items">
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

          <v-icon class="sort" v-if="eventIndex != `${i}` && sortable == true">mdi-menu</v-icon>

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
    <v-footer fixed padless>
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
      editing: {}, // 編集中のTODO
      sortable: true, // 並べ替えモードフラグ
      swiped: false, // スワイプフラグ
      eventIndex: null, // TODOのインデックス
      aryLists: [], // TODOリスト配列
      select: {}, // 選択中のリスト
    };
  },
  computed: {
    // RealtimeDatabaseリファレンス
    db: function () {
      const path = firebase.auth().currentUser.uid + "/lists";
      return firebase.database().ref(path);
    },
  },
  methods: {
    // スワイプ時イベント
    onSwipe: function (eventIndex) {
      this.swiped = false;
      this.eventIndex = eventIndex;
      this.swiped = true;
    },
    // TODO追加
    addTodo: function (newItemTitle) {
      if (this.select.items == undefined) this.select.items = [];

      // 登録可能なタスク名であればリストに追加する
      if (this.checkItem(newItemTitle)) {
        this.select.items.push({
          title: newItemTitle,
          isChecked: false,
        });
        this.saveTodo();
      }
    },
    // TODO削除
    deleteTodo: function (eventIndex) {
      console.log("deleteTodo");
      this.select.items.splice(eventIndex, 1);
      this.saveTodo();
    },
    // チェック済みのTODOをすべて削除する
    deleteCheckedAll: function () {
      if (this.select.items == undefined) return;
      this.select.items = this.select.items.filter(function (item) {
        return item.isChecked === false;
      });
      this.saveTodo();
    },
    // 現在の画面の状態を保存する
    saveTodo: function () {
      console.log("saveTodo");
      this.db.set(this.aryLists);
    },
    // 新規リスト追加
    addList: function (newListName) {
      console.log("addList");
      this.aryLists.push({ name: newListName });
      console.log(this.aryLists.length)
      this.select = this.aryLists[this.aryLists.length - 1]
      console.log(this.aryLists);
      this.newlist = false; // ダイアログを閉じる
      this.drawer = false;
      this.saveTodo();
    },
    // リスト名変更
    changeListName: function (newListName) {
      this.select.name = newListName;
      this.saveTodo();
      console.log("changeListName");
    },
    // リスト削除
    deleteList: function () {
      this.aryLists = this.aryLists.filter((list) => {
        return list !== this.select;
      });
      this.saveTodo();
    },
    // タスク追加時にタスク名が正しいかチェックする
    checkItem: function (newItemTitle) {
      let result = true;

      try {
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
    // ユーザに紐づくタスクリストを取得
    this.db.on("value", (data) => {
      if (data.val()) {
        this.aryLists = data.val();
        console.log(this.aryLists);
        console.log("データ取得");
      }

      // ユーザに紐づくタスクリストがない場合
      if (this.aryLists.length === 0) {
        this.aryLists.push({ name: "新規リスト", items: [] });
        console.log("タスクリストなし");
      }

      // 選択中のリストが無い場合はリストの一番目にセット
      console.log(this.select);
      if (!Object.keys(this.select).length) this.select = this.aryLists[0];
    });
  },
};
</script>