<template>
    <div class="form-card" :class="{border: isBorder}">
        <div class="form-card-label">
            <template v-if="label !== ''">
                {{label}}
            </template>
            <template v-else>
                <slot name="label"></slot>
            </template>
        </div>
        <div class="form-card-content" :class="{'font': font}">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            label: { // 标题
                type: String,
                default: ''
            },
            font: { // 是否显示文字
                type: Boolean,
                default: false
            },
            isBorder: { // 是否显示下面的线
                type: Boolean,
                default: false
            }
        }
    }
</script>
<style lang="scss">
    .form-card{
        display: grid;
        width:100%;
        padding: 20px 8px;
        grid-template-columns: 120px auto;
        grid-template-rows: auto;
        grid-auto-flow: column;
        /*justify-content: flex-start;*/
        & > .form-card-label {
            font-weight: bold;
            line-height: 32px;
            .help-tips{
                font-size:12px;
            }
        }
        & > .form-card-content{
            overflow: hidden;
            align-self: center;
            &.font{
                padding: 8px 0;
                line-height: 20px;
            }
        }
        &.border{
            border-bottom: 1px $borderColor solid;
        }
        .form-card{
            padding: 8px 0;
            grid-template-columns: 100px auto;
            & > .form-card-label {
                font-weight: 400;
                line-height: 32px;
                color: $labelColor;
            }
            & > .form-card-content{
                flex:1;
            }
            &.border{
                border:0;
            }
        }
    }
</style>