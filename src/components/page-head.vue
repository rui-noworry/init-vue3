<template>
    <div class="page-head" :class="{'border': isBorder}">
        <div class="head-left">
            <div class="back-box display-flex" v-if="isBack" @click="$emit('back')">
                <svg-icon iconClass="icon-arrow"></svg-icon>返回
            </div>
            <div class="head-title">
                <slot></slot>
            </div>
            <div class="head-tips">
                <slot name="tips"></slot>
            </div>
        </div>
        <div class="head-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
    import svgIcon from '@/components/svg.vue'
    export default {
        components: {svgIcon},
        emits: ['back'],
        props: {
            isBack: { // 是否显示“返回”
                type: Boolean,
                default: false
            },
            isBorder: { // 是否有下边线
                type: Boolean,
                default: false
            }
        }
    }
</script>
<style lang="scss">
.page-head{
    display: flex;
    padding:12px 8px;
    align-items: center;
    justify-content: space-between;
    .head-left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .back-box{
        color:$backfont;
        padding-left: 16px;
        padding-right:20px;
        border-right:1px $borderColor solid;
        font-size:14px;
        cursor: pointer;
        .svg{
            position: relative;
            top:2px;
            color:$backfont;
            width:16px;
            height:16px;
            margin-right: 5px;
        }
    }
    .head-title{
        color: $fontColor;
        font-weight:bold;
        font-size:16px;
        margin-left:20px;
        margin-right:12px;
        height:32px;
        line-height: 32px;
        display: flex;
        .svg{
            margin-right:8px;
            .svg-icon{
                width:22px;
                height:22px;
            }
        }
    }
    .head-tips{
        color: $fontColor2;
    }
    &.border{
        border-bottom: 1px $borderColor solid
    }

}

</style>