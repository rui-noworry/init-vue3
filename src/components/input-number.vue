<template>
    <div class="input-number-box">
        <div class="el-input-number">
            <el-button :disabled="props.disabled" class="el-input-number__decrease" :class="{'is-disabled': props.disabled || minDisabled}" @click="decrease" >
                <Minus style="width:0.8em;"></Minus>
            </el-button>
            <el-button :disabled="props.disabled" class="el-input-number__increase" :class="{'is-disabled': props.disabled || maxDisabled}" @click="increase">
                <Plus style="width:1em;"></Plus>
            </el-button>
            <el-input :disabled="props.disabled" v-model="num" @change="changeNum"></el-input>
        </div>
        {{unit}}
    </div>
</template>

<script setup>
    import {ref, computed, watch, nextTick, toRef} from 'vue'
    import {Minus, Plus} from '@element-plus/icons-vue'
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
        },
        unit: {
            type: String,
            default: ''
        }
    })

    const emits = defineEmits(['update:modelValue', 'change'])

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

    // 步长规则的中间交界点
    const point_list = tran_step_rule.value.filter((o, i) => { return i !== tran_step_rule.value.length -1 }).map(e => { return e.end })

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
    const changeNum = (v) => {
        nextTick( () =>{
            emits('update:modelValue', v)
            emits('change', v)
        })
    }
    const increase = () => { // 点击'+'
        let oldv = num.value
        let v = Number(oldv) + Number(step.value)
        if (point_list.indexOf(oldv) > -1) {
            let nowRule = getNowRule(v)
            step.value = nowRule.step
            let newValue = nowRule.start + nowRule.step
            changeNum(newValue)
        } else {
            culNum(v)
        }
    }
    const decrease = () => { // 点击'-'
        let oldv = num.value
        let v = Number(oldv) - Number(step.value)
        if (point_list.indexOf(oldv) > -1) {
            let nowRule = getNowRule(oldv-1)
            step.value = nowRule.step
            let newValue = nowRule.end - nowRule.step
            changeNum(newValue)
        } else {
            culNum(v)
        }
    }
    const culNum = (v) => {
        let newValue = v === undefined ? v : Number(v)
        if (isNaN(newValue)) {
          newValue = props.min
        }
        if (newValue <= props.min) newValue = props.min
        if (newValue >= props.max) newValue = props.max
        let nowRule = getNowRule(newValue)
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
        let nRule = getNowRule(num.value)
        step.value = !nRule ? 5 : nRule.step
    }

    watch(numVal, (v)=>{
        num.value = v
        let nRule = getNowRule(num.value)
        step.value = !nRule ? 5 : nRule.step
    })

    // watch(num, (v)=>{
    //     culNum(v)
    // })

    let minDisabled = computed(()=>{
        return num.value <= props.min
    })
    let maxDisabled = computed(()=>{
        return Number(num.value) + Number(step.value) > props.max
    })

</script>

