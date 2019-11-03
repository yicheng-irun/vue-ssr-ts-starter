<template>
    <div>
        <h1 class="title">子路由2</h1>
        <div>msg: {{ $store.state.msg }}</div>
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

    asyncData () {
    },

    computed: {
    },

    methods: {
    },
};
</script>

<style lang="stylus">

</style>
