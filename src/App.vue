<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useNotification, useLoadingBar, useDialog, useMessage } from 'naive-ui'
import { Layout } from '@/utils/utils-layout'

export default defineComponent({
    name: 'App',
    setup() {
        window.$layout = new Layout()
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
