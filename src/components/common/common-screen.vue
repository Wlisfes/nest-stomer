<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonScreen',
    props: {
        poster: {
            type: String,
            default: `https://oss.lisfes.cn/stomer/2023-07/1690693757173.jpg`
        },
        src: {
            type: String,
            default: `https://cloud.lisfes.cn/customerTrans/7cfb694d9456cc5369e984004d41957f/1317ab76-189ac3dc5c4-0005-5c87-c9a-697bc.mp4?auth_key=1690804850-08cbf98806aa4f7a8f10f720047f0cd6-0-b51c65daa0e57254f4fe9fe94b553a88`
        }
    },
    setup(props) {
        return () => (
            <n-el class="common-screen" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <video
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    src={props.src}
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
