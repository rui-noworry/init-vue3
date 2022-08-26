<template>
	<div class="menu-sidebar">
		<el-menu :default-active="currentView" router>
			<template v-for="(m, i) in menuList">
				<el-menu-item v-if="!m.hidden" :index="m.path" :key="i">
                    <template #title>
                        <span>{{ $t(m.name) }}</span>
                    </template>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    const router = useRouter()
    const route = useRoute()

    // 获取当前路由的子路
    let allRoute = router.getRoutes()
    const menuList = ref([])
    let currentRoute = allRoute.find(item => item.name === route.meta.subMenuName)
    menuList.value = currentRoute.children
    const currentView = computed(()=> {
        return route.meta.path
    })
</script>
