<template>
  <!-- リスト名変更ダイアログ -->
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-icon><v-icon>mdi-playlist-edit</v-icon></v-list-item-icon>
        <v-list-item-title>リスト名変更</v-list-item-title>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title> リスト名変更 </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              v-model="editing.name"
              label="変更前のリスト名"
              readonly
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="newListName"
              label="変更後のリスト名"
              v-on:keyup.enter="editList"
              autofocus
            ></v-text-field>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">キャンセル</v-btn>
        <v-btn color="blue darken-1" text @click="editList"> 保存 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditList",
  data() {
    return {
      dialog: false, // ダイアログ表示フラグ
      newListName: "", // 変更後のリスト名
    };
  },
  props: {
    drawer: true,
    editing: {}, // 変更前のリストオブジェクト
    checkListName: {
      type: Function,
      required: true,
    },
    changeListName: {
      type: Function,
      required: true,
    }
  },
  methods: {
    editList: function () {
      console.log("edit list");
      if (this.checkListName(this.newListName) === true) {
        // 登録可能であれば、親画面のリスト名変更関数を呼び出す
        this.editing.name = this.newListName;
        this.changeListName(this.newListName);
        this.close();
      }
    },
    // ダイアログクローズ
    close: function () {
      this.newListName = "";
      this.dialog = false;
    },
  },
};
</script>