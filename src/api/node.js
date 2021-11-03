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
