<template>
    <!-- 2.x는 하나의 div tag 안에 만들어야함 -->
    <div class="page">
        <header><h1>Vue Fire todo1</h1></header>
        <main>
            <div class="todos">
                <div class="write">
                    <input
                        ref="writeArea" 
                        type="text"
                        v-model="addItemText"
                        v-on:keyup.enter="addItem"
                    />
                    <button class="btn add" v-on:click="addItem">Add</button>
                </div>
                <!-- 1. 할일 목록 리스팅 -->
                <ul class="list">
                    <li v-for="(todo, i) of todos" :key="todo.text">
                        <i 
                            @click="checkItem($event, i)"
                            :class="[todo.state === 'yet' ? 'far' : 'fas', 'fa-check-square']">
                        </i>
                        <span>
                            {{ todo.text }}
                            <b>
                                <a href="">Edit</a>
                                <a href="">Del</a>
                            </b>
                        </span>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addItemText: '',
            todos:[
                {text: '공부하기', state: 'yet'},
                {text: '운동하기', state: 'done'},
                {text: '글쓰기', state: 'done'},
            ],
        }
    },
    methods: {
        addItem() {
            const temptext = this.addItemText;
            if (this.addItemText === '') return;
            
            const tempstate = 'yet';
            this.todos.push({
                text: temptext,
                state: tempstate
            });
            this.addItemText = '';
        },
        checkItem(event, i) {
            if (this.todos[i].state == 'yet') {
                event.target.classList.remove('yet');
                event.target.classList.add('done');
                this.todos[i].state = 'done';
            }
            else if (this.todos[i].state == 'done') {
                event.target.classList.remove('done');
                event.target.classList.add('yet');
                this.todos[i].state = 'yet';
            }

        },
    },
    mounted() {
        this.$refs.writeArea.focus();
    }
}
</script>

<style>

</style>