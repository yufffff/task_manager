<template>
  <!-- 新規リスト追加ダイアログ -->
  <v-dialog v-model="newlist" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        新規リスト作成
      </v-card-title>
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
        <v-btn color="blue darken-1" text @click="newlist = false">
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
      newlist: false,   // ダイアログ表示フラグ
      newListName: "",  // 新規リストの名称
    };
  },
  methods: {
    addList: function () {
      // 親画面のリスト追加関数呼び出し
      this.$emit("addList", this.newListName);
      this.newlist = false;
      this.newListName = "";
    },
  },
};
</script>