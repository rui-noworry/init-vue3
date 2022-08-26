import { createStore } from 'vuex'
import store from './store.js'
import {service} from '@/service/service.js'

export default createStore({
    state: {
        token: store.get('cds_token'),
        lang: 'CN',
        // theme: store.get('gic_web_theme')
        menu: null,
    },
    mutations: {
        TOKEN: (state, data) => {
            state.token = data
            store.set('cds_token', data)
        },
        LANG: (state, data) => {
            state.lang = data
            const nLang = data === 'CN' ? 'zh_cn' : 'en'
            store.set('django_language', nLang)
        },
        SET_MENU: (state, data) => {
          state.menu = data
        },
        // SET_THEME: (state, data) => {
        //     state.theme = data
        //     store.set('gic_web_theme', data)
        // }
    },
    getters: {
        token: state => state.token,
        lang: state => state.lang,
        // theme: state => state.theme
    },
    actions: {
        GetToken: ({commit}, data) => {
            commit('TOKEN', data)
        },
        GetLang: ({commit}, data) => {
            commit('LANG', data)
        },
        GET_MENU: async({commit}) => {
          const {data, code} = await service.getMenu()
          if (code === 200) {
            commit('SET_MENU', data)
          }
        }
    }
})
