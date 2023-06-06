<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { loadFile } from '@/utils/utils-common'

export default defineComponent({
    name: 'Compute',
    setup() {
        // const { locale, setLocale } = useLocale()

        return () => (
            <div class="compute-container">
                <n-el class="app-compute">
                    <div class="app-compute__stomer">
                        <img src={loadFile('basic/login-stomer.svg')} />
                    </div>
                    <div class="app-compute__form">
                        <div class={`n-locale is-${'cn'}`}>
                            {/* <n-text class="n-locale__value" depth={1} onClick={() => setLocale(locale.value === 'cn' ? 'en' : 'cn')}>
                                {{ default: () => locale.value.toUpperCase() }}
                            </n-text> */}
                        </div>
                        <RouterView></RouterView>
                    </div>
                </n-el>
            </div>
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
    justify-content: center;
    align-items: center;
    padding: 0 20px;
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
        background-color: var(--body-color);
        border-radius: 8px;
        box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25), 0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
        width: 100%;
        max-width: 1080px;
        display: flex;
        border-radius: 8px;
        overflow: hidden;
        @media (max-width: 1000px) {
            max-width: 480px;
        }
        &__stomer {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ebf4ff;
            overflow: hidden;
            padding: 4rem;
            box-sizing: border-box;
            @media (max-width: 1000px) {
                display: none;
            }
            img {
                width: 100%;
                display: block;
            }
        }
        &__form {
            position: relative;
            width: 100%;
            max-width: 480px;
            padding: 4rem;
            box-sizing: border-box;
            transition: padding 300ms;
            @media (max-width: 460px) {
                padding: 2rem 20px;
            }
        }
        :deep(.n-form .n-input__input) {
            margin: 8px 0;
        }
        :deep(.n-space > div) {
            display: flex;
            cursor: pointer;
        }
        :deep(h1) {
            font-size: 30px;
            color: var(--text-color-2);
            text-align: center;
            line-height: 1.5;
            margin: 0 0 1rem;
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
