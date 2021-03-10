<template>
  <v-dialog
    v-model="edit"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on">mdi-dots-horizontal</v-icon>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">タスク名編集</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                　v-model="editing.title"
                label="変更前のタスク名"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                　v-model="newItemName"
                label="変更後のタスク名"
              ></v-text-field>
            </v-col>
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
      edit: false,
      newItemName: "",
    };
  },
  props: {
    editing: {},
  },
  methods: {
    editTodo: function () {
      console.log("edit");
      if (this.newItemName == "") {
        alert("タスク名を入力してください");
        return;
      }
      this.editing.title = this.newItemName;
      this.$emit("saveTodo");
      this.edit = false;
    },
  },
};
</script>