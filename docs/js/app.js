(function(e){function t(t){for(var i,o,r=t[0],l=t[1],c=t[2],u=0,v=[];u<r.length;u++)o=r[u],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&v.push(a[o][0]),a[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);d&&d(t);while(v.length)v.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],i=!0,r=1;r<n.length;r++){var l=n[r];0!==a[l]&&(i=!1)}i&&(s.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},a={app:0},s=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/task_manager/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var d=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);var i=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-main",[n("router-view")],1)],1)},s=[],o={name:"App"},r=o,l=n("2877"),c=n("6544"),d=n.n(c),u=n("7496"),v=n("f6c4"),m=Object(l["a"])(r,a,s,!1,null,null,null),p=m.exports;d()(m,{VApp:u["a"],VMain:v["a"]});var f=n("8c4f"),h=n("260b"),b=(n("ea7b"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{on:{click:function(t){e.eventIndex=null}}},[n("v-app-bar",{attrs:{app:"",color:"primary",dark:"","clipped-left":""}},[n("v-app-bar-nav-icon",{on:{click:function(t){e.drawer=!0}}}),n("v-toolbar-items",[n("v-select",{attrs:{items:e.aryLists,"item-text":"name","return-object":"",label:"選択中のリスト",filled:"",dense:""},on:{change:e.changeIndex},model:{value:e.select,callback:function(t){e.select=t},expression:"select"}})],1)],1),n("v-navigation-drawer",{attrs:{app:"",clipped:""},scopedSlots:e._u([{key:"append",fn:function(){return[n("v-divider"),n("div",{staticClass:"pa-2"},[n("v-btn",{attrs:{block:"",color:"error"},on:{click:function(t){return e.signOut()}}},[n("v-icon",[e._v("mdi-logout")]),n("span",[e._v("ログアウト")])],1)],1)]},proxy:!0}]),model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",{attrs:{nav:"",dense:""}},[n("NewList",{attrs:{drawer:e.drawer},on:{addList:e.addList}}),n("EditList",{attrs:{drawer:e.drawer,editing:e.select},on:{changeListName:e.changeListName}}),n("v-list-item",{on:{click:function(t){return e.deleteList()}}},[n("v-list-item-icon",[n("v-icon",[e._v("mdi-playlist-remove")])],1),n("v-list-item-title",[e._v("リスト削除")])],1)],1)],1),n("draggable",{attrs:{handle:".sort",animation:"200"},on:{change:e.saveItems},model:{value:e.select.items,callback:function(t){e.$set(e.select,"items",t)},expression:"select.items"}},[e._l(e.select.items,(function(t,i){return[n("v-list-item",{directives:[{name:"touch",rawName:"v-touch",value:{left:function(){return e.onSwipe(""+i)}},expression:"{\n          left: () => onSwipe(`${i}`),\n        }"}],key:""+i},[n("v-checkbox",{attrs:{label:t.title,color:t.isChecked?"grey":"primary"},on:{change:e.saveItems},model:{value:t.isChecked,callback:function(n){e.$set(t,"isChecked",n)},expression:"item.isChecked"}}),n("v-spacer"),e.eventIndex!=""+i&&0==e.sortable?n("EditTODO",{attrs:{editing:t,sortable:e.sortable},on:{saveTodo:e.saveItems}}):e._e(),e.eventIndex!=""+i&&1==e.sortable?n("v-icon",{staticClass:"sort"},[e._v("mdi-menu")]):e._e(),n("v-slide-x-reverse-transition",[e.swiped&&e.eventIndex==""+i?n("v-btn",{attrs:{color:"red",tile:""},on:{click:function(t){return e.deleteTodo(e.eventIndex)}}},[n("span",{staticClass:"white--text"},[e._v("削除")])]):e._e()],1)],1)]}))],2),n("v-footer",{attrs:{app:"",fixed:"",padless:""}},[n("NewTODO",{on:{addTodo:e.addTodo}}),n("v-bottom-navigation",[n("v-btn",{on:{click:function(t){e.sortable=!e.sortable}}},[1!=e.sortable?n("span",[e._v("並替")]):e._e(),1==e.sortable?n("span",[e._v("編集")]):e._e(),1==e.sortable?n("v-icon",[e._v("mdi-playlist-edit")]):e._e(),1!=e.sortable?n("v-icon",[e._v("mdi-sort")]):e._e()],1),n("v-btn",{on:{click:function(t){return e.deleteCheckedAll()}}},[n("span",[e._v("完了")]),n("v-icon",[e._v("mdi-delete")])],1)],1)],1)],1)}),w=[],x=(n("66ce"),n("b76a")),g=n.n(x),k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,a=t.attrs;return[n("v-fab-transition",[n("v-btn",e._g(e._b({attrs:{color:"secondary",dark:"",absolute:"",right:"",top:"",fab:""}},"v-btn",a,!1),i),[n("v-icon",[e._v("mdi-plus")])],1)],1)]}}]),model:{value:e.newTodo,callback:function(t){e.newTodo=t},expression:"newTodo"}},[n("v-card",[n("v-card-title",[e._v(" 新規タスク ")]),n("v-card-text",[n("v-form",{ref:"newItemTitle"},[n("v-text-field",{attrs:{label:"TODOを入力しましょう！",autofocus:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addTodo(t)}},model:{value:e.newItemTitle,callback:function(t){e.newItemTitle=t},expression:"newItemTitle"}})],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){e.newTodo=!1}}},[e._v(" キャンセル ")]),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.addTodo}},[e._v(" 追加 ")])],1)],1)],1)},y=[],_={name:"NewTODO",data(){return{newTodo:!1,newItemTitle:""}},methods:{addTodo:function(){this.$emit("addTodo",this.newItemTitle),this.newTodo=!1,this.newItemTitle=""}}},V=_,L=n("8336"),T=n("b0af"),I=n("99d9"),O=n("169a"),C=n("0789"),N=n("4bd4"),E=n("132d"),S=n("2fa4"),j=n("8654"),$=Object(l["a"])(V,k,y,!1,null,null,null),A=$.exports;d()($,{VBtn:L["a"],VCard:T["a"],VCardActions:I["a"],VCardText:I["b"],VCardTitle:I["c"],VDialog:O["a"],VFabTransition:C["c"],VForm:N["a"],VIcon:E["a"],VSpacer:S["a"],VTextField:j["a"]});var D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,a=t.attrs;return[n("v-icon",e._g(e._b({},"v-icon",a,!1),i),[e._v("mdi-dots-horizontal")])]}}]),model:{value:e.edit,callback:function(t){e.edit=t},expression:"edit"}},[n("v-card",[n("v-card-title",[e._v(" タスク名編集 ")]),n("v-card-text",[n("v-container",[n("v-row",[n("v-text-field",{attrs:{label:"変更前のタスク名",readonly:""},model:{value:e.editing.title,callback:function(t){e.$set(e.editing,"title",t)},expression:"editing.title"}})],1),n("v-row",[n("v-text-field",{attrs:{label:"変更後のタスク名",autofocus:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.editTodo(t)}},model:{value:e.newItemName,callback:function(t){e.newItemName=t},expression:"newItemName"}})],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){e.edit=!1}}},[e._v("キャンセル")]),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.editTodo}},[e._v(" 保存 ")])],1)],1)],1)},B=[],P={name:"EditTODO",data(){return{edit:!1,newItemName:""}},props:{editing:{}},methods:{editTodo:function(){console.log("edit"),""!=this.newItemName?(this.editing.title=this.newItemName,this.$emit("saveTodo"),this.edit=!1):alert("タスク名を入力してください")}}},F=P,U=n("a523"),q=n("0fd9"),M=Object(l["a"])(F,D,B,!1,null,null,null),R=M.exports;d()(M,{VBtn:L["a"],VCard:T["a"],VCardActions:I["a"],VCardText:I["b"],VCardTitle:I["c"],VContainer:U["a"],VDialog:O["a"],VIcon:E["a"],VRow:q["a"],VSpacer:S["a"],VTextField:j["a"]});var J=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,a=t.attrs;return[n("v-list-item",e._g(e._b({},"v-list-item",a,!1),i),[n("v-list-item-icon",[n("v-icon",[e._v("mdi-playlist-plus")])],1),n("v-list-item-title",[e._v("新規リスト追加")])],1)]}}]),model:{value:e.newlist,callback:function(t){e.newlist=t},expression:"newlist"}},[n("v-card",[n("v-card-title",[e._v(" 新規リスト作成 ")]),n("v-card-text",[n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[n("v-text-field",{attrs:{label:"リストの名前",required:"",autofocus:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addList(t)}},model:{value:e.newListName,callback:function(t){e.newListName=t},expression:"newListName"}})],1)],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(t){e.newlist=!1}}},[e._v(" キャンセル ")]),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.addList}},[e._v(" 追加 ")])],1)],1)],1)},z=[],W={name:"NewList",data(){return{newlist:!1,newListName:""}},methods:{addList:function(){this.$emit("addList",this.newListName),this.newlist=!1,this.newListName=""}}},X=W,Z=n("62ad"),G=n("da13"),K=n("34c3"),Q=n("5d23"),H=Object(l["a"])(X,J,z,!1,null,null,null),Y=H.exports;d()(H,{VBtn:L["a"],VCard:T["a"],VCardActions:I["a"],VCardText:I["b"],VCardTitle:I["c"],VCol:Z["a"],VContainer:U["a"],VDialog:O["a"],VIcon:E["a"],VListItem:G["a"],VListItemIcon:K["a"],VListItemTitle:Q["b"],VRow:q["a"],VSpacer:S["a"],VTextField:j["a"]});var ee=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,a=t.attrs;return[n("v-list-item",e._g(e._b({},"v-list-item",a,!1),i),[n("v-list-item-icon",[n("v-icon",[e._v("mdi-playlist-edit")])],1),n("v-list-item-title",[e._v("リスト名変更")])],1)]}}]),model:{value:e.edit,callback:function(t){e.edit=t},expression:"edit"}},[n("v-card",[n("v-card-title",[e._v(" リスト名変更 ")]),n("v-card-text",[n("v-container",[n("v-row",[n("v-text-field",{attrs:{label:"変更前のリスト名",readonly:""},model:{value:e.editing.name,callback:function(t){e.$set(e.editing,"name",t)},expression:"editing.name"}})],1),n("v-row",[n("v-text-field",{attrs:{label:"変更後のリスト名",autofocus:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.editList(t)}},model:{value:e.newListName,callback:function(t){e.newListName=t},expression:"newListName"}})],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v("キャンセル")]),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.editList}},[e._v(" 保存 ")])],1)],1)],1)},te=[],ne={name:"EditList",data(){return{edit:!1,newListName:""}},props:{drawer:!0,editing:{}},methods:{editList:function(){console.log("edit list"),this.editing.name!=this.newListName?""!=this.newListName?(this.editing.name=this.newListName,this.$emit("changeListName",this.newListName),this.close()):alert("リスト名を入力してください"):alert("リスト名は以前と違うものにしてください")},close:function(){this.newListName="",this.edit=!1}},mounted:function(){this.newListName=""}},ie=ne,ae=Object(l["a"])(ie,ee,te,!1,null,null,null),se=ae.exports;d()(ae,{VBtn:L["a"],VCard:T["a"],VCardActions:I["a"],VCardText:I["b"],VCardTitle:I["c"],VContainer:U["a"],VDialog:O["a"],VIcon:E["a"],VListItem:G["a"],VListItemIcon:K["a"],VListItemTitle:Q["b"],VRow:q["a"],VSpacer:S["a"],VTextField:j["a"]});var oe={name:"TODO",title:"メインページ",components:{draggable:g.a,NewTODO:A,EditTODO:R,EditList:se,NewList:Y},data(){return{drawer:!1,sortable:!0,swiped:!1,index:null,eventIndex:null,aryLists:[],select:{}}},computed:{lists:function(){const e=h["a"].auth().currentUser.uid+"/lists";return h["a"].database().ref(e)},items:function(){return this.lists.child(this.index).child("items")}},methods:{loadLists:function(){this.aryLists=[],this.select={},this.lists.on("value",e=>{e.val()&&(this.aryLists=e.val()),0===this.aryLists.length&&(this.aryLists.push({name:"新規リスト"}),console.log("タスクリストなし")),Object.keys(this.select).length||(this.select=this.aryLists[0]),null==this.index&&this.changeIndex()}),console.log("データ取得")},changeIndex:function(){Object.keys(this.select).length&&(console.log(this.aryLists),console.log("list index: "+this.aryLists.indexOf(this.select)),this.index=this.aryLists.indexOf(this.select))},onSwipe:function(e){this.swiped=!1,this.eventIndex=e,this.swiped=!0},saveItems:function(){console.log("saveItems"),this.saveLists(),this.items.set(this.select.items)},addTodo:function(e){if(console.log("addTodo"),void 0==this.select.items&&(this.select.items=[]),this.checkItem(e)){let t={title:e,isChecked:!1};this.select.items.push(t),this.saveItems()}},deleteTodo:function(e){console.log("deleteTodo"),this.select.items.splice(e,1),this.saveItems()},deleteCheckedAll:function(){console.log("deleteCheckedAll"),void 0!=this.select.items&&(this.select.items=this.select.items.filter((function(e){return!1===e.isChecked})),this.saveItems())},saveLists:function(){console.log("saveLists"),this.lists.set(this.aryLists)},addList:function(e){console.log("addList");let t={name:e};this.aryLists.push(t),this.select=t,this.changeIndex(),this.newlist=!1,this.drawer=!1,this.saveLists()},changeListName:function(e){console.log("changeListName"),this.lists.child(this.index).child("name").set(e),this.drawer=!1},deleteList:function(){console.log("deleteList"),this.aryLists.splice(this.index,1),this.saveLists(),this.drawer=!1,this.loadLists()},checkItem:function(e){let t=!0;try{if(!Object.keys(this.select).length)throw new Error("保存先のリストを選択してください");if(""===e)throw new Error("タスク名が空っぽ！");Object.keys(this.select.items).forEach(t=>{let n=this.select.items[t].title;if(n==e)throw new Error("そのタスク名は既に存在しています")})}catch(n){t=!1,alert(n)}return t},signOut:function(){h["a"].auth().signOut().then(()=>{this.$router.push("/signin",()=>{})})}},mounted:function(){console.log("mounted"),this.loadLists()}},re=oe,le=n("40dc"),ce=n("5bc1"),de=n("b81c"),ue=n("ac7c"),ve=n("ce7e"),me=n("553a"),pe=n("8860"),fe=n("f774"),he=n("b974"),be=n("2a7f"),we=n("269a"),xe=n.n(we),ge=n("c3f0"),ke=Object(l["a"])(re,b,w,!1,null,null,null),ye=ke.exports;d()(ke,{VAppBar:le["a"],VAppBarNavIcon:ce["a"],VBottomNavigation:de["a"],VBtn:L["a"],VCheckbox:ue["a"],VContainer:U["a"],VDivider:ve["a"],VFooter:me["a"],VIcon:E["a"],VList:pe["a"],VListItem:G["a"],VListItemIcon:K["a"],VListItemTitle:Q["b"],VNavigationDrawer:fe["a"],VSelect:he["a"],VSlideXReverseTransition:C["e"],VSpacer:S["a"],VToolbarItems:be["a"]}),xe()(ke,{Touch:ge["a"]});var _e=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{staticClass:"mx-auto",attrs:{"max-width":"500"}},[n("v-card-text",[n("v-text-field",{attrs:{filled:"",label:"Eメールアドレス"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),n("v-text-field",{attrs:{filled:"",type:"password",label:"パスワード"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signUp(t)}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),n("v-btn",{attrs:{large:"",color:"success"},on:{click:e.signUp}},[e._v("登録")])],1),n("v-divider"),n("v-card-text",[e._v(" 既にアカウントをお持ちの方は "),n("router-link",{attrs:{to:"/signin"}},[e._v("こちら")])],1)],1)},Ve=[],Le={name:"Signup",title:"サインアップ",data(){return{username:"",password:""}},methods:{signUp:function(){h["a"].auth().createUserWithEmailAndPassword(this.username,this.password).then(e=>{this.$router.replace("/signin"),alert("アカウントが作成されました\rn"+this.username)}).catch(e=>{alert(e.message)})}}},Te=Le,Ie=Object(l["a"])(Te,_e,Ve,!1,null,null,null),Oe=Ie.exports;d()(Ie,{VBtn:L["a"],VCard:T["a"],VCardText:I["b"],VDivider:ve["a"],VTextField:j["a"]});var Ce=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{staticClass:"mx-auto",attrs:{"max-width":"500"}},[n("v-card-text",[n("v-text-field",{attrs:{filled:"",label:"Eメールアドレス"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),n("v-text-field",{attrs:{filled:"",type:"password",label:"パスワード"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signIn(t)}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),n("v-btn",{staticClass:"primary",attrs:{large:""},on:{click:e.signIn}},[e._v("ログイン")])],1),n("v-divider"),n("v-card-text",[e._v(" アカウントをお持ちでない方は "),n("router-link",{attrs:{to:"/signup"}},[e._v("こちら")])],1)],1)},Ne=[],Ee={name:"Signin",title:"サインイン",data(){return{username:"",password:""}},methods:{signIn:function(){h["a"].auth().signInWithEmailAndPassword(this.username,this.password).then(e=>{this.$router.push("/",()=>{})},e=>{alert(e.message)})}}},Se=Ee,je=Object(l["a"])(Se,Ce,Ne,!1,null,null,null),$e=je.exports;d()(je,{VBtn:L["a"],VCard:T["a"],VCardText:I["b"],VDivider:ve["a"],VTextField:j["a"]}),i["a"].use(f["a"]);const Ae=[{path:"/",name:"TODO",component:ye,meta:{requiresAuth:!0}},{path:"/signup",name:"Signup",component:Oe},{path:"/signin",name:"Signin",component:$e}],De=new f["a"]({routes:Ae});De.beforeEach((e,t,n)=>{const i=e.matched.some(e=>e.meta.requiresAuth);i?h["a"].auth().onAuthStateChanged((function(t){t?n():n({path:"/signin",query:{redirect:e.fullPath}})})):n()});var Be=De,Pe=n("f309");i["a"].use(Pe["a"]);var Fe=new Pe["a"]({});i["a"].config.productionTip=!1;const Ue={apiKey:"AIzaSyC3J7ajLsTdq1bBk_sQd7nOBvU2XZ0IPSA",authDomain:"yufffff-todo.firebaseapp.com",databaseURL:"https://yufffff-todo-default-rtdb.firebaseio.com",projectId:"yufffff-todo",storageBucket:"yufffff-todo.appspot.com",messagingSenderId:"302478528291",appId:"1:302478528291:web:2527bede0e08e00d78c696",measurementId:"G-E2TV53ZJLC"};h["a"].initializeApp(Ue),new i["a"]({router:Be,vuetify:Fe,render:function(e){return e(p)}}).$mount("#app")}});