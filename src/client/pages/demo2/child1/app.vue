<template>
    <div>
        <div>msg: {{ $store.state.msg }}</div>
        <h1 class="title">子路由1</h1>
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
    },

    methods: {
    },
};
</script>

<style lang="stylus">

</style>
