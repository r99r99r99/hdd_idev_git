<template>
    <div>
        <div>
            <el-cascader :value="searchVal"
                         :placeholder="placeholder?this.$(placeholder):this.$t('请选择')"
                         :options="options" filterable
                         :props="{expandTrigger: 'hover', checkStrictly: true, value : 'id', label: 'text'}"
                         :disabled="disabled" ref="sel" @change="doSel">
                <template slot-scope="{ node, data }">
                    <span>{{ data.text }}</span>
                    <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                </template>
            </el-cascader>
        </div>
    </div>
</template>
<script>

    /**
     * 自定义列表下拉
     * @module orgnselect
     */
    export default {
        name: 'orgnselect',
        data() {
            return {
                options: []
            }
        },
        inheritAttrs: false,
        /**
         * Props  继承hd-com-grid的属性和事件
         * @prop {String} txtVal 双向绑定 这里是为了clear清空用
         * @prop {String} idVal 双向绑定 这里是为了clear清空用
         * @prop {String} placeholder
         * @prop {String} disabled 只读
         * @prop {Object} hdQuery  查询封装类
         * @prop {String} height  默认为40vh
         * @prop {Function} beforeQuery  查询前的事件,通常需要绑定anyQuery
         */
        props: {
            txtVal: String,
            idVal: String,
            placeholder: String,
            disabled: Boolean,
            hdQuery: Object,
            url: String, // 全路径
            height: {// 高度
                type: String,
                default: '40vh'
            },
            beforeQuery: Function
        }, // 设置value为props属性-必须
        mounted() {
            this.doQuery()
        },

        methods: {
            doQuery() {
                this.$http.post('/webresources/login/privilege/AuthOrgn/gentree', this.hdQuery).then(response => {
                    this.options = response.data;
                    this.initOption(this.options);
                })
            },
            doClear() {
                this.$emit('update:txtVal', '')
                this.$emit('update:idVal', '')
                this.$emit('clear')
            },
            doSel(val) {
                if (!this.$refs.sel.getCheckedNodes() || this.$refs.sel.getCheckedNodes().length < 1) {
                    this.$emit('update:txtVal', '')
                    this.$emit('update:idVal', '')
                    this.$refs.sel.toggleDropDownVisible(false)
                    return;
                }
                const data = this.$refs.sel.getCheckedNodes()[0].data;
                this.$emit('update:txtVal', data.text)
                this.$emit('update:idVal', data.id)
                this.$emit('change', val)
                this.$refs.sel.toggleDropDownVisible(false)
            },
            getSearchIdList(list, id) {
                let rtn = [];
                list.forEach(v => {
                    if(v.id == id) {
                        rtn = [v.id];
                        return;
                    } else {
                        let idList = this.getSearchIdList(v.children == null ? [] : v.children, id);
                        if(idList.length > 0) {
                            rtn =  [v.id, ...idList];
                        }
                    }
                })
                return rtn;
            },
            initOption(list) {
                list.forEach(v => {
                    if(!v.children || v.children.length === 0) {
                        v.children = null;
                    } else {
                        this.initOption(v.children);
                    }
                })
            },
        },
        computed: {
            searchVal() {
                let searchVal = this.getSearchIdList(this.options, this.idVal);
                console.log('searchVal', this.options, searchVal, this.idVal);
                return this.getSearchIdList(this.options, this.idVal);
            }
        }
    }

</script>
<style scoped>
    .lucencyInput .el-input__inner {
        border: 0px;
    }
    .el-cascader {
        width: 100%
    }
</style>
