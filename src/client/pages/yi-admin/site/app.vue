<template>
   <div id="ya-site-page">
      <div class="ya-header">
         <div class="site-name">
            yi-admin
         </div>
      </div>
      <div class="ya-main">
         <div class="ya-left-block">
            <el-menu
               default-active="1-4-1"
               :collapse="isCollapse"
               background-color="#444c54"
               text-color="#fff"
               active-text-color="#108ee9"
               @open="handleOpen"
               @close="handleClose"
            >
               <el-submenu index="1">
                  <template slot="title">
                     <i class="el-icon-location" />
                     <span slot="title">导航一</span>
                  </template>
                  <el-menu-item-group>
                     <span slot="title">分组一</span>
                     <el-menu-item index="1-1">
                        选项1
                     </el-menu-item>
                     <el-menu-item index="1-2">
                        选项2
                     </el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="分组2">
                     <el-menu-item index="1-3">
                        选项3
                     </el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="1-4">
                     <span slot="title">选项4</span>
                     <el-menu-item index="1-4-1">
                        选项1
                     </el-menu-item>
                  </el-submenu>
               </el-submenu>
               <el-menu-item index="2">
                  <i class="el-icon-menu" />
                  <span slot="title">导航二</span>
               </el-menu-item>
               <el-menu-item
                  index="3"
                  disabled
               >
                  <i class="el-icon-document" />
                  <span slot="title">导航三</span>
               </el-menu-item>
               <el-menu-item index="4">
                  <i class="el-icon-setting" />
                  <span slot="title">导航四</span>
               </el-menu-item>
            </el-menu>
         </div>
         <div class="ya-right-block">
            right
         </div>
      </div>
   </div>
</template>

<script>
import '../components/element-ui';

export default {
   data () {
      return {
         isCollapse: false,
         menus: [
            {
               icon: 'location',
               title: '导航',
            },
         ],
      };
   },
};
</script>

<style lang="stylus">

leftWidth = 13em;

html, body {
    position relative
    width 100%
    height 100%
}
body {
    margin: 0
    font-size: 16px
}
#ya-site-page {
    position relative
    width 100%
    height 100%
    background #f5f6f7
    color #000a
    >.ya-header {
        position relative
        top 0
        width 100%
        height 3em
        line-height 3em
        z-index 10
        background #fff
        box-shadow 0 0 0.3em #0001
        >.site-name {
            display inline-block
            vertical-align top
            font-size 1.1em
            padding 0 1em
            margin 0 0.2em
        }
    }
    >.ya-main {
        position absolute
        top 3em
        bottom 0
        width 100%
        z-index 5
        >.ya-left-block {
            position absolute
            width leftWidth
            height 100%
            overflow-y auto
            background-color #444c54
            color #fffb
            >.el-menu {
                border-right none
            }
        }
        >.ya-right-block {
            position relative
            height 100%;
            margin 0 0 0 leftWidth;
        }
    }
}
</style>
