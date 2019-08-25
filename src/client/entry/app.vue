<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
        };
    },

    mounted () {
        console.log(this.$router)
    },
};
</script>

<style lang="stylus">
@import './app.styl';
</style>
