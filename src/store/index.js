import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import graph from './modules/graph'
import edge from './modules/edge'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        graph,
        edge
    },
    state: {
    },
    mutations: {
    },
    actions: {
    },
    getters
})