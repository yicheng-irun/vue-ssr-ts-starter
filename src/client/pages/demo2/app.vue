<template>
    <div id="demo2">
        <h1 class="title">DEMO2</h1>
        <p class="content">
            多层路由的demo2
        </p>
        <div>msg: {{ $store.state.msg }}</div>
        <div class="links">
            <router-link to="/">Go to Index</router-link>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
import store from './store'

export default {
    name: 'App',

    components: {
    },

    data () {
        return {
        };
    },

    store,

    computed: {
        // state () {
            // return this.$store.state;
        // },
    },

    methods: {
    },
};
</script>

<style lang="stylus">

h1.title {
    margin 100px 0 50px 0;
    color: rgba(0, 0, 0, 0.5);
    text-align center;
    font-size 50px;
    color #0f0;
}

p.content {
    margin 20px;
}

.links {
    margin 0.5em 1em
    >a{
        margin 0 1em
    }
}

</style>
