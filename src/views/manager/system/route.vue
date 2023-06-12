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
            <common-container>
                <section style={{ minWidth: '1000px' }}></section>
            </common-container>
        )
    }
})
</script>
