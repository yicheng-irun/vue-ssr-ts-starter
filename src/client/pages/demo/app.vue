<template>
    <div>
        <h1 class="title">
            demo
        </h1>
        <div class="links">
            <router-link to="/">
                Go to Index
            </router-link>
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

    data() {
        return {
        };
    },

    computed: {

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
