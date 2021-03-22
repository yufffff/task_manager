<template>
  <v-container
    v-on:click.prevent="
      swiped = false;
      eventIndex = null;
    "
  >
    <!-- トップバー -->
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

    <!-- TODOリスト -->
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

    <!-- フッタ― -->
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
      editing: {}, // 編集中のTODO
      sortable: true, // 並べ替えモードフラグ
      swiped: false, // スワイプフラグ
      eventIndex: null, // TODOのインデックス
      aryLists: [], // TODOリスト配列
      selected_list: "", // 選択中のリスト
      items: [], // リストに格納されているTODOの配列
    };
  },
  computed: {
    // ログインユーザ
    user: function () {
      return firebase.auth().currentUser;
    },
    // RealtimeDatabaseインスタンス
    db: function () {
      return firebase.database();
    },
    // データ参照先
    dbPath: function () {
      return this.user.uid + "/lists/";
    },
  },
  methods: {
    // スワイプ時イベント
    onSwipe: function (eventIndex) {
      this.swiped = false;
      if (this.sortable) return;
      this.eventIndex = eventIndex;
      this.swiped = true;
    },
    // TODO追加
    addTodo: function (newItemTitle) {
      // 登録可能なタスク名であればリストに追加する
      if (this.checkItem(newItemTitle)) {
        this.items.push({
          title: newItemTitle,
          isChecked: false,
        });
        this.saveTodo();
      }
    },
    // TODO削除
    deleteTodo: function (eventIndex) {
      console.log("deleteTodo");
      this.db.ref(this.dbPath + "/" + eventIndex).remove();
      this.loadTodo();
    },
    // チェック済みのTODOをすべて削除する
    deleteCheckedAll: function () {
      this.items = this.items.filter(function (item) {
        return item.isChecked === false;
      });
      this.saveTodo();
    },
    // TODOリストを取得
    loadTodo: function () {
      console.log("loadTodo");

      // アイテム初期化
      this.items = [];

      // 選択中のリストが空の場合はタスクリストの1番目をセット
      if (this.selected_list === "") this.selected_list = this.aryLists[0];
      // console.log(this.dbPath);

      // 選択中のリストに格納されたTODOを取得する
      this.db.ref(this.dbPath).on("value", (data) => {
        let selected_list;
        let list = [];
        if (data) {
          const rootList = data.val();

          if (rootList != null) {
            selected_list = rootList.filter((list) => {
              return list.name === this.selected_list;
            });
            list = selected_list[0].items;
          }
        }
        // アイテムに渡す
        this.items = list;
      });
    },
    // 現在の画面の状態を保存する
    saveTodo: function () {
      console.log("saveTodo");
      this.db.ref(this.dbPath).set(this.items);
    },
    // 新規リスト追加
    addList: function (newListName) {
      console.log("addList");
      this.aryLists.push(newListName);
      this.selected_list = newListName;
      this.items = [];
      this.newlist = false; // ダイアログを閉じる
      this.loadTodo();
    },
    // リストセレクトボックス変更リスナー
    changeList: function () {
      console.log("changeList");
      // セレクトボックスの値をもとにデータを取得する
      this.loadTodo();
    },
    // リスト名変更
    changeListName: function (newListName) {
      console.log("changeListName");
      console.log(this.aryLists);
      console.log(this.items);
      let oldListName = this.selected_list;
      let items = this.items;
      let postData = { [newListName]: items };
      console.log(postData);

      // this.db.ref(this.user.uid).update({
      //   oldListName: items
      // });
      // // リスト配列から変更前のリスト名を削除
      // this.aryLists = this.aryLists.filter(function (list) {
      //   return oldListName !== list;
      // });
      // console.log(this.aryLists);

      // リスト配列に変更後のリスト名を追加
      // this.aryLists.push(newListName);
      // console.log(this.aryLists);
      // console.log(this.items);

      // リスト名をセレクトボックスに反映
      // this.selected_list = newListName;
    },
    // タスク名変更時にタスク名が正しいかチェックする
    checkItem: function (newItemTitle) {
      let result = true;

      try {
        // 選択中のリストがない場合
        if (!this.selected_list)
          throw new Error("保存先のリストを選択してください");

        // タスク名が空の場合
        if (newItemTitle === "") throw new Error("タスク名が空っぽ！");

        // タスク名が重複している場合
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
    this.db.ref(this.dbPath).on("value", (data) => {
      if (data.val()) {
        const rootList = data.val();
        console.log(rootList);
        let list = [];
        Object.keys(rootList).forEach((index) => {
          let listname = rootList[index].name;
          list.push(listname);
        });
        // リストに格納
        this.aryLists = list;
        console.log("データ取得");
      }

      // ユーザに紐づくタスクリストがない場合
      if (this.aryLists.length === 0) {
        this.aryLists.push("新規リスト");
        console.log("タスクリストなし");
      }

      // リストに紐づくTODOを表示
      this.loadTodo();
    });
  },
};
</script>