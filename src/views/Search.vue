<template>
    <el-container direction="vertical">
<!--        <div class="top_line"></div>-->
        <el-header>
            <div class="header_left">logo</div>
            <div class="header_right">
                <div class="searchBox" v-if="showResult">
                    <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="search" id="topbtn"></el-button>
                    </el-input>
                </div>
                <el-avatar style="float:right;margin-top: 10px" :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            </div>
        </el-header>
        <div class="top_line"></div>
        <!--首页-->
        <el-container v-if="!showResult">
          <el-main class="introBox">
              <div class="logoBox">LOGO</div>
              <div class="searchBox2">
                  <el-input placeholder="请输入内容" v-model="searchInput" class="inputbox">
                      <el-button slot="append" icon="el-icon-search" @click="search2" id="searchbtn"></el-button>
                  </el-input>
              </div>
              <div class="trend">
                  <div class="trend_title">Hot Network Questions</div>
                  <div class="trend_item" @click="search2">
                      <div class="trend_no">1</div>
                      <div class="trend_content">How were the special effects achieved for the Kraftwerk Die Roboter 1978 music video?</div>
                  </div>
                  <div class="trend_item" @click="search2">
                      <div class="trend_no">2</div>
                      <div class="trend_content">Which block cipher mode of operation does TLS 1.3 use?</div>
                  </div>
                  <div class="trend_item" @click="search2">
                      <div class="trend_no">3</div>
                      <div class="trend_content">How can I get around Intel RST thingy while trying to install Ubuntu?</div>
                  </div>
                  <div class="trend_item" @click="search2">
                      <div class="trend_no">4</div>
                      <div class="trend_content">What is the point of moving a fallen PC in the initiative order?</div>
                  </div>
                  <div class="trend_item" @click="search2" style="margin-bottom: 20px">
                      <div class="trend_no">5</div>
                      <div class="trend_content">Why is there a difference between `0--3//2` and `--3//2`?</div>
                  </div>
              </div>
          </el-main>
        </el-container>
        <!--搜索结果展示-->
        <el-container v-else direction="horizontal" style="width: 80%;margin-left: 10%;margin-top: 2%">
            <el-aside width="20%"> </el-aside>
            <el-scrollbar style="height: 100%;overflow-x: hidden">
                <el-main class="resultBox">
                    <div class="resultHeader">
                        <span style="font-weight: bold"> Search Result</span> for "{{searchInput}}"
                        <div class="resultCount">{{resultCount}} results</div>
                    </div>
                    <SearchResult></SearchResult>
                    <SearchResult></SearchResult>
                    <SearchResult></SearchResult>
                    <SearchResult></SearchResult>
                    <SearchResult></SearchResult>
                    <SearchResult></SearchResult>
                    <SearchResult></SearchResult>
                    <SearchResult></SearchResult>
                    <el-pagination
                            layout="prev, pager, next"
                            page-size="8"
                            :total="resultCount">
                    </el-pagination>
                </el-main>
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import SearchResult from "../components/SearchResult";
import {addNodeAPI} from "../api/node"
export default {
    name: "Search",
    components: {SearchResult},
    computed: {
        ...mapGetters([
        ])
    },
    data () {
        return {
            searchInput:'',
            resultCount: 150,
            showResult: false
        }
    },
    methods: {
        ...mapMutations([
        ]),
        ...mapActions([
        ]),
        mounted () {
        },
        search () {
            console.log(this.searchInput)
        },
        search2 () {
            // console.log(this.showResult)
            let t = addNodeAPI({ chartId:1})
          console.log(t)
            // this.showResult = true
        }
    }
}
</script>

<style scoped>
    .header_left{
        width: 20%;
        float: left;
        color: #f2eadc;
        font-size: 40px;
        text-align: left;
        margin-left: 30px;
    }
    .logoBox {
        color: #a8222b;
        font-size: 60px;
        text-align: center;
        margin-top: 5%;
        font-family:"Lucida Handwriting",Helvetica,sans-serif;
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
    .searchBox2{
        margin: 20px auto;
        width: 55%;
    }
    .trend {
        width: 50%;
        height: 50%;
        background-color: #f3e0df;
        margin: 50px auto 39px;
        border-radius: 10px;
    }
    .trend_title {
        line-height: 70px;
        font-size: 25px;
        margin-left: 30px;
        color: #1485a0;
        font-weight: bold;
        font-family:"Papyrus",	Arial,sans-serif;
    }
    .trend_item {
        line-height: 50px;
        margin-left: 30px;
    }
    .trend_no {
        width: 20px;
        height: 20px;
        color: #13a0bd;
        float: left;
        font-size: 20px;
        font-weight: bold;
        font-family:"Lucida Handwriting",Helvetica,sans-serif;
    }
    .trend_content {
        margin-left: 30px;
        color: #6d5447;
        font-size: 18px;
        font-family:"Verdana",Helvetica,sans-serif;
    }
    .trend_content:hover {
        color: #13a0bd;
    }
    .introBox {
        width: 100%;
        height: 100%;
        background-color: #faf7f1;
        padding-bottom: 0px;
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
    .inputbox >>>.el-input__inner {
        border: 3px solid #c68c86;
        border-radius: 10px 0 0 10px;
        border-right: none;
        background-color: #faf7f1;
        color: #011a1c;
    }
    .inputbox >>>.el-input__inner:focus {
        border: 3px solid #a8222b;
        border-radius: 10px 0 0 10px;
        border-right: none;
        background-color: #faf7f1;
        color: #004858;
    }
    #searchbtn{
        background-color: #a8222b;
        border: 1px solid #a8222b;
        border-left: none;
        border-radius: 0px 10px 10px 0px;
        color: white;
        width: 80px;
    }
    #searchbtn:hover {
        background-color: #b66359;
    }
</style>
