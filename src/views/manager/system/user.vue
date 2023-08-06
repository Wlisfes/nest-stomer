<script lang="tsx">
import { defineComponent } from 'vue'
import { httpColumnUser, type IUser } from '@/api/http-user'
import { useCurrent } from '@/locale/instance'
import { useSource } from '@/hooks/hook-source'
import { useResize } from '@/hooks/hook-resize'
import { compute } from '@/utils/utils-remix'

export default defineComponent({
    name: 'User',
    setup() {
        const { cols } = useResize({ cols: { 1480: 1, 2160: 2, 4320: 3 } })
        const { t } = useCurrent()
        const { state, fetchUpdate } = useSource<IUser, Object>(
            {
                immediate: true,
                form: {
                    nickname: undefined
                },
                size: 15
            },
            e => httpColumnUser({ page: e.page, size: e.size })
        )

        return () => (
            <common-container>
                <common-request>
                    <n-grid cols={5}>
                        <n-form-item-gi label="数量">
                            <n-input-number v-model:value={state} />
                        </n-form-item-gi>
                    </n-grid>
                </common-request>
                <n-form show-label={false} show-feedback={false} size="large" style={{ padding: '16px' }}>
                    <n-space>
                        <n-form-item>
                            <n-input />
                        </n-form-item>
                        <n-form-item>
                            <n-input />
                        </n-form-item>
                        <n-form-item>
                            <n-input />
                        </n-form-item>
                        <n-form-item>
                            <n-button
                                type="primary"
                                v-slots={{ icon: () => <n-icon component={compute('SearchBlod')} />, default: () => <span>查找</span> }}
                            >
                                新增用户
                            </n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button
                                secondary
                                type="success"
                                v-slots={{ icon: () => <n-icon component={compute('RadixSpinWith')} /> }}
                            ></n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button
                                secondary
                                type="info"
                                v-slots={{
                                    icon: () => <n-icon component={compute('SearchBlod')} />,
                                    default: () => <span>查找</span>
                                }}
                            ></n-button>
                        </n-form-item>
                    </n-space>
                </n-form>
                <common-source
                    came-style={{ padding: '0 16px 48px' }}
                    loading={state.loading}
                    page={state.page}
                    size={state.size}
                    page-sizes={[15, 30, 45, 60]}
                    total={state.total}
                    data-source={state.dataSource}
                    cols={cols.value}
                    data-render={(data: IUser) => <compose-user key={data.id} node={data}></compose-user>}
                    onUpdate={fetchUpdate}
                ></common-source>
            </common-container>
        )
    }
})
</script>
