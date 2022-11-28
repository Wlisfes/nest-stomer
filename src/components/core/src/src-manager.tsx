import { onMounted, computed } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useProvider } from '@/hooks/hook-provider'
import { useRxicon } from '@/hooks/hook-icon'
import { useManager } from '@/store/manager'
import { createComponent } from '@/utils/utils-app'
import css from '@/components/core/scss/src-manager.module.scss'

export function fetchSettin() {
    const { el, mounte, unmount } = createComponent({
        name: 'FetchSettin',
        setup() {
            const { state, setState } = useState({ visible: false })
            const { Icon, compute } = useRxicon()
            const { primaryVars } = useProvider()
            const manager = useManager()

            onMounted(() => setState({ visible: true }))

            return () => (
                <n-drawer v-model:show={state.visible} to={el} width={280} placement="right" onAfterLeave={unmount}>
                    <n-drawer-content title="项目配置" native-scrollbar={false}>
                        <div class={css['setup-content']}>
                            <div class={css['vnode-column']}>
                                <n-divider style={{ margin: '10px 0' }}>主题</n-divider>
                                <n-tooltip trigger="hover" placement="bottom">
                                    {{
                                        default: () => (
                                            <span>{manager.theme === 'dark' ? '浅色主题' : '深色主题'}</span>
                                        ),
                                        trigger: () => (
                                            <n-switch
                                                value={manager.theme}
                                                checked-value="dark"
                                                unchecked-value="light"
                                                rail-style={() => ({ background: '#000e1c' })}
                                                on-update:value={(theme: 'dark' | 'light') => manager.setTheme(theme)}
                                            >
                                                {{
                                                    checked: () => (
                                                        <Icon
                                                            size="14"
                                                            color="#ffd93b"
                                                            component={compute('CheckedOutlined')}
                                                        ></Icon>
                                                    ),
                                                    unchecked: () => (
                                                        <Icon
                                                            size="14"
                                                            color="#ffd93b"
                                                            component={compute('UnCheckedOutlined')}
                                                        ></Icon>
                                                    )
                                                }}
                                            </n-switch>
                                        )
                                    }}
                                </n-tooltip>
                            </div>
                            <div class={css['vnode-column']}>
                                <n-divider style={{ margin: '24px 0 10px' }}>系统主题</n-divider>
                                <n-grid cols={9} x-gap={4} y-gap={4}>
                                    {primaryVars.value.map((color, index) => (
                                        <n-grid-item key={index}>
                                            <div
                                                class={{ [css['color-scope']]: true }}
                                                style={{ background: color }}
                                                onClick={e => manager.setPrimaryColor(color)}
                                            >
                                                {manager.primaryColor === color && (
                                                    <Icon color="#ffffff" component={compute('CheckOutlined')}></Icon>
                                                )}
                                            </div>
                                        </n-grid-item>
                                    ))}
                                </n-grid>
                            </div>
                        </div>
                    </n-drawer-content>
                </n-drawer>
            )
        }
    })

    mounte().catch(e => console.error(e))
}
