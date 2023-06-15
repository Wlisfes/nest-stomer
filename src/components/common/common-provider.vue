<script lang="tsx">
import { defineComponent } from 'vue'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'CommonProvider',
    setup(props, { slots }) {
        const { theme, themeOverrides } = useProvider()
        return () => (
            <n-config-provider abstract inline-theme-disabled theme={theme.value} theme-overrides={themeOverrides.value}>
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
