<template>
    <div id="app">
        <h1 class="title">
            index
        </h1>
        <div>
            {{ state.sayHi }}
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
    async fetchData (context) {
        await context.store.dispatch('fetchData');
    },
    computed: {
        state () {
            return this.$store.state;
        },
    },
};
</script>

<style lang="stylus">

h1.title {
    margin 100px 0 50px 0;
    color: rgba(0, 0, 0, 0.5);
    text-align center;
    font-size 40px;
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
