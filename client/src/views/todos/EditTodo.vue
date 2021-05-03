<template>
  <div>
    <Navbar />
    <Header />

    <v-row justify="center" class="my-md-15 my-5">
        <v-col cols="12" class="text-center my-10" v-if="loading">
            <v-progress-circular
                indeterminate
                color="purple"
            ></v-progress-circular>
            <p>Loading Todo</p>
        </v-col>
        <v-col cols="12" class="mb-10" v-if="!loading && !isTodoFound && !todo">
            <v-row justify="center">
                <v-col cols="12" md="8" lg="5">
                    <v-alert type="error" color="red">Todo Not Found</v-alert>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" md="8" lg="5" v-if="todo && !loading">
            <v-card shaped>
                <v-card-text>
                    <h2 class="purple--text">Edit Todo</h2>
                    <v-divider class="mt-4 mb-5"></v-divider>
                    <v-form ref="form" @submit.prevent="save">
                        <v-text-field
                            v-model="todo.title"
                            label="Title"
                            outlined
                            color="purple"
                            :rules="[(v) => !!v || 'Title is required']"
                        ></v-text-field>
                        <v-textarea
                            v-model="todo.description"
                            label="Description"
                            outlined
                            color="purple"
                            :rules="[(v) => !!v || 'Description is required']"
                        ></v-textarea>
                        <v-btn
                            color="purple"
                            dark
                            block
                            class="py-6"
                            type="submit"
                            :loading="editLoading"
                        >
                            Edit Todo
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Header from '@/components/Header'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'EditTodo',
    components: {
      Navbar,
      Header,
    },
    computed: {
        ...mapGetters(['getTodo'])
    },
    watch: {
        getTodo(val) {
            if(val) {
                this.todo = val
            }
        }
    },
    data() {
        return {
            loading: null,
            editLoading: false,
            isTodoFound: true,
            todo: null,
        }
    },
    async created() {
        const todoId = this.$route.params.id
        const userId = this.getLoggedUser().id
        const data = { id: todoId, userId }

        this.loading = true
        const resp = await this.fetchTodo(data)
        this.loading = false

        if(resp != 1) {
            this.isTodoFound = false
        }
    },
    methods: {
        ...mapActions(['fetchTodo', 'updateTodo']),
        async save() {
            if(this.$refs.form.validate()) {
                const payload = {
                    id: this.$route.params.id,
                    data: {
                        title: this.todo.title,
                        description: this.todo.description
                    }
                }
                this.editLoading = true
                const resp = await this.updateTodo(payload)
                this.editLoading = false

                if(resp === 1) {
                    this.moveTo('/')
                }
            }
        }
    }
  }
</script>
