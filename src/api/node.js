import { axios } from '../utils/request'
const api = {
    nodePre: 'api/node'
}

export function addNodeAPI(data) {
    console.log(data)
    return axios({
        url: `${api.nodePre}/add`,
        method: 'POST',
        data,
    })
}

export function updateNodeAPI(data) {
    console.log(data)
    return axios({
        url: `${api.nodePre}/update`,
        method: 'POST',
        data,
    })
}

export function deleteNodeAPI(data) {
    console.log(data)
    return axios({
        url: `${api.nodePre}/delete/${data.chartId}/${data.nodeName}`,
        method: 'GET',
    })
}

export function getNodeAPI(data) {
    console.log(data)
    return axios({
        url: `${api.nodePre}/get/${data.chartId}/${data.nodeName}`,
        method: 'GET',
    })
}
