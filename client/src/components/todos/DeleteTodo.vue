<template>
    <v-dialog v-model="deleteTodo" max-width="500" persistent>
        <v-card v-if="todo">
            <v-card-text class="pt-5">
                <div class="d-flex justify-space-between">
                    <h2 class="purple--text">Delete Todo</h2>
                    <v-icon @click="closeDeleteModal">mdi-close</v-icon>
                </div>
                <v-divider class="mt-4 mb-5"></v-divider>
                <h3 class="text-center">Are you sure you want to delete <span class="purple--text">{{ todo.title }}</span> </h3>
                <v-row>
                    <v-col cols="12" class="text-center mt-7">
                        <v-btn
                            depressed
                            color="purple"
                            dark
                            :loading="deleteLoading"
                            @click="removeTodo"
                        >
                            Yes, Delete
                        </v-btn>
                        <v-btn
                            color="grey"
                            depressed
                            class="ml-3"
                            dark
                            @click="closeDeleteModal"
                        >
                            No, Cancel
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DeleteTodo",
    props: {
        deleteTodo: {
            type: Boolean,
            default: false
        },
        todo: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            deleteLoading: false,
        }
    },
    methods: {
        closeDeleteModal() {
            this.$emit('close', 1)
        },
        async removeTodo() {
            this.deleteLoading = true
            const resp = await this.$store.dispatch('deleteTodo', this.todo.id)
            this.deleteLoading = false

            if(resp === 1) {
                this.closeDeleteModal();
            }
        }
    }
}
</script>