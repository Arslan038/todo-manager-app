<template>
  <div>
    <Navbar />
    <Header />

    <v-row justify="center" class="my-md-15 my-5">
        <v-col cols="12" md="8" lg="5">
            <v-card shaped>
                <v-card-text>
                    <h2 class="purple--text">Add New Todo</h2>
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
                            :loading="loading"
                        >
                            Add Todo
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

  export default {
    name: 'CreateTodo',
    components: {
      Navbar,
      Header,
    },
    data() {
        return {
            loading: null,
            todo: {
                title: null,
                description: null,
                userId: this.getLoggedUser().id
            }
        }
    },
    methods: {
        async save() {
            if(this.$refs.form.validate()) {
                
                this.loading = true
                const resp = await this.$store.dispatch('createTodo', this.todo)
                this.loading = false

                if(resp == 1) {
                    this.moveTo('/')
                }
            }
        }
    }
  }
</script>
