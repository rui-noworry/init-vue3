<template>
    <el-dialog title="提示" v-model="visible" :before-close="closeDialog">
        <div>
            <el-radio-group v-model="accountType">
                <el-radio label="formal_account">正式购买</el-radio>
                <el-radio label="test_account" style="padding:5px 0">
                    测试
                    <el-select v-model="selTestAccount" value-key="id" style="width:305px;margin-left:20px;">
                        <el-option v-for="m in data" :key="m.id" :value="m" :label="m.name"></el-option>
                    </el-select>
                </el-radio>
            </el-radio-group>
        </div>
        <table v-if="selTestAccount">
            <thead>
            <tr>
                <th>测试项目</th>
                <th>测试总金额</th>
                <th>测试天数</th>
                <th>测试开始日</th>
                <th>测试截止日</th>
                <th>剩余金额</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td v-text="selTestAccount.name"></td>
                <td v-text="selTestAccount.income"></td>
                <td v-text="selTestAccount.duration"></td>
                <td v-text="selTestAccount.begin_time"></td>
                <td v-text="selTestAccount.end_time"></td>
                <td v-text="selTestAccount.balance"></td>
            </tr>
            </tbody>
        </table>
        <template #footer>
            <el-button type="primary" @click="FnConfimBuy">确定</el-button>
            <el-button type="primary" @click="closeDialog">取消</el-button>
        </template>
    </el-dialog>
</template>
<style>
</style>
<script>
export default {
    props: {
        data: {
            type: Array,
            default() {
                return []
            }
        },
        param: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            selTestAccountId: null, // 购买账号的id
            accountType: 'formal_account',
            selTestAccount: null
        }
    },
    mounted() {
    },
    computed: {
        visible: {
            set: function () {
            },
            get: function () {
                return this.param.visible
            }
        }
    },
    watch: {
        visible(newVal, oldVal) {
            if (newVal === oldVal) {
                return
            }
            if (newVal) {
                this.selTestAccount = this.data[0]
            }
        }
    },
    methods: {
        closeDialog() {
            this.accountType = 'formal_account'
            this.visible = false
            this.$emit('close')
        },
        FnConfimBuy() {
            var accountId = ''
            if (this.accountType === 'formal_account') {
                accountId = ''
            } else {
                accountId = this.selTestAccount.id
            }
            this.$emit('submitFn', accountId)
        }
    }
}
</script>
