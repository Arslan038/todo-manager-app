<template>
    <v-card v-if="item">
        <v-card-text>
            <div>
                <h3 class="purple--text">{{ item.title }}</h3>
                <p>{{ item.description.substr(0,35) }}...</p>
            </div>
            <div class="text-right">
                <v-icon size="20" color="purple" @click="showTodo(item)">mdi-eye</v-icon>
                <v-icon size="20" class="mx-1" color="primary" @click="moveTo('/todos/edit/'+item.id)">mdi-pencil</v-icon>
                <v-icon size="20" color="red darken-3" @click="removeTodo(item)">mdi-delete</v-icon>
            </div>
        </v-card-text>
        <TodoQuickView
            v-if="quickview"
            :viewTodo="quickview"
            :todo="todo"
            @close="quickview = !quickview"
        />
        <DeleteTodo
            v-if="deleteTodo"
            :todo="todo"
            :deleteTodo="deleteTodo"
            @close="deleteTodo = !deleteTodo"
        />
    </v-card>
</template>

<script>
import TodoQuickView from './TodoQuickView'
import DeleteTodo from './DeleteTodo'
export default {
    name: "TodoItem",
    components: {
        TodoQuickView,
        DeleteTodo
    },
    props: {
        item: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            quickview: false,
            deleteTodo: false,
            todo: null
        }
    },
    methods: {
        showTodo(todo) {
            this.todo = todo
            this.quickview = !this.quickview
        },
        removeTodo(todo) {
            this.todo = todo
            this.deleteTodo = !this.deleteTodo
        }
    }
}
</script>