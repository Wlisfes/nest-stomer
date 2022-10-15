<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { loadFile } from '@/utils/utils-tool'

export default defineComponent({
    name: 'Compute',
    setup() {
        return () => (
            <div class="container">
                <n-el class="app-compute">
                    <div class="app-compute__stomer">
                        <img src={loadFile('resource/login-stomer.svg')} />
                    </div>
                    <div class="app-compute__form">
                        <RouterView></RouterView>
                    </div>
                </n-el>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.container {
    background: url('@/assets/resource/login-background.jpg') center center / cover no-repeat;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
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
