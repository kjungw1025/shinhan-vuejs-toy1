<template>
    <!-- 2.x는 하나의 div tag 안에 만들어야함 -->
    <div class="page">
        <header><h1>Vue Fire todo1</h1></header>
        <main>
            <div class="todos">
                <div class="write">
                    <input type="text"/>
                    <button class="btn add">Add</button>
                </div>
                <!-- 할일 목록 리스팅 -->
                <ul class="list">
                    <li v-for="(todo, i) of todos">
                        <i class="far fa-check-square"></i> <!-- far에서 fas로 되면 체크됨-->
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
            todos:[
                {text: '공부하기', state: 'yet'},
                {text: '운동하기', state: 'done'},
                {text: '글쓰기', state: 'done'},
            ],
        }
    },
}
</script>

<style>

</style>