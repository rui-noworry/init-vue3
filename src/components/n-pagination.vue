<template>
    <el-pagination :class="class" @current-change="currentChangeFn"
              :current-page="page" :page-sizes="pageSizes" :page-size="pageSize" :small="true"
              layout="total, slot, prev, pager, next, jumper" :total="total">
        <div class="display-flex align-center">
            <span class="p-l-8 p-r-8">每页</span>
            <el-select v-model="size" @change="sizeChangeFn">
                <el-option v-for="(page, i) in pageSizes" :key="i" :value="page" :label="page">{{page}}</el-option>
            </el-select>
            <span class="p-l-8 p-r-18">条</span>
        </div>

    </el-pagination>
</template>
<script setup>
    import {computed} from 'vue'

    const props = defineProps({
        class: String,
        page: String,
        pageSize: Number,
        pageSizes: Array,
        total: Number,
    })
    const emits = defineEmits(['update:pageSize', 'size-change', 'current-change'])

    const size = computed({
        get(){
            return props.pageSize
        },
        set(v){
            emits('update:pageSize', v)
        }
    })

    const sizeChangeFn = (v) => {
        console.log('&&&&&&&&&&&', v)
        emits('size-change', v)
    }

    const currentChangeFn = (v) => {
        emits('current-change', v)
    }

</script>