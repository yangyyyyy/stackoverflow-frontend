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
                    {name: 'pytorch', value: 15000},
                    {name: 'C++', value: 21032},
                    {name: 'java', value: 25003},
                    {name: 'python', value: 16422},
                    {name: 'C#', value: 18452},
                    {name: 'linux', value: 12500},
                    {name: 'windows', value: 13250},
                    {name: '.net', value: 14201},
                    {name: 'C', value: 16580},
                    {name: 'tensorflow', value: 11543},
                    {name: 'caffee', value: 10325},
                    {name: 'opencv', value: 14023},
                    {name: 'nodejs', value: 21046},
                    {name: 'javascript', value: 19420},
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
                                        "rgb(" +
                                        Math.round(Math.random() * 255) +
                                        ", " +
                                        Math.round(Math.random() * 255) +
                                        ", " +
                                        Math.round(Math.random() * 255) +
                                        ")"
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
                myChart.on('click', function(params) {
                    console.log(params.data.name)
                    that.getTagFAQ(params.data.name)
                })
            }
        }
    }
</script>

<style scoped>

</style>
