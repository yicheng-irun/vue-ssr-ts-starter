<template>
    <div>
        <h1 class="title">index</h1>
        <div class="links">
            <router-link to="/demo">Go to Demo</router-link>
        </div>
        <div class="links">
            <router-link to="/demo2">Go to Demo2</router-link>
            <router-link to="/demo2/child1">Go to Demo2的child1</router-link>
            <router-link to="/demo2/child2">Go to Demo2的child2</router-link>
        </div>
    </div>
</template>

<script>

import createStore from './store';

export default {
    name: 'App',

    components: {
    },

    createStore,

    data () {
        return {
        };
    },

    computed: {
        state () {
        },
    },

    methods: {
    },
};
</script>

<style lang="stylus">
@import './app.styl';

h1.title {
    margin 100px 0 50px 0;
    color: rgba(0, 0, 0, 0.5);
    text-align center;
    font-size 50px;
    color #f00;
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
