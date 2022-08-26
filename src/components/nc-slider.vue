<template>
    <div class="display-flex p-l-20 align-center m-t-2">
        <el-slider
            class="flex-item"
            v-model="value"
            :marks="marks"
            :min="min"
            :max="max"
            :step="step"
            :show-tooltip="showToolTip"
            :show-stops="false"
            @change="valChange"
            :show-input-controls="showInputControls"
            :show-input="showInput" />
        <el-input v-if="showCustomInput" :disabled="showCustomInput" class="disable-input w-50 m-l-10" v-model="newValue"></el-input>
        <div class="f-16 m-l-5">{{unit}}</div>
    </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue'
    let props = defineProps({
        unit: {
            type: String,
            default: ''
        },
        step: {
            type: Number,
            default: 1
        },
        modelValue: {
            type: Number,
            default: 0
        },
        min: Number,
        max: Number,
        showCustomInput: { // 是否显示自定义的文本框
            type: Boolean,
            default: false
        },
        showToolTip: { // 显示悬浮提示
            type: Boolean,
            default: false
        },
        showStops: { // 显示步长断点
            type: Boolean,
            default: false
        },
        marks: { // 是否显示
            type: Object,
            default() {
                return {
                    0: '0',
                    1000: '1000'
                }
            }
        },
        showInput: { // 是否显示右侧文本框
            type: Boolean,
            default: true
        },
        showInputControls: { // 是否显示文本框的控制按钮
            type: Boolean,
            default: true
        },
        stepRules: {
            type: Array,
            default() {
                return []
            }
        }
    })

    const emits = defineEmits(['update:modelValue'])
    const valChange = (val) => {
        emitHandler(value.value)
        if (props.stepRules.length < 1) return
        let stepRules = props.stepRules
        stepRules.forEach(item => {
            if (val > item.min && val <= item.max) {
                newValue.value = getNewValueByRule(item.min) + ((val - item.min) * item.step)
                emitHandler(newValue.value)
            }
        })
    }

    const emitHandler = (val) => {
        emits('update:modelValue', val)
        emits('change', val)
    }

    let getNewValueByRule = (val) => {
        let data = props.stepRules.find(item => val > item.min && val <= item.max)
        if (data) {
            let num = data.min + (val - data.min) * data.step
            return num
        } else {
            return 0
        }
    }
    let value = ref(props.modelValue)
    let newValue = ref(props.min)
</script>
