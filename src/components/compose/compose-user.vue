<script lang="tsx">
import { defineComponent, type PropType } from 'vue'
import { sompute } from '@/utils/utils-remix'
import { type IUser } from '@/api/http-user'
import { fetchAuthorize } from '@/views/manager/hooks/fetch-instance'

export default defineComponent({
    name: 'ComposeUser',
    props: {
        node: {
            type: Object as PropType<IUser>,
            required: true
        },
        bordered: {
            type: Boolean,
            default: true
        }
    },
    setup(props, { emit }) {
        /**编辑用户权限**/
        function onUpdateAuthorize() {
            return fetchAuthorize({ uid: props.node.uid }).then(({ observer }) => {
                observer.on('submit', ({ done }) => {
                    done({ visible: false }).finally(() => emit('update'))
                })
            })
        }

        return () => (
            <n-el tag="div" class={{ 'compose-user': true, 'is-bordered': props.bordered }}>
                <div class="n-basic" style={{ overflow: 'hidden' }}>
                    <n-avatar size={56} src={props.node.avatar} style={{ margin: '14px' }}></n-avatar>
                    <div class="n-basic n-column n-auto">
                        <div class="n-basic not-selecter" style={{ padding: '14px 0', color: 'var(--text-color-1)' }}>
                            <div class="n-basic n-auto" style={{ overflow: 'hidden', lineHeight: 'var(--height-small)' }}>
                                <n-h3 style={{ flex: 1, margin: 0 }}>
                                    <n-ellipsis tooltip={false}>{props.node.nickname}</n-ellipsis>
                                </n-h3>
                            </div>
                            <n-space align="center" justify="center" wrap-item={false} size={5} style={{ margin: '0 10px 0' }}>
                                <common-remix
                                    stop
                                    size={18}
                                    type="success"
                                    icon={sompute('SlackBold')}
                                    onTrigger={onUpdateAuthorize}
                                ></common-remix>
                                <common-dropdown
                                    command={[
                                        { key: 'update', visible: true },
                                        { key: 'disable', visible: props.node.status === 'enable' },
                                        { key: 'enable', visible: props.node.status === 'disable' }
                                    ].reduce((and: string[], next) => (next.visible ? and.concat(next.key) : and), [])}
                                >
                                    <common-remix stop size={18} icon={sompute('RadixMore')}></common-remix>
                                </common-dropdown>
                            </n-space>
                        </div>
                    </div>
                </div>
                <div style={{ padding: '0 14px 14px' }}>
                    <n-grid cols={2} x-gap={14} y-gap={14}>
                        <n-grid-item span={1}>
                            <common-reactive y-gap={3} label="UID" content={props.node.uid}></common-reactive>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <common-reactive y-gap={3} label="手机号" content={props.node.mobile}></common-reactive>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <common-reactive y-gap={3} label="电子邮件" content={props.node.email}></common-reactive>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <common-reactive y-gap={3} label="OpenID" content={props.node.openid}></common-reactive>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <common-reactive y-gap={3} label="注册时间" content={props.node.createTime}></common-reactive>
                        </n-grid-item>
                        <n-grid-item span={1}>
                            <common-reactive y-gap={3} label="状态">
                                <common-mode value={props.node.status}></common-mode>
                            </common-reactive>
                        </n-grid-item>
                    </n-grid>
                </div>
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.compose-user {
    position: relative;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    background-color: var(--card-color);
    word-break: break-word;
    transition: color 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier);
    border: 1px solid var(--divider-color);
}
</style>
