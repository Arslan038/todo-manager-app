<template>
    <header>
        <v-row justify="center" align="center" class="header">
            <v-col cols="12" class="text-center">
                <h1 class="white--text">Welcome To Todo Manager</h1>
                <p class="white--text">Save your All Todos at one place.</p>
                <v-btn depressed color="white" @click="moveTo('/account')" class="py-7 mt-3"><v-icon class="mr-2">mdi-account</v-icon> Login to get started</v-btn>
            </v-col>
        </v-row>
    </header>
</template>

<style scoped>
.header {
    height: 102vh;
    max-height: 102vh;
    background: #7f00ff; /* fallback for old browsers */
    background: url('../assets/new_york.jpg'), -webkit-linear-gradient(to top, #320638, #320638); /* Chrome 10-25, Safari 5.1-6 */
    background: url('../assets/new_york.jpg'), linear-gradient(to top, #320638, #320638);
    /* background-image: url('../assets/new_york.jpg'); */
    background-size: cover;
    background-blend-mode: overlay;
    opacity: 1;
    overflow: hidden;
}
</style>