<template>
  <!-- 新規タスク追加ダイアログ -->
  <v-dialog v-model="newTodo" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-fab-transition>
        <v-btn
          color="secondary"
          dark
          absolute
          right
          top
          fab
          v-bind="attrs"
          v-on="on"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-fab-transition>
    </template>
    <v-card>
      <v-card-title> 新規タスク </v-card-title>
      <v-card-text>
        <v-form ref="newItemTitle">
          <v-text-field
            v-model="newItemTitle"
            label="TODOを入力しましょう！"
            v-on:keyup.enter="addTodo"
            autofocus
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="newTodo = false">
          キャンセル
        </v-btn>
        <v-btn color="blue darken-1" text @click="addTodo"> 追加 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "NewTODO",
  data() {
    return {
      newTodo: false,   // ダイアログ表示フラグ
      newItemTitle: "", // タスク名称
    };
  },
  methods: {
    // 親画面のタスク追加関数を呼び出す
    addTodo: function () {
      this.$emit("addTodo", this.newItemTitle);
      this.newTodo = false;
      this.newItemTitle = "";
    },
  },
};
</script>