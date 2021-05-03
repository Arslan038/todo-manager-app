<template>
    <v-row class="my-7 mx-md-7 mx-2 py-3">
        <v-col cols="12" md="8" lg="9">
            <h1 class="purple--text">Your Todos</h1>
        </v-col>
        <v-col cols="12" md="4" lg="3">
            <v-text-field
                v-model="search"
                @input="findTodos"
                color="purple"
                append-icon="mdi-magnify"
                label="Search Todo"
                clearable
                dense
                outlined
            ></v-text-field>
        </v-col>
        <v-col cols="12" class="text-center my-4" v-if="loading">
            <v-progress-circular
                indeterminate
                color="purple"
            ></v-progress-circular> 
        </v-col>
        <v-col cols="12" class="mb-10" v-if="!loading && !todos.length">
            <v-row justify="center">
                <v-col cols="12" md="8" lg="5">
                    <v-alert type="info" color="blue">You have no todo yet.</v-alert>
                </v-col>
            </v-row>
        </v-col>
        <v-col
            v-for="(todo,index) in todos"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="mb-10"
        >
            <TodoItem :item="todo" />
        </v-col>
        <v-col cols="12" class="text-center mb-10" v-if="loadMore">
            <v-progress-circular
                indeterminate
                color="purple"
            ></v-progress-circular> 
        </v-col>
    </v-row>
</template>

<script>
import TodoItem from './TodoItem'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "Todos",
    components: {
        TodoItem
    },
    computed: {
        ...mapGetters(['getTodos', 'getTodoCount']),
    },
    watch: {
        getTodos(val) {
            this.todos = val
        },
    },
    data() {
        return {
            loading: false,
            loadMore: false,
            search: null,
            todos: [],
        }
    },
    methods: {
        ...mapActions(['fetchUserTodos']),
        async initTodos(data) {
            await this.fetchUserTodos(data)
        },

        findTodos(value) {
            if(value) {
                this.todos = this.getTodos.filter(todo => todo.title.toLowerCase().includes(value.toLowerCase()))
            }
            else {
                this.todos = this.getTodos
            }
        },

        async handleScroll(e) {
            let bottomOfWindow = e.target.documentElement.scrollTop + window.innerHeight === e.target.documentElement.offsetHeight;
            if (bottomOfWindow) {
                if(this.getTodoCount && this.todos.length < this.getTodoCount && !this.search) {
                    const id = this.getLoggedUser().id
                    const data = { id, offset: this.todos.length}
                    this.loadMore = true
                    await this.initTodos(data)
                    this.loadMore = false
                }
            }
        }
    },
    async created() {
        const id = this.getLoggedUser().id
        const data = { id, offset: 0}
        this.loading = true
        await this.initTodos(data)
        this.loading = false

        window.addEventListener('scroll', this.handleScroll);  
    },

    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
}
</script>