<template>
  <el-container style="min-height:100vh;width:100%">
      <el-header>
          <div class="header_left">logo</div>
          <div class="header_right">
              <el-avatar style="float:right;margin-top: 10px" :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          </div>
      </el-header>
      <div class="top_line"></div>
      <el-container>
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
import {mapGetters,mapActions,mapMutations} from 'vuex'

export default{
  name:'home',
  components: {Drawer},
  computed:{
    ...mapGetters([])
  },
  data () {
      return {}
  },
  mounted(){
      console.log('home')
  },
  methods:{
    ...mapActions(["findEdge","getGraph"]),
    ...mapMutations([]),
    async findEdges(){
       await this.findEdge()
    },
    // async getGraphs(){
    //   await this.getGraph()
    //   console.log("hhhhh")
    // }
  }
}
</script>
<style src="../assets/style/home.css"></style>
