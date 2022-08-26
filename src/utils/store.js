import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

const store = new vuex.Store({
    state: {
        token: null,
        lang: null
    },
    mutations: {
        TOKEN: (state, data) => {
            state.token = data
        },
        LANG: (state, data) => {
            state.lang = data
        }
    },
    getters: {
        token: state => state.token,
        lang: state => state.lang
    },
    actions: {
        GetToken: ({commit}, data) => {
            commit('TOKEN', data)
        },
        GetLang: ({commit}, data) => {
            commit('LANG', data)
        }
    }
})
export default store
