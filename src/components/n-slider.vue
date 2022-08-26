<template>
    <div class="p-left10 n-slider">
        <div class="slider-box">
            <el-slider
                :min="min"
                :max="max"
                :step="step"
                v-model="num"
                :show-tooltip="false"
                :show-input="false"
                :marks="marks"
                @change="culNum"
                :disabled="props.disabled"
                @click="clickFn"
                >
            </el-slider>
        </div>
        <input-number
                :min="min"
                :max="max"
                :step="step"
                :step_rule="step_rule"
                v-model="num"
                @change="culNum"
                unit="Mbps"
                :disabled="props.disabled"></input-number>
    </div>
</template>

<script setup>
    import {ref, computed, watch, nextTick, toRef} from 'vue'
    import inputNumber from './input-number.vue'
    const props = defineProps({
        step_rule: {
            type: Array,
            default(){
                return []
            }
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        },
        spec: {
            type: Array,
            default () {
                return []
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: Number,
            default: 0
        }
    })

    const emits = defineEmits(['update:modelValue', 'change'])

    const marks = computed(()=> {
        let a = {}
        a[props.min]=String(props.min)
        a[props.max]=String(props.max)
        return a
    })

    const tran_step_rule = ref([])
    if (props.step_rule) {
        tran_step_rule.value = props.step_rule.map(e => {
            const end = e.max || e.end
            return {
                start: Number(e.min) || Number(e.start),
                end: end === 'MAX' ? props.max : Number(end),
                step: Number(e.value) || Number(e.step)
            }
        })
    }
    watch(()=>props.step_rule, ()=>{
        tran_step_rule.value = props.step_rule.map(e => {
            const end = e.max || e.end
            return {
                start: Number(e.min) || Number(e.start),
                end: end === 'MAX' ? props.max : Number(end),
                step: Number(e.value) || Number(e.step)
            }
        })
    })

    // // 步长规则的中间交界点
    // const point_list = tran_step_rule.filter((o, i) => { return i !== tran_step_rule.length -1 }).map(e => { return e.end })

    const getNowRule = (v) => {
        if (tran_step_rule.value.length === 0) return
        if (v <= tran_step_rule.value[0].start) {
            return {start: 0, step: tran_step_rule.value[0].step, end: tran_step_rule.value[0].start}
        } else if (v >= tran_step_rule.value[tran_step_rule.value.length - 1].end) {
            let o = tran_step_rule.value[tran_step_rule.value.length - 1]
            return {start: o.end, step: o.step, end: o.end + o.step}
        } else {
            for(let i=0; i < tran_step_rule.value.length; i++) {
                let o = tran_step_rule.value[i]
                if (o.start <= v && o.end > v) {
                    return o
                }
            }
        }
    }
    const oldNum = ref(0)
    const changeNum = (v) => {
        nextTick( () =>{
            num.value = v
            oldNum.value = v
            emits('update:modelValue', v)
            emits('change', v)
        })
    }
    const culNum = (v) => {
        let newValue = v === undefined ? v : Number(v)
        if (isNaN(newValue)) {
          newValue = props.min
        }
        if (newValue <= props.min) newValue = props.min
        if (newValue >= props.max) newValue = props.max
        let nowRule = getNowRule(newValue)
        if (!nowRule) {
            return
        }
        step.value = nowRule.step
        if (props.spec.indexOf(newValue) === -1) {
            newValue = nowRule.start + Math.round((newValue - nowRule.start) / nowRule.step) * nowRule.step
        }
        changeNum(newValue)
    }

    let numVal = toRef(props, 'modelValue')
    let num = ref(0)
    let step = ref(5)
    if (numVal.value) {
        num.value = numVal.value
        oldNum.value = numVal.value
        let nRule = getNowRule(num.value)
        step.value = !nRule ? 5 : nRule.step
    }
    watch(numVal, (v)=>{
        num.value = v
        oldNum.value = v
        let nRule = getNowRule(num.value)
        step.value = !nRule ? 5 : nRule.step
    })

    const clickFn = () => {
        if (oldNum.value === num.value) return
        culNum(num.value)
    }



</script>

<style lang="scss">
    .n-slider{
        position: relative;
        padding-left:10px;
        .slider-box{
            margin-right:210px;
        }
        .input-number-box{
            position: absolute;
            right:0;
            top:0;
            padding:3px;
        }
        .el-slider__marks-text{
            word-break: keep-all;
        }
        .el-input-number .el-input__inner{
            padding:0;
        }

    }
</style>
