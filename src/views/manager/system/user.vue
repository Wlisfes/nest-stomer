<script lang="tsx">
import { defineComponent } from 'vue'
import { httpColumnUser, type IUser } from '@/api/http-user'
import { useCurrent } from '@/locale/instance'
import { useSource } from '@/hooks/hook-source'
import type { IColumn } from '@/interface/http-interface'

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
                        <common-source-column key={data.id} node={data}>
                            <div>{data.uid}</div>
                        </common-source-column>
                    )}
                ></common-source>
            </common-container>
        )
    }
})
</script>
