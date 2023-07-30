<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { loadFile } from '@/utils/utils-common'
import { useCurrent } from '@/locale/instance'

export default defineComponent({
    name: 'Compute',
    setup() {
        const { locale, setLocale } = useCurrent()

        return () => (
            <n-el class="compute-container">
                <common-screen></common-screen>
                <div class="app-compute">
                    <div class={`n-locale is-${'cn'}`}>
                        <n-text class="n-locale__value" depth={1} onClick={() => setLocale(locale.value === 'cn' ? 'en' : 'cn')}>
                            {{ default: () => locale.value.toUpperCase() }}
                        </n-text>
                    </div>
                    <RouterView></RouterView>
                </div>
                {/* <n-el class="app-compute">
                    <div class="app-compute__stomer">
                        <img src={loadFile('basic/login-stomer.svg')} />
                    </div>
                    <div class="app-compute__form">
                        <div class={`n-locale is-${'cn'}`}>
                            <n-text class="n-locale__value" depth={1} onClick={() => setLocale(locale.value === 'cn' ? 'en' : 'cn')}>
                                {{ default: () => locale.value.toUpperCase() }}
                            </n-text>
                        </div>
                        <RouterView></RouterView>
                    </div>
                </n-el> */}
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.compute-container {
    background: url('@/assets/basic/login-cover.jpg') center center / cover no-repeat;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    overflow: hidden;
    .n-locale {
        position: absolute;
        right: -50px;
        top: -50px;
        width: 100px;
        height: 100px;
        transform: rotateZ(45deg);
        user-select: none;
        transition: all 300ms;
        &.is-en {
            box-shadow: 0 0 10px #8ec5fc;
            background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
        }
        &.is-cn {
            box-shadow: 0 0 10px #e3eeff;
            background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
        }
        &__value {
            position: absolute;
            left: 37px;
            top: 67px;
            transform: rotateZ(-45deg);
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
        }
    }
    .app-compute {
        position: relative;
        background-color: var(--body-color);
        border-radius: 8px;
        box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25), 0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
        width: 100%;
        max-width: 480px;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        overflow: hidden;
        padding: 24px;
        box-sizing: border-box;
        margin-left: auto;
        margin-top: auto;
        margin-right: 240px;
        margin-bottom: 240px;
        @media (max-width: 1000px) {
            margin: auto;
        }
        :deep(.n-input) {
            .n-input-wrapper {
                padding: 0;
            }
            .n-input__input-el {
                max-width: calc(100% - 24px);
                padding: 8px 12px;
                box-sizing: content-box;
            }
            .n-input__placeholder {
                padding: 0 12px;
            }
            .n-input__suffix {
                position: absolute;
                height: 100%;
                margin-left: 0;
                top: 0;
                right: 12px;
            }
        }
        :deep(.n-space > div) {
            display: flex;
            cursor: pointer;
        }
        :deep(h1) {
            font-size: 30px;
            color: var(--text-color-2);
            line-height: 1.5;
            margin: 0 0 30px;
        }
        :deep(.antd-submit) {
            height: 50px;
            width: 100%;
            font-size: 16px;
            border-radius: 4px;
        }
    }
}
</style>
