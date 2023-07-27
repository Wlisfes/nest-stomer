<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    setup(props) {
        async function httpUpdateBucket() {
            const { data } = await fetch(`http://localhost:5002/api/app/update/bucket`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    appKey: 'sFnFysvpL0DFGs6H',
                    bucket: ['*']
                })
            }).then(response => response.json())

            console.log(data)
        }

        return () => (
            <main>
                <n-button type="primary" onClick={httpUpdateBucket}>
                    Tertiary
                </n-button>
                <common-captcha show={true}></common-captcha>
            </main>
        )
    }
})
</script>
