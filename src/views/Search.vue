<template>
    <el-container class="all" direction="vertical">
<!--        <div class="top_line"></div>-->
        <el-header>
            <div class="header_left">logo</div>
            <div class="header_right">
                <div class="searchBox">
                    <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                </div>
                <el-avatar style="float:right;margin-top: 10px" :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            </div>
        </el-header>
        <div class="top_line"></div>
        <!--搜索结果展示-->
        <el-container direction="horizontal" style="width: 80%;margin-left: 10%;margin-top: 2%">
            <el-aside width="20%"> </el-aside>
            <el-scrollbar style="height: 100%;width:100%;overflow-x: hidden">
                <el-main class="resultBox">
                    <div class="resultHeader">
                        <span style="font-weight: bold"> Search Result</span> for "{{this.question}}"
                        <div class="resultCount">{{this.searchResult.length}} results</div>
                    </div>
                  <li v-for="(item,index) in this.searchResult" :key="index">
                    <SearchResult v-bind:item="item"></SearchResult>
                  </li>
<!--                    <el-pagination-->
<!--                            layout="prev, pager, next"-->
<!--                            page-size="8"-->
<!--                            :total="resultCount">-->
<!--                    </el-pagination>-->
                </el-main>
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import SearchResult from "../components/SearchResult";
// import {addNodeAPI} from "../api/node"
export default {
    name: "Search",
    components: {SearchResult},
    computed: {
        ...mapGetters([
            'question',
            'searchResult'
        ])
    },
    data () {
        return {
            searchInput:'',
            resultCount: 150,
        }
    },
    mounted () {
        console.log(this.searchResult)
        this.searchInput = this.question
    },
    methods: {
      ...mapMutations([
        'set_question'
      ]),
      ...mapActions([
        'getResult',
        'getTagFAQ'
      ]),
        async search () {
          await this.getResult(this.searchInput)
              .then(()=>{
                this.set_question(this.searchInput)
              })
              .catch((err) => console.log(err));
        },
    }
}
</script>

<style scoped>
    .all {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #f6f2f2;
    }
    .header_left{
        width: 20%;
        float: left;
        color: #f2eadc;
        font-size: 40px;
        text-align: left;
        margin-left: 30px;
    }
    .header_right {
        width: 77%;
        float: left;
    }
    .searchBox {
        width: 70%;
        margin-left: 100px;
        float: left;
    }
    .top_line {
        width: 100%;
        height: 4px;
        background-color: #a8222b;
    }
    .el-header {
        background-color: #a8222b;
        color: #333;
        text-align: center;
        line-height: 60px;
        padding: 0;
    }

    .el-aside {
        background-color: #bcb3a3;
        color: #333;
        text-align: center;
        line-height: 50px;
    }
    .resultBox {
        /*background-color: #f2eadc;*/
        /*background-color: #faf7f1;*/
        color: #333;
        text-align: center;
        line-height: 50px;
        overflow-x: hidden;
        margin-left: 15px;
        width: 100%
    }
    .resultHeader {
        margin-top: 15px;
        text-align: left;
        font-size: 30px;
        color: #004858
    }
    .resultCount {
        margin-top: 20px;
        margin-bottom: 20px;
        color: #6a8fad;
        font-weight: bold;
    }
</style>
