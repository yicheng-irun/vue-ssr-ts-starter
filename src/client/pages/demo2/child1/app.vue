<template>
    <div>
        <h1 class="title">子路由1</h1>
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

    computed: {
    },

    methods: {
    },
};
</script>

<style lang="stylus">

</style>
