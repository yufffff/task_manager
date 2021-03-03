<template>
  <v-app>
    <v-app-bar color="primary" dark app clipped-left>
      <v-toolbar-title>タスクマネージャ</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
