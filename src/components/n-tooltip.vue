<template>
    <el-tooltip
            :placement="placement"
            effect="customized"
            :width="width"
            :content="content"
            popper-class="n-tooltip"
    >
        <template #content>
            <slot name="content"></slot>
        </template>
        <slot></slot>
    </el-tooltip>
</template>

<script setup>
    // 文字提示框
    const props = defineProps({
        placement: String,
        width: {
            type: Number,
            default: 200
        },
        content: {
            type: String,
            default: ''
        }
    })
</script>
