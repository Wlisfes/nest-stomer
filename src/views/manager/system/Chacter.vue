<script lang="tsx">
import { defineComponent, VNode, Fragment } from 'vue'
import { DataTableBaseColumn } from 'naive-ui'
import { useRxicon } from '@/hooks/hook-icon'
import { useSource } from '@/hooks/hook-source'
import { useLocale } from '@/hooks/hook-locale'
import { columnChacter, IChacter } from '@/api/fetch-chacter'

export default defineComponent({
    name: 'Chacter',
    setup() {
        const { t, at } = useLocale()
        const { Icon, compute } = useRxicon()
        const { state, setState, fetchUpdate } = useSource<IChacter, { density: string; command?: string }>({
            props: {
                density: 'small',
                command: undefined
            },
            dataColumn: [
                { title: at('chacter.command.value'), key: 'command', minWidth: 200 },
                { title: at('chacter.comment.value'), key: 'comment', minWidth: 200, ellipsis: { tooltip: true } },
                { title: at('chacter.cn.value'), key: 'cn', minWidth: 200, ellipsis: { tooltip: true } },
                { title: at('chacter.en.value'), key: 'en', minWidth: 200, ellipsis: { tooltip: true } },
                { title: at('common.createTime.value'), key: 'updateTime', align: 'center', width: 180 },
                { title: at('common.operate.value'), key: 'operate', fixed: 'right', align: 'center', width: 160 }
            ],
            immediate: true,
            init: e => {
                return columnChacter({ page: e.page, size: e.size, command: e.command })
            }
        })

        return () => (
            <u-container space="16px" style={{ margin: '0 10px 10px' }}>
                <basic-table
                    density={state.density}
                    data-column={state.dataColumn}
                    data-source={state.dataSource}
                    loading={state.loading}
                    set-state={setState}
                    onReload={fetchUpdate}
                    v-slots={{
                        start: () => (
                            <Fragment>
                                <n-form-item show-feedback={false} label-placement="left">
                                    <n-input>{{ prefix: () => <Icon component={compute('SearchOutlined')}></Icon> }}</n-input>
                                </n-form-item>
                                <n-button type="primary" class="n-start">
                                    {{
                                        default: () => t('chacter.basic.create')
                                    }}
                                </n-button>
                            </Fragment>
                        )
                    }}
                ></basic-table>
            </u-container>
        )
    }
})
</script>
