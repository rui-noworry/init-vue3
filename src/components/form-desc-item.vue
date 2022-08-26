<template>
    <div class="form-desc-item" :class="{'desc-min': size === 'min', 'desc-big': size === 'big'}">
        <div class="form-desc-label" v-if="!noLabel" :style="{'width': width, 'text-align': labelAlign}">
            <template v-if="label !== ''">
                {{label}}
            </template>
            <template v-else>
                <slot name="label"></slot>
            </template>
        </div>
        <div class="form-desc-content" :class="{font: isFont}" :style="{'text-align': conAlign}">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
    import {ref, watch, defineProps} from 'vue'
    const props = defineProps({
        label: { // 标题
            type: String,
            default: ''
        },
        width: { // 标题宽度
            type: String,
            default: '30%'
        },
        align: { // 显示方式，left居左，right居右，center居中，between两边对齐
            type: String,
            default: 'left'
        },
        noLabel: { // 不显示标题
            type: Boolean,
            default: false
        },
        isFont: { // 是否用于显示文字
            type: Boolean,
            default: true
        },
        size: { // form-desc-item间的距离，min距离小, big距离大
            type: String,
            default: 'normal'
        }
    })
    const labelAlign = ref('')
    const conAlign = ref('')
    watch(()=>props.align, (v) =>{
        if (v === 'left') {
            labelAlign.value = 'left'
            conAlign.value = 'left'
        } else if ( v === 'right') {
            labelAlign.value = 'right'
            conAlign.value = 'right'
        } else if (v === 'center') {
            labelAlign.value = 'center'
            conAlign.value = 'center'
        } else if (v === 'between') {
            labelAlign.value = 'left'
            conAlign.value = 'right'
        }
    }, {
        immediate: true
    })

</script>
<style lang="scss">
    .form-desc-item{
        display: flex;
        width:100%;
        padding: 2px 0;
        align-items: flex-start;
        & > .form-desc-label {
            height:32px;
            line-height: 32px;
            color: $labelColor;
        }
        & > .form-desc-content{
            flex:1;
            .el-button.is-text{
                height:auto;
                padding:0 6px;
            }
        }
        & > .font{
            padding:6px 0;
            line-height: 20px;
        }
    }
    .desc-min{
        & > .form-desc-label {
            height:24px;
            line-height: 24px;
        }
        & > .font{
            padding:2px 0;
            line-height: 20px;
        }
    }
    .desc-big{
        & > .form-desc-label {
            height:36px;
            line-height: 36px;
        }
        & > .font{
            padding:8px 0;
            line-height: 20px;
        }
    }
</style>