<script lang="tsx">
import { defineComponent } from 'vue'
import { httpColumnUser, type IUser } from '@/api/http-user'
import { useCurrent } from '@/locale/instance'
import { useSource } from '@/hooks/hook-source'
import { useResize, useElementResize } from '@/hooks/hook-resize'
import { compute } from '@/utils/utils-remix'

export default defineComponent({
    name: 'User',
    setup() {
        const { cols: colsCource } = useResize({ cols: { 1480: 1, 2160: 2, 4320: 3 } })
        const { cols: colsRequest } = useResize({ cols: { 1200: 28, 1201: 30 }, defaultCols: 30 })
        const { t } = useCurrent()
        const { state, fetchUpdate } = useSource(
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
                <common-request cols={colsRequest.value}>
                    <n-form-item-gi span="1:30 540:15 840:10 1100:7 1200:5 1600:5 1900:4">
                        <n-input v-model:value={state.form.nickname} placeholder="昵称" />
                    </n-form-item-gi>
                    <n-form-item-gi span="1:30 540:15 840:10 1100:7 1200:5 1600:5 1900:4">
                        <n-input v-model:value={state.form.nickname} placeholder="UID" />
                    </n-form-item-gi>
                    <n-form-item-gi span="1:30 540:15 840:10 1100:7 1200:5 1600:5 1900:4">
                        <n-input v-model:value={state.form.nickname} placeholder="手机号" />
                    </n-form-item-gi>
                    <n-form-item-gi span="1:30 540:15 840:10 1100:7 1200:5 1600:5 1900:4">
                        <n-input v-model:value={state.form.nickname} placeholder="电子邮件" />
                    </n-form-item-gi>
                    <n-form-item-gi span="1:30 540:15 840:10 1100:28 1200:10 1600:10 1900:14" style="background-color: #e6dbdb;">
                        <n-space size={14}>
                            <n-button
                                type="primary"
                                v-slots={{ icon: () => <n-icon component={compute('SearchBlod')} />, default: () => <span>查找</span> }}
                            >
                                新增用户
                            </n-button>
                            <n-button
                                secondary
                                type="success"
                                v-slots={{ icon: () => <n-icon component={compute('RadixSpinWith')} /> }}
                            ></n-button>
                            <n-button
                                secondary
                                type="info"
                                v-slots={{
                                    icon: () => <n-icon component={compute('SearchBlod')} />,
                                    default: () => <span>查找</span>
                                }}
                            ></n-button>
                        </n-space>
                    </n-form-item-gi>
                </common-request>
                <common-source
                    came-style={{ padding: '0 16px 48px' }}
                    loading={state.loading}
                    page={state.page}
                    size={state.size}
                    page-sizes={[15, 30, 45, 60]}
                    total={state.total}
                    data-source={state.dataSource}
                    cols={colsCource.value}
                    data-render={(data: IUser) => <compose-user key={data.id} node={data}></compose-user>}
                    onUpdate={fetchUpdate}
                ></common-source>
            </common-container>
        )
    }
})
</script>
