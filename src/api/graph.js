import http from "../utils/http";

const request='http://localhost:8081/api/chart'

export function GetGraphAPI(params){
    return http.get(`${request}/getChart/${params.id}`)
}

export function GetPythonGraphAPI(input){
    return http.get(`http://backend-server:5000/pyapi/chart/search/${input}`)
}

export function PythonScratchAPI(question_id){
    return http.get(`http://backend-server:5000/pyapi/chart/scratch/${question_id}`)
}

export function PythonContentAPI(id){
    return http.get(`http://backend-server:5000/pyapi/chart/content/${id}`)
}

export function PythonQuestionContentAPI(id){
    return http.get(`http://backend-server:5000/pyapi/chart/qcontent/${id}`)
}

export function PythonTagFaqAPI(tagname) {
    return http.get(`http://backend-server:5000/pyapi/chart/faq/${tagname}`)
}
