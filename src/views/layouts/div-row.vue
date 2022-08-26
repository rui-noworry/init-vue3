<template>
      <div class="div-layout-row" :style="{'padding-bottom': bottomHeight}">
        <div class="row-left">
          <slot></slot>
        </div>
        <div class="row-right" v-if="isRight">
          <slot name="right"></slot>
        </div>
        <div class="row-bottom">
          <div class="bottom-box">
            <slot name="bottom"></slot>
          </div>
        </div>
      </div>
</template>

<script>
  export default {
    props: {
      isRight: {
        type: Boolean,
        default: false
      },
      rightWidth: {
        type: String,
        default: '310px'
      },
      bottomHeight: {
        type: String,
        default: '80px'
      }
    }
  }

</script>

<style lang="scss">
    .div-layout-row{
        display: flex;
        flex-direction: row;
        height:100%;
        width:100%;
        position: relative;
        padding-bottom: 80px;

        .row-left{
          flex: 1;
        }
        .row-right{
          width:310px;
          border-left: 1px solid $borderColor;
        }
        .row-bottom{
          position: fixed;
          left:216px;
          right:0;
          bottom:0;
          background-color: $backgroundColor;
          box-shadow: 2px -2px 15px 0 $boxShadowBackground;
          z-index:100;
          .bottom-box{
            padding: 16px 32px;
          }
        }
        .form-card:last-of-type{
          border-bottom: 0!important;
        }

    }

</style>
