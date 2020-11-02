<template>
<div>
    <div class="login-top col-10">
        <form>
            <!-- <h3 v-if="viewLogin" class="title">Log In</h3> -->
            <div>
                <div class="login-ic">
                    <!-- <i></i> -->
                    <input v-model="email" required autofocus type="text" value="Username" placeholder="Username" autocomplete="new-email" />
                    <div class="clear"> </div>
                </div>
                <div class="login-ic">
                    <!-- <i class="icon"></i> -->
                    <input type="password" v-model="password" required placeholder="Password" autocomplete="new-password" />
                    <div class="clear"> </div>
                </div>

            </div>
        </form>
        <div class="log-bwn">
            <button class="btn-submit" @click="userLogin()">
                <span>Log In</span>
            </button>
            <router-link to="/register">Register</router-link>
        </div>
        <ApexChart />
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex';
import ApexChart from './ApexChart'

import {
    UserService
} from '../../server/user.service'
export default {
    name: 'LoginForm',
    components: {
        ApexChart
    },
    data() {
        return {
            email: '',
            password: '',
            viewLogin: true,
            mfaCode: '',
            pending: false,
            dataChart: null
        };
    },
    computed: {
        ...mapState('account', ['status']),
    },
    created: function () {

    },
    methods: {
        ...mapActions('account', ['login']),
        userLogin() {

            const {
                email,
                password
            } = this;
            var self = this;
            self.pending = true;
            localStorage.setItem('usernameRegister', email);

            if (email && password) {
                UserService.login({
                        email,
                        password
                    }).then(() => {
                        if (this.$route.params.nextUrl != null) {
                            this.$router.push(this.route.params.nextUrl);
                        } else {
                            UserService.getDataChart()
                            // this.$router.push('/apexchart');
                            // window.location.reload()
                        }
                        this.$alertify.success('Login successfuly', {
                            duration: 2000,
                        });
                    })
                    .catch(err => {
                        self.pending = false;
                        if (err.response) {
                            if (err.response.status == 405) {
                                self.viewLogin = false;
                            } else {
                                var message = err.response.data.message;
                                this.$alertify.error(message, {
                                    duration: 4000,
                                });
                            }
                        } else {
                            // this.$alertify.error(err, {
                            //     duration: 4000,
                            // });
                        }
                    });
            }
        },

    },
}
</script>
