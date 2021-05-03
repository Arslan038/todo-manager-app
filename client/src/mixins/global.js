export default {
    methods: {
        moveTo(to) {
            if(this.$route.path !== to) {
                this.$router.push(to);
            }
        },
        getLoggedUser() {
            const user = JSON.parse(localStorage.getItem('todoUser'));
            if (user) {
              return user;
            }
            return null;
        },

        logoutUser() {
            const user = JSON.parse(localStorage.getItem('todoUser'));
            if (user) {
              localStorage.removeItem('todoUser');
              this.moveTo('/account')
            }
        }
    }
}