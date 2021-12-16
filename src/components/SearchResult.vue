<template>
    <el-card>
        <div class="card-left">
            <div class="reliability-text">可信度评级</div>
            <el-popover
                    placement="top-start"
                    title="可信度评估详情"
                    width="200"
                    trigger="hover"
                    :content="detail">
                <span slot="reference"> <div class="reliability-num">85%</div></span>
            </el-popover>
            <el-button icon="el-icon-share" @click="toGraph">查看图谱</el-button>
        </div>
        <div class="card-right">
            <div class="question" v-if="item.title.length<this.longest">Q:&nbsp;{{item.title}}</div>
          <div class="question" v-else>Q:&nbsp;{{item.title.substr(0,this.longest-3)}}...</div>
            <div class="answer">回答数量： {{item.answer_count}}</div>
            <el-tag size="medium" v-for="tag in item.tags" :key="tag">{{tag}}</el-tag>
        </div>
    </el-card>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    export default {
        name: "SearchResult",
        computed: {
            ...mapGetters([
            ])
        },
        mounted () {
        },
      props:{
          item:{}
      },
        data () {
            return {
                longest:65,
            }
        },
        methods: {
            ...mapMutations([
            ]),
            ...mapActions([
            ]),
            toGraph () {
                this.$router.push('/home')
            }
        }
    }
</script>

<style scoped>
.el-card {
    background-color: #f2eadc;
    /*background-color: #f8f5ef;*/
    width: 100%;
    height: 30%;
    margin: auto;
    margin-bottom: 15px;
}
.el-card:hover {
    background-color: #f3e0dd;
}
    .card-left {
        width: 15%;
        float: left;
        margin-left: 25px;
    }
    .card-right {
        width: 75%;
        float: left;
        margin-bottom: 15px;
        margin-left: 30px;
        text-align: left;
    }
    .reliability-text {
        color: #a0947f;
        font-size: 20px;
    }
    .reliability-num {
        color: #6a8fad;
        font-size: 35px;
        font-weight: bold;
        margin-bottom: 25px;
    }
    .el-button {
        border: none;
        background-color: #b66359;
        color: #ffffff;
        margin-bottom: 15px;
    }
    .el-button:hover {
        background-color: #bcb3a3;
        color: #ffffff
    }
    .question {
        color: #6a8fad;
        font-size: 25px;
        font-weight: bold;
    }
    .answer {
        line-height: 30px;
        color: #004858;
        height: 70px;
      font-size: 20px;
    }
    .el-tag {
        background-color: #91b1cb;
        color: #ffffff;
        border: none;
        margin-right: 10px;
    }
    .el-tag:hover {
        background-color: #bcb3a3;
    }
</style>
