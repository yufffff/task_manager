<template>
  <!-- タスク名編集ダイアログ -->
  <v-dialog v-model="edit" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on">mdi-dots-horizontal</v-icon>
    </template>
    <v-card>
      <v-card-title> タスク名編集 </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              　v-model="editing.title"
              label="変更前のタスク名"
              readonly
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              　v-model="newItemName"
              label="変更後のタスク名"
              v-on:keyup.enter="editTodo"
              autofocus
            ></v-text-field>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="edit = false"
          >キャンセル</v-btn
        >
        <v-btn color="blue darken-1" text @click="editTodo"> 保存 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditTODO",
  data() {
    return {
      edit: false, // ダイアログ表示フラグ
      newItemName: "", // 変更後のタスク名
    };
  },
  props: {
    editing: {}, // 変更中のタスクオブジェクト
  },
  methods: {
    // 親画面のタスク名変更関数を呼び出す
    editTodo: function () {
      console.log("edit");
      if (this.$emit("checkItem", this.newItemName)) {
        this.editing.title = this.newItemName;
        this.$emit("saveTodo");
        this.edit = false;
      }
    },
  },
};
</script>