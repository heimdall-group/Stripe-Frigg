<template>
    <v-app>
        <v-container>
            <v-form @submit.prevent="onSubmit">
                <v-text-field label="Email" type="email" v-model="email"></v-text-field>
                <v-text-field label="Password" type="password" v-model="password"></v-text-field>
                <v-btn type="submit">Sign in</v-btn>
            </v-form>
        </v-container>
    </v-app>
</template>

<script>

export default {
    setup() {
    },
    name: 'signInComponent',
    data() {
        return {
            email: 'testo13@gmail.com',
            password: '123456',
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            signInUser(this.email, this.password).then((res) => {
                if(res) {
                    this.$router.push('/');
                }
            })
        }
    },
}

</script>