<template>
    <!-- 2.x는 하나의 div tag 안에 만들어야함 -->
    <div class="page">
        <header>
            <h1>
                Vue Fire todo1
                <span class="pie">
                    <svg viewBox="0 0 64 64">
                        <circle class="pie" r="32" cx="32" cy="32" style="stroke-width: 64;"></circle>
                        <circle class="slice" r="32" cx="32" cy="32" 
                        :style="{ 
                            strokeWidth: 64,
                            strokeDasharray: totalTodo + ', 201', 
                            transition: 'all 0.3s linear'
                        }"></circle>
                    </svg>
                </span>
            </h1>
        </header>

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
    computed: {
        // header의 svg파일 style 바인딩을 위한 computed 함수 (done의 개수에 따라 비율로 인해 css 적용이 달라짐)
        totalTodo() {
            let totalNum = 0;
            this.todos.forEach(item => {
                if (item.state == 'done')
                    totalNum++;
            });
            return (totalNum / this.todos.length) * 201;
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
            db.collection('todos').add({
                text: temptext, 
                state: tempstate, 
                createdAt: new Date(),
                }).then(sn => {
                db.collection('todos').doc(sn.id).update({
                    id: sn.id
                })
            });
            this.addItemText = '';
        },
        checkItem(event, index) {
            if (this.todos[index].state == 'yet') {
                // event.target.classList.remove('yet');
                // event.target.classList.add('done');
                // this.todos[i].state = 'done'; firebase에 연동하기 전
                db.collection('todos').doc(this.todos[index].id).update({state: 'done'});
            }
            else if (this.todos[index].state == 'done') {
                // event.target.classList.remove('done');
                // event.target.classList.add('yet');
                // this.todos[i].state = 'yet'; firebase에 연동하기 전
                db.collection('todos').doc(this.todos[index].id).update({state: 'yet'});
            }

        },
        editShow(index) {
            this.crrEditItem = index;
            this.writeState = 'edit';
            this.editItemText = this.todos[index].text;
            this.$refs.list.children[index].classList = 'editing';
        },
        editSave() {
            // this.todos[this.crrEditItem].text = this.editItemText;
            db.collection('todos')
                .doc(this.todos[this.crrEditItem].id)
                    .update({
                        text: this.editItemText
                    });
            this.editItemText = '';
            this.writeState = 'add';
            this.$refs.list.children[this.crrEditItem].classList = '';
        },
        del(index) {
            // this.todos.splice(index, 1); //DB에 접근해서 삭제하므로 의미없음
            db.collection('todos').doc(this.todos[index].id).delete();
        },
    },
    mounted() {
        this.$refs.writeArea.focus();
    },
    firestore: {
        todos: db.collection('todos').orderBy('createdAt', 'desc') // firebase에서 가져올 때 시간 순으로 정렬해서 가져오도록
    }
}
</script>

<style>

</style>