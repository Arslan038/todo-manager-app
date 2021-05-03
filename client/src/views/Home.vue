<template>
  <div>
    <GuestVisit v-if="!isUserLogged" />
    <div v-if="isUserLogged">
      <Navbar />
      <Header />
      <Todos />
    </div>
  </div>
</template>

<script>
  import GuestVisit from '../components/GuestVisit'
  import Navbar from '../components/Navbar'
  import Header from '../components/Header'
  import Todos from '../components/todos/Todos'

  export default {
    name: 'Home',
    components: {
      GuestVisit,
      Navbar,
      Header,
      Todos,
    },
    data() {
      return {
        isUserLogged: false
      }
    },
    created () {
      if(this.getLoggedUser()) {
        this.isUserLogged = true
      }
    }
  }
</script>
