<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          placeholder="TODOを入力しましょう！"
          v-model="newItemTitle"
        ></v-text-field>
        <v-btn color="primary" dark class="mb-2" @click="addTodo()">追加</v-btn>
      </v-card-title>
    </v-card>

    <v-list-item v-for="item in items" :key="item.title">
      <label v-bind:class="{ done: item.isChecked }">
        <input
          type="checkbox"
          v-model="item.isChecked"
          v-on:change="saveTodo"
        />
        {{ item.title }}
      </label>
    </v-list-item>
    <button v-on:click="deleteTodo()">チェック済みの項目を削除する</button>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  name: "TODO",
  data() {
    return {
      newItemTitle: "",
      items: [],
    };
  },
  methods: {
    addTodo: function () {
      this.items.push({
        title: this.newItemTitle,
        isChecked: false,
      });
      this.newItemTitle = "";
      this.saveTodo();
    },
    deleteTodo: function () {
      this.items = this.items.filter(function (item) {
        return item.isChecked === false;
      });
      this.saveTodo();
    },
    saveTodo: function () {
      var db = firebase.database();
      db.ref("items").set(this.items);
    },
    loadTodo: function () {
      var db = firebase.database();
      db.ref("items").on("value", (data) => {
        if (data) {
          const rootList = data.val();
          // const key = data.key;
          let list = [];

          if (rootList != null) {
            Object.keys(rootList).forEach((val/* , key */) => {
              // rootList[val].id = val;
              list.push(rootList[val]);
            });
            this.items = list;
          }
        }
      });
    },
  },
  mounted: function () {
    this.loadTodo();
  },
};
</script>
