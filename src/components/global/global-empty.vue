<script lang="tsx">
import { defineComponent, computed, PropType, CSSProperties, VNode } from 'vue'
import { loadFile } from '@/utils/utils-common'

export default defineComponent({
    name: 'GlobalEmpty',
    props: {
        size: {
            type: Number,
            default: 200
        },
        description: {
            type: String,
            default: '暂无内容'
        },
        style: {
            type: Object as PropType<CSSProperties>,
            default: null
        },
        space: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const style = computed(() => {
            const u: CSSProperties = {}
            if (props.space) u.padding = props.space
            if (props.style) return { ...u, ...props.style }
            return u
        })
        return () => (
            <n-card>
                <n-el tag="div" class="global-empty" style={style.value}>
                    <n-image object-fit="cover" preview-disabled style={{ width: `${props.size}px` }} src={loadFile('base/no-data.png')} />
                    <div class="global-empty__description">{props.description}</div>
                </n-el>
            </n-card>
        )
    }
})
</script>

<style lang="scss" scoped>
.global-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    :deep(.n-image) {
        max-width: 100%;
        img {
            width: 100%;
            display: block;
            user-select: none;
        }
    }
    &__description {
        transition: color 0.3s var(--n-bezier);
        color: var(--placeholder-color);
    }
}
</style>
