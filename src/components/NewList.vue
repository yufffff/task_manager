<template>
  <!-- 新規リスト追加ダイアログ -->
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-icon><v-icon>mdi-playlist-plus</v-icon></v-list-item-icon>
        <v-list-item-title>新規リスト追加</v-list-item-title>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title> 新規リスト作成 </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="newListName"
                label="リストの名前"
                required
                v-on:keyup.enter="addList"
                autofocus
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          キャンセル
        </v-btn>
        <v-btn color="blue darken-1" text @click="addList"> 追加 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "NewList",
  data() {
    return {
      dialog: false, // ダイアログ表示フラグ
      newListName: "", // 新規リストの名称
    };
  },
  props: {
    checkListName: {
      type: Function,
      required: true,
    },
    _addList: {
      type: Function,
      required: true,
    }
  },
  methods: {
    addList: function () {
      console.log("NewList.vue addList");
      if (this.checkListName(this.newListName) === true) {
        // 追加可能な名前であれば、親画面のリスト追加関数呼び出し
        this._addList(this.newListName);
        this.dialog = false;
        this.newListName = "";
      }
    },
  },
};
</script>