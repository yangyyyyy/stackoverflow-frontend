import http from "../utils/http";

const request='./api/chart'

export function getGraphAPI(params){
    return http.get(`${request}/getChart/${params.id}`)
}