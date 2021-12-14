<style src='../assets/style/knowledgeGraph.css'></style>
<template>
  <div class="drawer">
    <button @click="getGraphContinuously">开始爬取</button>
    <div id="cytoscape_id"></div>
  </div>
</template>

<script>
import cytoscape from "cytoscape";
import { mapGetters, mapActions, mapMutations } from "vuex";
import {GetPythonGraphAPI} from "@/api/graph";

export default {
  name: "Drawer",
  beforeCreate() {
    this.$cy && this.$cy.destroyed() && this.$cy.destroy();
    delete this.$cy;
  },
  beforeDestroy() {
    this.$cy && this.$cy.destroyed() && this.$cy.destroy();
    delete this.$cy;
  },
  watch: {
    ...mapGetters(["graphList"]),
  },
  props: {},
  components: {},
  computed: {},
  mounted() {
    // 画布
    this.$cy = cytoscape({
      container: document.getElementById("cytoscape_id"),
      // 一个指定布局选项的普通对象.
      userZoomingEnabled: true, // 是否允许用户事件(例如鼠标滚轮,捏合缩放)缩放图形.对此缩放的编程更改不受此选项的影响.
      boxSelectionEnabled: false,
    });
    this.getGraphList()
    // 通用的样式
    this.$cy.style()
    /* 未选择节点样式 */
      .selector('node')
      .style({
        // content: 'data(id)',
        'pie-size': '100%',
        'text-valign': 'center',
        'text-halign': 'center',
        label: 'data(name)',
        'font-size': '15pt',
        width: '50pt',
        height: '50pt',
        'background-color': '#fce9cc',
      })
      /* 已选择节点样式 */
      .selector("node:selected")
      .style({ "border-color": "#c84e40", "border-width": "1px"})
      /* 未选择节点样式 */
      .selector("edge")
      .style({
        label: "data(name)",
        "target-arrow-shape": "triangle" /* 箭头样式 */,
        "target-arrow-size": "1px" /* 箭头大小 */,
        "target-arrow-color": "rgba(230,230,250,0.9)" /* 箭头颜色 */,
        "curve-style": "bezier" /* 线条样式曲线 */,
        "line-color": "rgba(230,230,250,0.9)" /* 线条颜色 */,
        width: "1px" /* 线条宽度 */,
        "font-size": "10px" /* 标签字体大小 */,
        color: "#000000" /* 标签字体大小 */,
        // 'text-outline-color': 'white', /* 文本轮廓颜色 */
        // 'text-outline-width': '0.5px', /* 文本轮廓宽度 */
        "text-rotation": "autorotate" /* 标签方向 */,
      })
      /* 已选择节点样式 */
      .selector("edge:selected")
      .style({
        color: "#90acfc" /* 标签字体大小 */,
        "target-arrow-color": "#9ad3f8" /* 箭头颜色 */,
        "line-color": "#abdbfa" /* 线条颜色 */,
      })
      /* 高亮样式 */
      .selector(".light-off")
      .style({ opacity: "0.1" })
      /* 拖拽添加边样式*/
      .selector(".eh-handle")
      .style({
        "background-color": "#fce9cc",
        width: 12,
        height: 12,
        shape: "ellipse",
        "overlay-opacity": 0,
        "border-width": 12, // makes the handle easier to hit
        "border-opacity": 0,
      })
      .selector(".0")
      .style({'background-color': '#fce9cc'})
      .selector(".1")
      .style({'background-color': '#aeeaf5'})
      .selector(".2")
      .style({'background-color': '#FFC0CB'})
      .selector(".3")
      .style({'background-color': '#FFF8DC'})
      .selector(".4")
      .style({'background-color': '#FFFACD'})
      .selector(".5")
      .style({'background-color': '#48D1CC'})
      .selector(".6")
      .style({'background-color': '#B0E0E6'});
  },
  data(){},
  methods:{
      ...mapActions(["getGraph"]),
      ...mapMutations([]),
      // 添加元素
    addEles(eles) {
      // console.log(eles)
      if (eles) {
        this.$cy.startBatch();
        this.$cy.batch(() => {
          const elements = ((Array.isArray ? Array.isArray(eles) : eles != null && eles instanceof Array) ? eles : [eles])
          const filterElements = elements.filter(__ => !this.$cy.getElementById(__.data.id).length)
          this.$cy.add(filterElements)
          // this.$cy.layout({name:"cose"}).run()
        })
        this.$cy.endBatch()
      }
    },
    // 删除选择的内容(可能是顶点, 也可能是关系)
     delEles() {
      this.$cy.startBatch();
      this.$cy.batch(() => {
        const selectedEles = this.$cy.elements(":selected");
        // console.log(selectedEles)
        // 未选择不进行操作
        if (!selectedEles || selectedEles.length < 1) {
          return false
        }
        selectedEles.remove()
      })
      this.$cy.endBatch()
    },
    // 缩放大小
    zoom(zoom) {
      /** 获取已选择内容 */
      const selectedEles = this.$cy.elements('node:selected')
      /** 获取已选择内容中得第一个, 没有选择为null */
      const selectedEle = selectedEles && selectedEles.length ? selectedEles[0] : null
      /** 获取画布偏移位置 */
      const pan = this.$cy.pan()
      /** 计算原点坐标 */
      const [x, y] = selectedEle ? [selectedEle.position('x'), selectedEle.position('y')] : [pan.x, pan.y]
      let level = this.$cy.zoom() + zoom;
      (level > this.$cy.maxZoom) && (level = this.$cy.maxZoom);
      (level < this.$cy.minZoom) && (level = this.$cy.minZoom)
      this.$cy.zoom({
        level: level,
        renderedPosition: {
          x: x,
          y: y
        }
      })
    },
    // 放大
    magnifying () {
      this.zoom(0.3)
    },
    // 缩小
    contractible () {
      this.zoom(-0.3)
    },
    // 合适大小
    resize () {
      this.$cy.fit()
    },
    // 高亮
    //  @param ele 某元素ID
    lightOn(ele) {
      this.$cy.startBatch();
      this.$cy.batch(() => {
        this.$cy.elements().addClass('light-off') //* 添加样式*/
        const elements = ((Array.isArray ? Array.isArray(ele) : ele != null && ele instanceof Array) ? ele : [ele])
        elements.forEach(__ => {
          this.$cy.getElementById(__).removeClass('light-off')
          this.$cy.getElementById(__).neighborhood().removeClass('light-off')
        })
      })
      this.$cy.once('click', () => this.lightOff())
      this.$cy.endBatch()
    },
    // 取消高亮
    lightOff() {
      this.$cy.startBatch();
      this.$cy.batch(
        () => this.$cy.elements().removeClass("light-off") /* 移除样式 */
      );
      this.$cy.endBatch();
    },
    /** 高亮邻居 */
    highlight () {
      const selectedEles = this.$cy.elements('node:selected')
      /** 获取已选择内容中得第一个, 没有选择为null */
      const selectedEle = selectedEles && selectedEles.length ? selectedEles[0] : null;
      (selectedEle) && (this.lightOn(selectedEle.id()))
    },
    /**
     * 刷新布局.
     * name取值范围:
     * ['cose','fcose','klay' ]
     */
    refresh({ name = "cose", randomize = false, animate = true } = {}) {
      this.$cy
        .layout({ name: name, randomize: randomize, animate: animate,padding:0,componentSpacing: 30,nodeOverlap:10 })
        .run();
    },
    /**
     * 导出全局图片.
     */
    exportPng() {
      const blob = this.$cy.png({
        output: "blob",
        bg: "transparent",
        full: true,
        scale: 4,
        quality: 1,
      });
      const [aLink, evt] = [
        document.createElement("a"),
        document.createEvent("HTMLEvents"),
      ];
      evt.initEvent("click", true, true);
      [aLink.download, aLink.href] = [
        `${new Date().getTime()}.png`,
        URL.createObjectURL(blob),
      ];
      aLink.dispatchEvent(evt);
      aLink.click();
    },
    //获取图
    async getGraphList(){
      await this.getGraph()
      //   var graphIndex=this.$store.getters.currentIndex
      //   var allGraphs=this.$store.getters.allGraphList
      //   var graph=allGraphs[graphIndex]
      //   // console.log(graph)
      var graph=this.$store.getters.graphList
      this.$cy.elements().remove()
      this.addEles(graph)
      console.log(graph)
      //   if(!(this.$store.getters.isInitList[graphIndex])){
      this.$cy.layout({name: 'cose',randomize: false,animate: false,padding:0,componentSpacing: 30,nodeOverlap:4
      }).run()
      this.resize()
    },
    async getGraphContinuously(){
       await GetPythonGraphAPI("python")
           .then((res) => {
             var graph =res.content
             console.log(graph)
           })
           .catch((err) => console.log(err));
    }
  }
};
</script>
