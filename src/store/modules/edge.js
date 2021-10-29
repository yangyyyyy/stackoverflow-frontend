import {AddEdgeAPI,UpdateEdgeAPI,DeleteEdgeAPI,FindEdgeAPI} from "../../api/edge"

const edge={
    state:{

    },
    mutations:{

    },
    actions:{
        async addEdge(){
             var params={}
            await AddEdgeAPI({edge:params})
            .then((res) => {
                console.log("result",res)
              })
              .catch((err) => console.log(err));
        },

        async updateEdge(){
            var params={}
            await UpdateEdgeAPI({edge:params})
            .then((res) => {
                console.log("result",res)
              })
              .catch((err) => console.log(err));
        },

        async deleteEdges(){
            var params={
                chart_id:0,
                edge_name:"0"
            }
            await DeleteEdgeAPI({chart_id:params.chart_id,edge_name:params.edge_name})
            .then((res) => {
              console.log("result",res)
            })
            .catch((err) => console.log(err));
        },

        async findEdge(){
            var params={
                chart_id:0,
                edge_name:"0"
            }
            console.log("par",params)
            await FindEdgeAPI({chart_id:params.chart_id,edge_name:params.edge_name})
            .then((res)=>{
                console.log("result",res)
            })
            .catch((err)=>console.log(err))
        }

    }
}
export default edge