<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { httpColumnUser, type IUser } from '@/api/http-user'
import { useCurrent } from '@/locale/instance'
import { useSource } from '@/hooks/hook-source'

export default defineComponent({
    name: 'User',
    setup() {
        const { t } = useCurrent()
        const { state, fetchUpdate } = useSource<IUser, Record<string, unknown>>({
            request: e => httpColumnUser({ page: e.page, size: e.size }),
            immediate: true,
            dataColumn: []
        })

        return () => (
            <common-container>
                <common-source
                    width={375}
                    loading={state.loading}
                    total={state.total}
                    data-column={state.dataColumn}
                    data-source={state.dataSource}
                    data-render={(data: IUser) => (
                        <common-source-column
                            header={true}
                            source-style={{}}
                            direction="horizontal"
                            node={data}
                            title={data.nickname}
                            before-style={{ padding: '14px 0 14px 14px' }}
                            data-before={(data: IUser) => (
                                <n-avatar size={116} src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                            )}
                            data-render={(model: { visible: boolean }) => (
                                <Fragment>
                                    <section style={{ padding: '0 16px 16px' }}></section>
                                </Fragment>
                            )}
                        ></common-source-column>
                    )}
                ></common-source>
            </common-container>
        )
    }
})
</script>
