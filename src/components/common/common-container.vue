<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        position: {
            type: String,
            default: 'is-absolute'
        }
    },
    setup(props, { slots }) {
        console.log(slots)
        return () => (
            <section class={{ 'common-container': true, [props.position]: true }}>
                {slots.toolbar && (
                    <n-space class="basic-toolbar" size={[10, 8]} wrap-item={false}>
                        basic
                        <n-tooltip trigger="hover">
                            {{
                                trigger: () => <span>1</span>,
                                default: () => 'refresh'
                            }}
                        </n-tooltip>
                    </n-space>
                )}
                <n-scrollbar></n-scrollbar>
            </section>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-container {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &.is-absolute {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .common-toolbar {
        position: relative;
        overflow: hidden;
        margin-bottom: 10px;
    }
}
</style>
