import {GetGraphAPI, PythonTagFaqAPI} from "../../api/graph"
import {GetPythonGraphAPI} from "@/api/graph";
const graph={
    state:{
        graphList:[],
        isInit:false,
        question: '',
        searchResult:[],
        currentId:'',
        max_score:1,
    },
    mutations:{
        set_graphList:function(state,data){
            state.graphList=data
        },
        set_isInit:function(state,data){
            state.isInit=data
        },
        set_question:function (state, data) {
            console.log('set: ' + data)
            state.question = data
            console.log('set: ' + state.question)
        },
        set_searchResult:function(state,data){
            state.searchResult=data
        },
        set_currentId:function(state,data){
            state.currentId=data
        },
        set_max_score:function(state,data){
            state.max_score=data
        },
    },
    
    actions:{
        async getGraph({commit}){
            await GetGraphAPI({id:4})
            .then((res) => {
                var graph =res.content
                var graphList = []
                var edgeId = 0
                for (var item in graph) {
                    var node=graph[item]
                    console.log(node)
                    const data = {}
                    if(node.group == 'nodes'){
                        data.id = node.data.name
                        data.name = node.data.name
                        data.labels = node.data.content
                    }
                    else{
                        data.id = edgeId
                        edgeId++
                        data.name = node.name
                        data.labels = node.content
                    }
                    const toBeAdded = {
                        group: node.group,
                        data,
                        classes: "1",
                    }
                    // if(node.group=='nodes'){
                    //     if (node.position.x != null && node.position.y != null) {
                    //         toBeAdded.position = {
                    //             x: parseFloat(node.position.x),
                    //             y: parseFloat(node.position.y)
                    //         }
                    //     }
                    // }
                    if(node.group=='edges'){
                        toBeAdded.data.source=node.source
                        toBeAdded.data.target=node.target
                    }
                    console.log(toBeAdded.position)
                    graphList.push(toBeAdded)
                }
                console.log("graph",graphList)
                    // {"1":graphList,"2":graphList,..}

                var mygraph=graphList
                console.log(mygraph)
                // var isInit=false
                commit("set_graphList",mygraph)
              })
            .catch((err) => console.log(err));


        },

        

        async getResult({commit},question){
            function compare(){
                return function(a,b){
                    var value1 = a['score']+a['answer_count'];
                    var value2 = b['score']+b['answer_count'];
                    return value2 - value1;
                }
            }

            console.log("搜索后"+question)
            await GetPythonGraphAPI(question)
                .then((res)=>{
                    var sorted_res = res.results.sort(compare())
                    if (sorted_res[0]['score']+sorted_res[0]['answer_count']>0){
                        commit('set_max_score',sorted_res[0]['score']+sorted_res[0]['answer_count'])
                    }
                    commit("set_searchResult",sorted_res)
                })
                .catch((err) => console.log(err));
        },

        async getTagFAQ({commit}, data) {
            await PythonTagFaqAPI(data)
                .then((res) => {
                    function compare(){
                        return function(a,b){
                            var value1 = a['score']+a['answer_count'];
                            var value2 = b['score']+b['answer_count'];
                            return value2 - value1;
                        }
                    }
                    var sorted_res = res.results.sort(compare())
                    if (sorted_res[0]['score']+sorted_res[0]['answer_count']>0){
                        commit('set_max_score',sorted_res[0]['score']+sorted_res[0]['answer_count'])
                    }
                    commit('set_searchResult', sorted_res)
                    console.log(this.max_score)
                })
                .catch((err) => console.log(err))
        }

    }
}
export default graph
