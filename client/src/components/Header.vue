<template>
    <header>
        <v-row justify="center" align="center" class="header">
            <v-col cols="12" class="text-center">
                <h1 class="white--text">Welcome To Todo Manager</h1>
                <p class="white--text">Save your All Todos at one place.</p>
                <v-btn depressed color="white" @click="moveTo('/todos/create')" class="px-7 py-6 mt-3"><v-icon class="mr-2">mdi-plus</v-icon> Add New Todo</v-btn>
            </v-col>
        </v-row>
    </header>
</template>

<style scoped>
.header {
    height: 400px;
    background: #7f00ff; /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #5f056b, #9C27B0); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #5f056b, #9C27B0);
}
</style>