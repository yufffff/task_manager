<template>
  <v-dialog v-model="newlist" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">
        <span>新規リスト</span>
        <v-icon>mdi-text-box-plus-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">新規リスト作成</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="newListName"
                label="リストの名前"
                required
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
        <v-btn
          color="blue darken-1"
          text
          @click="
            $emit('addList', newListName);
            newlist = false;
          "
        >
          追加
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

export default {
  name: "NewList",
  data() {
    return {
      newlist: false,
      newListName: "",
    };
  },
};
</script>