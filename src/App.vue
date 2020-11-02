<template>
<div id="app">

    <div id="nav">
        <router-link to="/login">Login</router-link> |
        <router-link to="/">TodoList</router-link> |
        <router-link to="/chart">Chart</router-link> |
        <!--<router-link to="/apexchart">Chart Apex</router-link>-->
    </div>
    <button @click="doLogout" :style="style">Logout</button>
    <router-view class="background-board" style="background-image: url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2397x1600/441febc9e828003a64f444b109ee009e/photo-1515879218367-8466d910aaa4.jpg')" />
</div>
</template>

<script>
import {
    UserService
} from '../server/user.service'
export default {
    name: 'App',
    data() {
        return {
            user: window.localStorage.getItem('account'),
            style: null
        }
    },
    created: function () {
        UserService.checkUserLogin(this.user)
    },
    methods: {
        doLogout() {
            UserService.logout()
        },
        checkUserLogin() {
            if (this.user != '' || this.user != null) {
                this.style = "display: block"
                console.log("user define")
            } else {
                this.style = "display: none"
                console.log("user undefine")
            }
        },

    },
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.background-board {
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
