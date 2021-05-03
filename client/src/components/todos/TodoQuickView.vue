<template>
    <v-dialog v-model="viewTodo" max-width="500" persistent>
        <v-card v-if="todo">
            <v-card-text class="pt-5">
                <div class="d-flex justify-space-between">
                    <h2 class="purple--text">Todo Quickview</h2>
                    <v-icon @click="closeQuickView">mdi-close</v-icon>
                </div>
                <v-divider class="mt-4 mb-5"></v-divider>
                <h2>{{ todo.title }}</h2>
                <p>{{ todo.description }}</p>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "TodoQuickView",
    props: {
        viewTodo: {
            type: Boolean,
            default: false
        },
        todo: {
            type: Object,
            default: null
        }
    },
    methods: {
        closeQuickView() {
            this.$emit('close', 1)
        }
    }
}
</script>