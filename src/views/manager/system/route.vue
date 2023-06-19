<script lang="tsx">
import { defineComponent } from 'vue'
import { httpColumnRoute, type IRoute } from '@/api/http-route'
import { useSource } from '@/hooks/hook-source'
import { useManager } from '@/store/manager'

export default defineComponent({
    name: 'Route',
    setup() {
        const store = useManager()
        const { state } = useSource<IRoute, Record<string, unknown>>({
            immediate: true,
            dataColumn: [
                { key: 'title', title: '节点名称', minWidth: 150 },
                { key: 'icon', title: '节点图标', minWidth: 120 },
                { key: 'type', title: '节点类型', minWidth: 150 },
                { key: 'path', title: '页面路径', minWidth: 255 },
                { key: 'redirect', title: '重定向地址', minWidth: 255 },
                { key: 'status', title: '状态', minWidth: 150 }
            ],
            request: () => httpColumnRoute()
        })

        return () => (
            <common-container>
                <common-source
                    width={840}
                    device={store.device}
                    loading={state.loading}
                    total={state.total}
                    data-column={state.dataColumn}
                    data-source={state.dataSource}
                >
                    {{
                        column: (scope: IRoute & { visible: boolean; done: Function }) => {
                            console.log(scope)
                            return (
                                <div>
                                    1111111111111
                                    <common-collapse visible={scope.visible}>
                                        <div>
                                            如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有
                                            996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？
                                        </div>
                                    </common-collapse>
                                </div>
                            )
                        }
                    }}
                </common-source>
            </common-container>
        )
    }
})
</script>
