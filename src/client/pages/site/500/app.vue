<template>
    <div id="app">
        <h1 class="title">500</h1>
        <p>A Server Error Occurred!</p>
        <p>糟糕，服务器好像被你搞崩溃了</p>
        <p>错误信息: {{ state.message }}</p>
        <div class="stack">
            <pre>{{ state.stack }}</pre>
        </div>
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
    >div.stack {
        text-align center;
        font-size 12px;
        overflow-x auto;
        margin 0 10px;
        >pre {
            display inline-block;
            text-align left;
            color #0008;
        }
    }
}

</style>
