<script lang="tsx">
import { defineComponent, Fragment, computed, type CSSProperties } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonSourceColumn',
    setup() {
        const { visible, setState } = useState({ visible: false })
        const headerStyle = computed<CSSProperties>(() => ({
            padding: 0
        }))

        return () => (
            <div>
                <n-el class="common-source__column n-card">
                    <div class="column-header">
                        <div class="column-header__content">
                            可以被分段。分段分割线会在区域的上方出现可以被分段。分段分割线会在区域的上方出现可以被分段可以被分段。分段分割线会在区域的上方出现可以被分段。分段分割线会在区域的上方出现可以被分段
                        </div>
                        <div class="column-header__extra">
                            <n-icon>
                                <i-ep-arrow-right-bold></i-ep-arrow-right-bold>
                            </n-icon>
                        </div>
                    </div>
                </n-el>
                <n-card
                    title="可以被分段。分段分割线会在区域的上方出现可以被分段。分段分割线会在区域的上方出现可以被分段。分段分割线会在区域的上方出现可以被分段。分段分割线会在区域的上方出现"
                    header-style={headerStyle.value}
                >
                    {{
                        'header-extra': () => <div>11111</div>,
                        default: () => (
                            <Fragment>
                                <div onClick={() => setState({ visible: !visible.value })}>232312</div>
                                <common-collapse visible={visible.value}>
                                    <div>
                                        content 和 footer 可以被分段或 soft 分段，action 可以被分段。分段分割线会在区域的上方出现。content
                                        和 footer 可以被分段或 soft 分段，action 可以被分段。分段分割线会在区域的上方出现。content 和 footer
                                        可以被分段或 soft 分段，action 可以被分段。分段分割线会在区域的上方出现。content 和 footer
                                        可以被分段或 soft 分段，action 可以被分段。分段分割线会在区域的上方出现。
                                    </div>
                                </common-collapse>
                            </Fragment>
                        )
                    }}
                </n-card>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-source__column {
    position: relative;
    border: 1px solid var(--divider-color);
    margin-bottom: 10px;
    .column-header {
        display: flex;
        color: var(--text-color-1);
        &__extra {
            display: flex;
            align-items: center;
        }
        &__content {
            flex: 1;
            font-size: 18px;
            line-height: var(--height-small);
        }
    }
}
</style>
