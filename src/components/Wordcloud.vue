<template>
    <div>
        <div id="chart" style="width: 800px; height: 400px;margin: 0 auto"></div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import * as echarts from 'echarts'
    import 'echarts-wordcloud'
    export default {
        name: "Wordcloud",
        data () {
            return {
                wordlist: [
                    {name: 'pytorch', value: 20000},
                    {name: 'C++', value: 21032},
                    {name: 'Java', value: 25003},
                    {name: 'python', value: 26422},
                    {name: 'C#', value: 18452},
                    {name: 'linux', value: 12500},
                    {name: 'windows', value: 13250},
                    {name: '.net', value: 14201},
                    {name: 'spring', value: 14202},
                    {name: 'Git', value: 16580},
                    {name: 'php', value: 16581},
                    {name: 'tensorflow', value: 11543},
                    {name: 'mysql', value: 10325},
                    {name: 'opencv', value: 14023},
                    {name: 'nodejs', value: 21046},
                    {name: 'javascript', value: 19420},
                    {name: 'css', value: 16421},
                    {name: 'vue', value: 17423},
                    {name: 'android', value: 15424},
                    {name: 'image', value: 15424},
                    {name: 'ios', value: 15425},
                    {name: 'arrays', value: 17426},
                    {name: 'regex', value: 18427},
                    {name: 'pandas', value: 13428},
                    {name: 'azure', value: 12428},
                    {name: 'docker', value: 14428},
                    {name: 'selenium', value: 12128},
                    {name: 'http', value: 14037},
                    {name: 'security', value: 12037},
                    {name: 'Json', value: 17037},
                    {name: 'xml', value: 15037},
                    {name: 'Ajax', value: 14037},
                    {name: 'swift', value: 13037},
                ],
                colorlist: [
                   '#e7ac67','#5e8040','#9c9bd4','#a8222b' ,'#a0947f','#6a8fad','#004858','#e48082','#a48477','#9dbdc6','#547c69'
                ]
            }
        },
        mounted() {
            this.initchart();
        },
        methods: {
            ...mapActions([
               'getTagFAQ'
            ]),
            initchart() {
                let that = this
                let myChart = echarts.init(document.querySelector("#chart"));
                myChart.setOption({
                    series: [
                        {
                            type: "wordCloud",
                            //用来调整词之间的距离
                            gridSize: 20,
                            sizeRange: [14, 80],
                            rotationRange: [0, 0],
                            //随机生成字体颜色
                            textStyle: {
                                color: function () {
                                    return (
                                        that.colorlist[Math.floor((Math.random()*that.colorlist.length))]
                                    );
                                },
                            },
                            //位置相关设置
                            left: "center",
                            top: "center",
                            right: null,
                            bottom: null,
                            width: "200%",
                            height: "200%",
                            //数据
                            data: that.wordlist,
                        },
                    ],
                });
                //点击事件
                myChart.on('click', async function(params) {
                    console.log(params.data.name)
                    await that.getTagFAQ(params.data.name)
                    .then(()=>{
                        that.$router.push('/search')
                    })
                    .catch((err) => console.log(err));
                })
            }
        }
    }
</script>

<style scoped>

</style>
