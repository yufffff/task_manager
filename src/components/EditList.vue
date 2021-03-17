<template>
  <v-dialog
    v-model="edit"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" fixed>
        <span>リスト名変更</span>
        <v-icon>mdi-playlist-edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">リスト名編集</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editing"
                label="変更前のリスト名"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="newListName"
                label="変更後のリスト名"
              ></v-text-field>
            </v-col>
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
      edit: false,
      newListName: "",
    };
  },
  props: {
    editing: "",
  },
  methods: {
    editList: function () {
      console.log("edit list");
      if (this.editing == this.newListName) {
        alert("リスト名は以前と違うものにしてください");
        return;
      }
      if (this.newListName == "") {
        alert("リスト名を入力してください");
        return;
      } 
      this.$emit('changeListName', this.newListName);
      this.close();
    },
    close: function() {
      this.newListName = "";
      this.edit=false;
    }
  },
  mounted: function () {
    this.newListName = "";
  }
};
</script>