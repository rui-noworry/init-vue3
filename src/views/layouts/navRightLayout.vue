<template>
    <div class="layout-div nav-right">
        <div class="layout-menu">
            <div class="logo-title">{{ logoTitle }} <Svg iconClass="icon-ddosIp"></Svg></div>
            <Sidebar></Sidebar>
        </div>
        <div class="layout-crumbs crumbs">
            <div v-for="m in crumbsList" :key="m">{{ $t(m) }}</div>
        </div>
        <div class="layout-con">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import Svg from '@/components/svg.vue'
    import Sidebar from './sidebar.vue'
    import {useI18n} from 'vue-i18n'

    const route = useRoute()
    const router = useRouter()
    const {t} = useI18n()

    let crumbsList = ref(route.meta.crumbs)
    watch(()=>route.meta.crumbs, ()=>{
        crumbsList.value = route.meta.crumbs
    })

    // 获取当前路由的所有配置信息
    // 注意配置路由的时候 子路由meta中的subMenuName一定要与父路由的name一致
    let allRoute = router.getRoutes()
    let logoTitle = ref('')
    let currentRoute = allRoute.find(item => item.name === route.meta.subMenuName)
    logoTitle.value = t(currentRoute.name)

</script>
