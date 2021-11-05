import http from "../utils/http";

const request='./api/chart'

export function GetGraphAPI(params){
    return http.get(`${request}/getChart/${params.id}`)
}