<template>
   <div id="app">
      <h1 class="title">
         index
      </h1>
   </div>
</template>

<script>


export default {
   name: 'App',
   components: {
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
