import http from "../utils/http";

const request='/api/edge'

export function AddEdgeAPI(params){
    return http.post(`${request}/add`,params)
}
export function UpdateEdgeAPI(params){
    return http.post(`${request}/update`,params)
}
export function DeleteEdgeAPI(params){
    return http.get(`${request}/delete/${params.chart_id}/${params.edge_name}`)
}
export function FindEdgeAPI(params){
    return http.get(`${request}/get/${params.chart_id}/${params.edge_name}`)
}