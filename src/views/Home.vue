<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    setup(props) {
        return () => (
            <main>
                <common-captcha show={true}></common-captcha>
            </main>
        )
    }
})
</script>
