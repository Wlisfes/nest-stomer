<script lang="tsx">
import { defineComponent } from 'vue'
import { httpColumnRoute, type IRoute } from '@/api/http-route'
import { useSource } from '@/hooks/hook-source'

export default defineComponent({
    name: 'Route',
    setup() {
        const { state } = useSource<IRoute, Record<string, unknown>>({
            immediate: true,
            dataColumn: [],
            request: () => httpColumnRoute()
        })

        return () => (
            <common-container loading={state.loading && state.total === 0} empty={!state.loading && state.total === 0}>
                <section>
                    {state.dataSource.map(x => (
                        <common-layout key={x.id}>
                            <common-layout-column>1</common-layout-column>
                            <common-layout-column>2</common-layout-column>
                            <common-layout-column>3</common-layout-column>
                            <common-layout-column>4</common-layout-column>
                        </common-layout>
                    ))}
                </section>
            </common-container>
        )
    }
})
</script>
