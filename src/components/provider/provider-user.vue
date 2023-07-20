<script lang="tsx">
import { defineComponent, Fragment, type PropType } from 'vue'
import { useState } from '@/hooks/hook-state'
import { sompute } from '@/utils/utils-remix'
import { type IUser } from '@/api/http-user'

export default defineComponent({
    name: 'ProviderUser',
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
        const { state, setState } = useState({
            visible: false,
            collapse: false
        })

        return () => (
            <n-el tag="div" class={{ 'provider-user': true, 'is-bordered': props.bordered }}>
                <div class="provider-user__reserve">
                    <n-avatar size={90} src={props.node.avatar} style={{ margin: '14px 20px 14px 14px' }}></n-avatar>
                    <div class="n-basic n-column n-auto" style={{ padding: '0' }}>
                        <div class={{ 'user-header not-selecter': true, 'n-pointer': state.collapse }}>
                            <div class="user-header__content n-basic">
                                <n-h3 style={{ flex: 1, margin: 0 }}>
                                    <n-ellipsis tooltip={false}>{props.node.nickname}</n-ellipsis>
                                </n-h3>
                            </div>
                            <n-space align="center" justify="center" wrap-item={false} size={5} style={{ margin: '0 10px 0' }}>
                                <common-remix
                                    hover={false}
                                    size={18}
                                    icon={sompute('ArrowRightBold', {
                                        style: {
                                            transition: 'transform 0.3s var(--cubic-bezier-ease-in-out)',
                                            color: 'var(--text-color-2)',
                                            transform: state.visible ? 'rotateZ(90deg)' : 'rotateZ(0deg)'
                                        }
                                    })}
                                ></common-remix>
                            </n-space>
                        </div>
                        <n-grid cols={4} x-gap={14} y-gap={14} item-responsive style={{ padding: '0' }}>
                            <n-grid-item span={1}>
                                <common-reactive y-gap={3} label="重定向地址" content={props.node.mobile}></common-reactive>
                            </n-grid-item>
                            <n-grid-item span={1}>
                                <common-reactive y-gap={3} label="页面路径" content={props.node.mobile}></common-reactive>
                            </n-grid-item>
                            <n-grid-item span={1}>
                                <common-reactive y-gap={3} label="重定向地址" content={props.node.createTime}></common-reactive>
                            </n-grid-item>
                            <n-grid-item span={1}>
                                <common-reactive y-gap={3} label="状态">
                                    <common-mode value={props.node.status}></common-mode>
                                </common-reactive>
                            </n-grid-item>
                        </n-grid>
                    </div>
                </div>
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.provider-user {
    position: relative;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    background-color: var(--card-color);
    word-break: break-word;
    transition: color 0.3s var(--n-bezier), background-color 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier);
    &.is-bordered {
        border: 1px solid var(--divider-color);
    }
    &__reserve {
        display: flex;
        overflow: hidden;
    }

    .user-header {
        display: flex;
        padding: 14px 0;
        color: var(--text-color-1);
        &__content {
            flex: 1;
            overflow: hidden;
            line-height: var(--height-small);
        }
    }
}
</style>
