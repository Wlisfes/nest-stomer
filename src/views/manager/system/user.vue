<script lang="tsx">
import { defineComponent } from 'vue'
import { httpColumnUser, type IUser } from '@/api/http-user'
import { useCurrent } from '@/locale/instance'
import { useSource } from '@/hooks/hook-source'
import { compute, sompute } from '@/utils/utils-remix'

export default defineComponent({
    name: 'User',
    setup() {
        const { t } = useCurrent()
        const { state, fetchUpdate } = useSource(
            {
                immediate: true,
                form: {
                    nickname: undefined
                },
                size: 20
            },
            e => httpColumnUser({ page: e.page, size: e.size })
        )

        return () => (
            <common-container>
                <common-request cols={{ 544: 1, 640: 2, 960: 3, 1400: 4, 1592: 6, 2160: 7, 3440: 8 }} default-cols={12}>
                    <n-form-item-gi span={1}>
                        <n-input v-model:value={state.form.nickname} placeholder="昵称" />
                    </n-form-item-gi>
                    <n-form-item-gi span={1}>
                        <n-input v-model:value={state.form.nickname} placeholder="UID" />
                    </n-form-item-gi>
                    <n-form-item-gi span={1}>
                        <n-input v-model:value={state.form.nickname} placeholder="手机号" />
                    </n-form-item-gi>
                    <n-form-item-gi span={1}>
                        <n-input v-model:value={state.form.nickname} placeholder="电子邮件" />
                    </n-form-item-gi>
                    <n-form-item-gi span={2}>
                        <n-space size={14} wrap-item={false}>
                            <common-touch
                                type="primary"
                                icon-render={sompute('SearchBlod', { size: 22 })}
                                onClick={(e: any, done: Function) => done({ loading: true })}
                            ></common-touch>
                            <common-touch type="primary" icon-render={sompute('AddRound')}></common-touch>
                            <common-touch
                                type="primary"
                                icon-render={sompute('RadixSpin')}
                                onClick={(e: any, done: Function) => done({ loading: true })}
                            ></common-touch>
                        </n-space>
                    </n-form-item-gi>
                </common-request>
                <common-source
                    came-style={{ padding: '0 16px 48px' }}
                    loading={state.loading}
                    page={state.page}
                    size={state.size}
                    page-sizes={[20, 30, 40, 50, 60]}
                    total={state.total}
                    data-source={state.dataSource}
                    cols={{ 768: 1, 1144: 2, 1520: 3, 1896: 4, 4320: 5 }}
                    default-cols={3}
                    data-render={(data: IUser) => <compose-user key={data.id} node={data}></compose-user>}
                    onUpdate={fetchUpdate}
                ></common-source>
            </common-container>
        )
    }
})
</script>
