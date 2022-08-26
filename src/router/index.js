import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const Index = () => import('@/views/pages/index.vue')

const routes = [
    {
        path: "/",
        name: 'OA',
        redirect: 'main',
        component: () => import("@/views/layouts/navRightLayout.vue"),
        children: [
            {
                path: "/main",
                name: "main",
                component: Index,
                meta: {
                    subMenuName: 'OA',
                    path: '/main',
                    crumbs: ["main"]
                }
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// router.beforeEach((to, from, next) => {
//     var token = GetToken()
//     if (token) {
//         // console.log('token', token)
//         token = decodeURIComponent(decodeURI(token))
//         store.commit('TOKEN', token)
//     }
//     next()
// })

function GetToken () {
    var strUrl = window.location.href
    var token = null
    var index = strUrl.indexOf('token=')
    if (index > 0) {
        token = strUrl.substr(index + 6).split('&')[0]
    }

    if (token && token.indexOf('#/') > 0) {
        token = token.substr(0, token.indexOf('#/'))
    }
    return token
}

export default router
