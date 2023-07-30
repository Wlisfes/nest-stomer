<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonScreen',
    props: {
        poster: {
            type: String,
            default: 'https://oss.lisfes.cn/stomer/2023-07/1690693757173.jpg'
        }
    },
    setup(props, { slots }) {
        return () => (
            <n-el class="common-screen" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <video
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    src="https://cloud.lisfes.cn/sv/64425564-189a528c216/64425564-189a528c216.mp4?auth_key=1690693078-ed3fbab9e3864216aeb07eaa391a2f21-0-987a1314d624abb1f74105f9da018de0"
                    poster={props.poster}
                    autoplay
                    loop
                    muted
                ></video>
            </n-el>
        )
    }
})
</script>
