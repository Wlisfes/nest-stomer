<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    setup(props) {
        async function httpUpdateBucket() {
            const { data } = await fetch(`https://api.lisfes.cn/api-captcha/app/update/bucket`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    appKey: 'sFnFysvpL0DFGs6H',
                    bucket: ['*']
                })
            }).then(response => response.json())

            console.log(data)
        }

        async function httpInspector(e: { token: string; session: string; appKey: string }) {
            console.log(e)
            const { data } = await fetch(`https://api.lisfes.cn/api-captcha/supervisor/inspector`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    appSecret: '5wE2EzGEI4JDn4M1uzsEEMsGCCsAu2pJ',
                    appKey: e.appKey,
                    token: e.token,
                    session: e.session
                })
            }).then(response => response.json())
            console.log(data)
        }

        return () => (
            <main>
                <n-button type="primary" onClick={httpUpdateBucket}>
                    Tertiary
                </n-button>
                <common-captcha onSuccess={httpInspector}></common-captcha>
            </main>
        )
    }
})
</script>
