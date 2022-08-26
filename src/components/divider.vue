<template>
    <div :class="{'vertical-divider': isVertical, 'divider': !isVertical}"
         :style="{'margin-left': isVertical ? marginStyle : '0',
                  'margin-right': isVertical ? marginStyle : '0',
                  'margin-top': !isVertical ? marginStyle : '0',
                  'margin-bottom': !isVertical ? marginStyle : '0'}"
    ></div>
</template>
<script>
export default {
    name: 'divider',
    props: {
        marginStyle: { // 线与周围距离 margin
            type: String,
            default: '16px'
        },
        isVertical: {// isVertical 为 false 横向, isVertical 为 true 竖向
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="scss">
    .divider{
        height:1px;
        width:100%;
        border-top: 1px $borderColor2 solid;
    }
    .vertical-divider{
        width:1px;
        height:12px;
        border-right: 1px $borderColor2 solid;
    }
</style>