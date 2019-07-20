<template>
    <div id="app">
        <h1 class="title">404</h1>
        <p>怎么找也没找到您想访问的页面: {{state.originUrl}}</p>
        <p>
            <a href="/">去我们的首页瞧瞧吧</a>
        </p>
    </div>
</template>

<script>

export default {
    name: 'App',

    components: {
    },

    data () {
        return {
        };
    },

    computed: {
        state () {
            return this.$store.state;
        },
    },

    methods: {
    },
};
</script>

<style lang="stylus">
@import './app.styl';

#app {
    >h1.title {
        margin 140px 0 50px 0;
        color: #0008;
        text-align center;
        font-size 80px;
        font-weight 400;
    }

    >p {
        text-align center;
        margin 20px;
        color #0008;
    }
}


</style>
