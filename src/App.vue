<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
    name: 'App',
    setup() {
        return () => (
            <Fragment>
                <RouterView></RouterView>
            </Fragment>
        )
    }
})
</script>
