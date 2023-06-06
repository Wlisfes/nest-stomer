<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'

interface IState {
    loading: boolean
    user: {
        uid: number
        nickname: string
    }
}

export default defineComponent({
    name: 'Home',
    setup(props) {
        const { state, user, setState } = useState<IState>({
            loading: true,
            user: {
                uid: Date.now(),
                nickname: '情雨随风'
            }
        })

        const setChnage = (value: boolean) => {
            if (value) {
                setState({
                    user: {
                        uid: Date.now(),
                        nickname: '亚丝娜'
                    }
                })
            } else {
                setState(e => ({
                    loading: false,
                    user: { uid: Date.now(), nickname: '西莉卡' }
                })).then(x => {
                    console.log(x)
                })
            }
        }

        return () => (
            <main>
                <div>Home</div>
                <n-h1>{`user: ${user.value.uid}`}</n-h1>
                <n-h1>{`uid: ${state.user.uid}`}</n-h1>
                <n-h1>{`nickname: ${state.user.nickname}`}</n-h1>
                <n-button onClick={(e: Event) => setChnage(true)}>Done: true</n-button>
                <n-button onClick={(e: Event) => setChnage(false)}>Done: false</n-button>
            </main>
        )
    }
})
</script>
