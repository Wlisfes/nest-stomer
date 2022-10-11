<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { RouterView } from 'vue-router'
import { useLoadingBar, useNotification, useMessage, useDialog } from 'naive-ui'
import { useInstance } from '@/utils/utils-instance'

export default defineComponent({
    setup() {
        window.$loading = useLoadingBar()
        window.$notification = useNotification()
        window.$message = useMessage()
        window.$dialog = useDialog()
        window.$instance = useInstance()

        return () => (
            <Fragment>
                <RouterView></RouterView>
            </Fragment>
        )
    }
})
</script>
