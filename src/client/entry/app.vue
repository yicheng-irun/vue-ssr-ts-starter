<template>
    <div id="app">
        <transition name="app-router">
            <router-view></router-view>
        </transition>
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
    },
};
</script>

<style lang="stylus">
#app {
    // overflow-x hidden;
}
.app-router-enter-active, .app-router-leave-active {
    transition: opacity .5s, transform .5s;
}
.app-router-leave-active {
    position absolute;
    top 0;
    width 100%;
}

.app-router-enter {
    // transform-origin 50% 0;
    opacity: 0;
    transform translate(0, -30px);
}
.app-router-leave-to {
    opacity: 0;
    transform translate(0, 60px);
}
</style>
