<style src='../assets/style/knowledgeGraph.css'></style>
<template>
  <div class="drawer">
    <button @click="scratch">开始爬取</button>
    <p>当前节点数：{{this.nodesNum}}</p>
    <div id="cytoscape_id"></div>
  </div>
</template>

<script>
import cytoscape from "cytoscape";
import { mapGetters, mapActions, mapMutations } from "vuex";
import {PythonScratchAPI} from "@/api/graph";

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
    ...mapGetters(["currentId","graphList"]),
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
    this.$cy.on('mouseover','node', function (event) {
      console.log(event)
    })
    this.$cy.style()
    /* 未选择节点样式 */
      .selector('node')
      .style({
        // content: 'data(id)',
        'pie-size': '100%',
        'text-valign': 'center',
        'text-halign': 'center',
        label: 'data(name)',
        'font-size': '5pt',
        width: '50',
        height: '50',
        'background-color': '#fce9cc',
      })
      /* 已选择节点样式 */
      .selector("node:selected")
      .style({ "border-color": "#c84e40", "border-width": "2px"})
      /* 未选择节点样式 */
      .selector("edge")
      .style({
        label: "data(name)",
        "target-arrow-shape": "triangle" /* 箭头样式 */,
        "target-arrow-size": "1px" /* 箭头大小 */,
        "target-arrow-color": "rgba(106,143,173,0.9)" /* 箭头颜色 */,
        "curve-style": "bezier" /* 线条样式曲线 */,
        "line-color": "rgba(106,143,173,0.9)" /* 线条颜色 */,
        width: "1px" /* 线条宽度 */,
        "font-size": "8px" /* 标签字体大小 */,
        color: "#000000" /* 标签字体大小 */,
        // 'text-outline-color': 'white', /* 文本轮廓颜色 */
        // 'text-outline-width': '0.5px', /* 文本轮廓宽度 */
        "text-rotation": "autorotate" /* 标签方向 */,
      })
      /* 已选择节点样式 */
      .selector("edge:selected")
      .style({
        color: "#d07868" /* 标签字体大小 */,
        "target-arrow-color": "#acd3ee" /* 箭头颜色 */,
        "line-color": "#acd3ee" /* 线条颜色 */,
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
        .selector(".1")
        .style({'background-color': '#eaabb0'})
        .selector(".2")
        .style({'background-color': '#99f6a0'})
      .selector(".4")
      .style({'background-color': '#FFFACD'})
      .selector(".5")
      .style({'background-color': '#48D1CC'})
      .selector(".6")
      .style({'background-color': '#B0E0E6'})
      .selector(".related")
      .style({"line-color": "#FFFACD" /* 线条颜色 */,})
      .selector(".answer")
      .style({"line-color": '#48D1CC' /* 线条颜色 */,})
    ;
      for(var i=0;i<100;i++){
        this.$cy.style().selector('.q'+i)
            .style({'background-color': '#eaabb0',width:i+10,height:i+10})
        .update()
        this.$cy.style().selector('.a'+i)
            .style({'background-color': '#99f6a0',width:i+10,height:i+10})
            .update()
      }
  },
  data(){
    return {
      question:{},
      nodes:[],
      edges:[],
      node_ids:[],
      edge_ids:[],
      nodesNum:1,
    }
  },
  methods:{
      ...mapActions(["getGraph"]),
      ...mapMutations([]),
      // 添加元素
    addEles(eles) {
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
      this.question=this.$route.query.question
      console.log(this.question)
      this.$cy.elements().remove()
      if(this.question.score<0){
        this.question.score=0
      }
      this.addEles({
        group: "nodes",
        data:{
          id:this.question.question_id,
          name:this.getQuestion(this.question.title),
          size:this.question.score
        },
        classes: 'q'+this.question.score,
      })
      this.$cy.layout({name: 'cose',randomize: false,animate: false,padding:0,componentSpacing: 30,nodeOverlap:4
      }).run()
      this.refresh()
    },
    async store_data(node_name){
      await PythonScratchAPI(node_name)
                .then((res) => {
                  for (var i=0;i<res.nodes.length;i++){
                  var node = res.nodes[i]
                  if(this.node_ids.indexOf(node["node_name"])==-1){
                    let list=[]
                    list.push(res.nodes[i])
                    this.transform(list)
                    this.refresh()
                    this.nodes.push(node)
                    this.node_ids.push(node["node_name"])
                    this.nodesNum++;
                    // var startTime = new Date().getTime();
                    // // eslint-disable-next-line no-empty
                    // while(new Date().getTime()-startTime<100){
                    //
                    // }
                    }
                  }
                  for ( i=0;i<res.edges.length;i++){
                    var edge = res.edges[i]
                    if(this.edge_ids.indexOf(edge["edge_name"])==-1){
                      let list=[]
                      list.push(res.edges[i])
                      this.transform(list)
                      this.refresh()
                      this.edges.push(edge)
                      this.edge_ids.push(edge["edge_name"])
                    }
                  }
                  }).catch((err) => console.log(err));
              // console.log(this.nodes)
              // console.log(this.node_ids)
              // console.log("received data")
    },

    async scratch(){
       var startTime = new Date().getTime();
       var now = new Date().getTime();
       this.nodes.push({"node_name":this.question.question_id, "node_group":"question"})
       this.node_ids.push(this.question.question_id)

       while(this.nodes.length!=0){
        now =new Date().getTime()
        if (now - startTime> 10000){
          // console.log(now-startTime)
          break
        }
        var pop_node = this.nodes.shift()
        if (pop_node["node_group"]!="question"){
          continue
        }
        await this.store_data(pop_node["node_name"])
           .then(() => {
             console.log(pop_node["node_name"])
           })
           .catch((err) => console.log(err));
        }

    },

    transform(graph){
      for (var item in graph) {
        var node=graph[item]
        const data = {}
        if(node.classes == 'node'){
          data.id = node.node_name
          data.name = node.node_content.score
          data.size = node.node_content.score
          if(data.size<0){
            data.size=0
          }
          if(data.size>=100){
            data.size=99
          }
          console.log(node)
          let classes="a"
          if(node.node_group=="question"){
            classes="q"
            data.name = this.getQuestion(node.node_content.title)
          }
          this.addEles({
            group: 'nodes',
            data,
            classes: classes+data.size,
          })
        }
        else{
          data.id=node.edge_name
          data.name = node.edge_group
          // data.labels = node.node_content.tags
          data.source=node.source
          data.target=node.target
          this.addEles({
            group: 'edges',
            data,
            classes: node.edge_group,
          })
        }
      }
    },
    getQuestion(q){
      var maxWidth=10
      if(q.length<maxWidth){
        return q
      }
      return q.substr(0,maxWidth)+"..."
      // for(var i=0;i<3;i++){
      //   if(q.length-i*maxWidth>maxWidth){
      //     res+=q.substr(i*maxWidth,maxWidth)
      //     res+="\r"
      //   }
      //   else{
      //     res+=q.substr(i*maxWidth,q.length-i*maxWidth)
      //     break;
      //   }
      // }
      // if(q.length-3*maxWidth>maxWidth){
      //   res+=q.substr(3*maxWidth,maxWidth-3)
      //   res+="...\r"
      // }
      // else if(q.length-3*maxWidth>0){
      //   res+=q.substr(3*maxWidth,q.length-3*maxWidth)
      // }
      // return res
    }

  }
};
</script>
