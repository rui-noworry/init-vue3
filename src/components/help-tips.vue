<template>
  <n-tooltip :placement="placement" :trigger="trigger" >
    <svg-icon class="help" iconClass="icon-info"></svg-icon>
    <template #content>
      <div :style="'width:'+width+'px;'">
        <slot></slot>
      </div>
    </template>
  </n-tooltip>
</template>
<style lang="scss">
.help{
  .svg-icon{
    color: $mainColor;
  }
}
</style>
<script>
// 帮助提示
import SvgIcon from '@/components/svg.vue'
import nTooltip from "@/components/n-tooltip.vue";
export default {
  components: { SvgIcon, nTooltip },
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    width: {
      type: Number,
      default: 150
    },
    trigger: {
      type: String,
      default: 'hover'
    }
  }
}
</script>
