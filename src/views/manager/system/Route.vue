<script lang="tsx">
import { defineComponent, ref, VNode } from 'vue'
import { DataTableBaseColumn } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'
import { useColumn } from '@/hooks/hook-column'
import { useSource } from '@/hooks/hook-source'
import { useRxicon } from '@/hooks/hook-icon'
import { useLocale } from '@/hooks/hook-locale'
import { httpColumn, IRoute } from '@/api/fetch-route'
import { fetchRouter } from '@/views/manager/hooks/fetch-router'

export default defineComponent({
    name: 'MRouter',
    setup() {
        const elRef = ref()
        const { t, at } = useLocale()
        const { vars } = useProvider()
        const { FCompute } = useRxicon()
        const { divineColumn, divineRxicon, divineCmule, divineCommand } = useColumn()
        const { state, setState, fetchUpdate } = useSource<IRoute, Record<string, unknown>>({
            props: {
                density: 'small'
            },
            dataColumn: [
                { title: at('route.title.value'), key: 'title', minWidth: 200 },
                { title: at('route.icon.value'), key: 'icon', width: 120 },
                { title: at('route.type.value'), key: 'type', width: 120 },
                { title: at('route.path.value'), key: 'path', minWidth: 200, ellipsis: { tooltip: true } },
                { title: at('common.createTime.value'), key: 'updateTime', align: 'center', width: 180 },
                { title: at('common.operate.value'), key: 'command', fixed: 'right', align: 'center', width: 160 }
            ],
            immediate: true,
            init: e => httpColumn()
        })

        const basicRender: Record<string, (value: unknown, row: IRoute, base: DataTableBaseColumn) => VNode> = {
            icon: (value, row) => {
                return divineColumn(value, divineRxicon(row.icon, { depth: 1 }, { cursor: 'pointer' }))
            },
            type: (value, row) => {
                const _u_ = {
                    directory: divineCmule('菜单', { type: 'success', bordered: false }, { class: 'n-customize' }),
                    menu: divineCmule('目录', { type: 'info', bordered: false }, { class: 'n-customize' })
                }
                return _u_[value as keyof typeof _u_]
            },
            command: (value, row) => {
                return divineCommand(row, { native: ['edit'] })
            }
        }

        /**创建菜单**/
        const createOneRouter = async () => {
            const { observer } = await fetchRouter({
                title: t('common.create.value'),
                command: 'CREATE'
            })

            observer.once('submit', () => {
                fetchUpdate()
            })
        }

        return () => (
            <u-container ref={elRef} space="16px" style={{ margin: '0 10px 10px', backgroundColor: vars.value.cardColor }}>
                <basic-table
                    density={state.density}
                    data-column={state.dataColumn}
                    data-source={state.dataSource}
                    loading={state.loading}
                    basic-render={basicRender}
                    set-state={setState}
                    onReload={fetchUpdate}
                >
                    {{
                        start: () => (
                            <n-button type="primary" class="n-start" onClick={createOneRouter}>
                                {{ default: at('common.create.value'), icon: FCompute('PlusOutlined') }}
                            </n-button>
                        )
                    }}
                </basic-table>
            </u-container>
        )
    }
})
</script>

<style lang="scss" scoped></style>
