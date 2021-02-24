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
import firebase from 'firebase'
// const db = firebase.firestore();
// console.log(db);

export default {
  name: "TODO",
  data() {
    return {
      newItemTitle: "",
      items: []
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
      localStorage.setItem("items", JSON.stringify(this.items));
    },
    loadTodo: function () {
    // console.log(db);
    //   this.items = db.ref("items");
    //   console.log(this.items);
    //   if (!this.items) {
    //     this.items = [];
    //   }
    },
  },
    mounted: function () {
      this.loadTodo();
    },
};
</script>
