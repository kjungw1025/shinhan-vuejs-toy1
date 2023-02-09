<template>
    <!-- 2.x는 하나의 div tag 안에 만들어야함 -->
    <div class="page">
        <header><h1>Vue Fire todo1</h1></header>
        <main>
            <div class="todos">
                <transition name="fade">
                    <div class="write add" v-if="writeState === 'add'" key="add"> <!-- 등록 -->
                        <input
                            ref="writeArea" 
                            type="text"
                            v-model="addItemText"
                            v-on:keyup.enter="addItem"
                        />
                        <button class="btn add" v-on:click="addItem">Add</button>
                    </div>

                    <div class="write edit" v-else key="edit"> <!-- 수정 -->
                        <input
                            ref="editArea" 
                            type="text"
                            v-model="editItemText"
                            v-on:keyup.enter="editSave"
                        />
                        <button class="btn add" v-on:click="editSave">Save</button>
                    </div>
                </transition>

                <ul class="list" ref="list">
                    <li v-for="(todo, i) of todos" :key="todo.text">
                        <i 
                            @click="checkItem($event, i)"
                            :class="[todo.state === 'yet' ? 'far' : 'fas', 'fa-check-square']">
                        </i>
                        <span>
                            {{ todo.text }}
                            <b>
                                <a href="" @click.prevent="editShow(i)">Edit</a>
                                <a href="" @click.prevent="del(i)">Del</a>
                            </b>
                        </span>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script>
import {db} from '../firebase/db';
console.log(db);

export default {
    data() {
        return {
            writeState: 'add',
            addItemText: '',
            crrEditItem: '',
            editItemText: '',
            todos:[
                // {text: '공부하기', state: 'yet'},
                // {text: '운동하기', state: 'done'},
                // {text: '글쓰기', state: 'done'},
            ],
        }
    },
    methods: {
        addItem() {
            const temptext = this.addItemText;
            if (this.addItemText === '') return;
            
            const tempstate = 'yet';
            // this.todos.push({
            //     text: temptext,
            //     state: tempstate
            // }); // db에 전송하기 전
            db.collection('todos').add({text: temptext, state: tempstate});
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
        editShow(index) {
            this.crrEditItem = index;
            this.writeState = 'edit';
            this.editItemText = this.todos[index].text;
            this.$refs.list.children[index].classList = 'editing';
        },
        editSave() {
            this.todos[this.crrEditItem].text = this.editItemText;
            this.editItemText = '';
            this.writeState = 'add';
            this.$refs.list.children[this.crrEditItem].classList = '';
        },
        del(index) {
            this.todos.splice(index, 1);
        },
    },
    mounted() {
        this.$refs.writeArea.focus();
        db.collection('todos').get().then((result) => {
            result.forEach((doc)=>{
                console.log(doc.data())
                this.todos.push(doc.data());
            })
        });
    },
    firestore: {
        todos: db.collection('todos')
    }
}
</script>

<style>

</style>