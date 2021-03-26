import Vue from 'vue'
import App from './App.vue'
import router from './router'
import titleMixin from './util/title'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'

Vue.mixin(titleMixin);
Vue.config.productionTip = false

// Firebase初期化
const config = {
  apiKey: 'AIzaSyC3J7ajLsTdq1bBk_sQd7nOBvU2XZ0IPSA',
  authDomain: 'yufffff-todo.firebaseapp.com',
  databaseURL: 'https://yufffff-todo-default-rtdb.firebaseio.com',
  projectId: 'yufffff-todo',
  storageBucket: 'yufffff-todo.appspot.com',
  messagingSenderId: '302478528291',
  appId: '1:302478528291:web:2527bede0e08e00d78c696',
  measurementId: 'G-E2TV53ZJLC'
}
firebase.initializeApp(config);

// Vueインスタンス生成
new Vue({
  router,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
