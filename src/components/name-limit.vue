<template>
    <el-input type="text" v-model.trim="inputVal" :class="props.class" @change="fnLimit"></el-input>
</template>
<script setup>
    import {ref, watch, defineProps, defineEmits} from 'vue'
    import {ElMessage} from 'element-plus'
    import {useI18n} from 'vue-i18n'

    const props = defineProps({
        modelValue: String,
        class: String,
        name: String, // 提示中的名称
        min: { // 限制中的最小长度
            type: Number,
            default: 0
        },
        max: { // 限制中的最大长度
            type: Number,
            default: 0
        }
    })
    const emits = defineEmits(['update:modelValue'])
    const {t} = useI18n()

    const inputVal = ref(props.modelValue)
    watch(inputVal, (v) => {
        emits('update:modelValue', v)
    })

    const fnLimit = (v)=>{
        let n = 0
        let len = null
        const patrn = /[^x00-xff]/   // 汉字正则
        const maxLength = props.max
        for(let i=0; i<v.length; i++) {
            let temp = v[i]
            if (patrn.exec(temp) == null) {    // 不是汉字
                n = n + 1
            } else {    // 是汉字
                n = n + 2
            }
            if (len === null && n == maxLength) {
                len = i+1
            }
            if (len === null && n > maxLength) {
                len = i
            }
        }
        if (props.min !== 0 && n < props.min) {
            ElMessage({type: 'error', message: t('NAME_LIMIT2', {'name': name, 'count': props.min, 'count_h': props.min/2})})
        }
        if (maxLength !== 0 && n > maxLength) {
            inputVal.value = v.substr(0, len)
            ElMessage({type: 'error', message: t('NAME_LIMIT', {'name': name, 'count': maxLength, 'count_h': maxLength/2})})
        }
    }







</script>