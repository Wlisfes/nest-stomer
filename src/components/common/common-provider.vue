<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonProvider',
    setup(props, { slots }) {
        // const { theme, themeOverrides } = useProvider()
        return () => (
            <n-config-provider abstract inline-theme-disabled>
                <n-loading-bar-provider>
                    <n-dialog-provider>
                        <n-notification-provider max={3}>
                            <n-message-provider>{{ default: slots.default }}</n-message-provider>
                        </n-notification-provider>
                    </n-dialog-provider>
                </n-loading-bar-provider>
            </n-config-provider>
        )
    }
})
</script>
