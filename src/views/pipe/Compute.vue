<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
    name: 'Compute',
    setup() {
        return () => (
            <div class="container">
                <n-el class="app-compute">
                    <RouterView></RouterView>
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
        box-sizing: border-box;
        max-width: 350px;
        padding: 0 20px 25px;
        :deep(h2) {
            font-size: 22px;
            color: var(--text-color-2);
            text-align: center;
            line-height: 1.5;
            margin: 16px 0;
        }
        :deep(.antd-submit) {
            height: 40px;
            width: 70%;
            margin: 0 15%;
            font-size: 16px;
        }
    }
}
</style>
