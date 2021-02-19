const vm = new Vue({
    el: '#app',
    data: {
        items: [
            { title: '入居日の確定', isChecked: true },
            { title: '引越業者予約', isChecked: true },
            { title: '不用品回収業者依頼', isChecked: false },
            { title: '西鉄不動産、大京アステージへ退去届', isChecked: false },
            { title: '九州電力、西部ガスへ退去届', isChecked: false },
            { title: 'enひかり解約申込', isChecked: false },
            { title: '博多区役所に転居届', isChecked: false },
            { title: '火災保険解約', isChecked: false },
            { title: '会社に住所変更届', isChecked: false },
            { title: '各種住所変更届', isChecked: false },
        ],
        newItemTitle: ''
    },
    methods: {
        addTodo: function () {
            this.items.push({
                title: this.newItemTitle,
                isChecked: false
            });
            this.newItemTitle = '';
            this.saveTodo();
        },
        deleteTodo: function () {
            this.items = this.items.filter(function (item) {
                return item.isChecked === false;
            });
            this.saveTodo();
        },
        saveTodo: function () {
            localStorage.setItem('items', JSON.stringify(this.items));
        },
        loadTodo: function () {
            this.items = JSON.parse(localStorage.getItem('items'));
            if (!this.items) {
                this.items = [];
            }
        },
    },
    mounted: function () {
        this.loadTodo();
    },
})