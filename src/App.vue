<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useNotification, useLoadingBar, useDialog, useMessage } from 'naive-ui'
import { useResize } from '@/hooks/hook-resize'

export default defineComponent({
    name: 'App',
    setup() {
        const { device } = useResize()
        window.$loading = useLoadingBar()
        window.$message = useMessage()
        window.$notification = useNotification()
        window.$dialog = useDialog()

        return () => (
            <common-provider>
                <RouterView></RouterView>
            </common-provider>
        )
    }
})
</script>
