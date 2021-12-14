import http from "../utils/http";

const request='http://localhost:8081/api/chart'

export function GetGraphAPI(params){
    return http.get(`${request}/getChart/${params.id}`)
}

export function GetPythonGraphAPI(input){
    return http.get(`http://localhost:5000/pyapi/chart/search/${input}`)
}
