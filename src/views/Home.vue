<style src="../assets/style/home.css">
</style>
<template>
<el-container style="min-height:100vh;width:100%">
  <el-aside width="100px" style="background-color:rgb(29, 29, 29);">
    <el-menu default-active="1" class="el-menu-vertical-demo" style="background-color:rgb(29, 29, 29);">
      <div class="logo">
      <img src="../assets/logo.png" width='40px' style="margin:20px"/>
      </div>
      <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-search"></i>
        <span slot="title" style="color:rgb(228, 226, 226);">搜索</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header height="100px" style="
            padding: 16px 24px;
            height: 70px;
            background-color: white;
            border: 1px groove;
          "></el-header>
  <el-main>
    <div :style="{ padding: '24px', minHeight: '360px' }">
    <Drawer ref="ref_CJS"> </Drawer>
    </div>
  </el-main>
  </el-container>
</el-container>
</template>

<script>
import Drawer from '../components/KnowledgeGraph.vue'

export default{
  components:{
    Drawer,
  }
}
</script>
