<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Master',
    setup() {
        return () => (
            <u-container>
                <global-layout min={792} style={{ margin: '0 20px' }}>
                    {{
                        default: () => {
                            return [96, 96, 96, 96, 96, 96, 120, 96, 160, 200].map((x, index) => (
                                <global-layout-column key={index} min={792} width={x}>
                                    {index}
                                </global-layout-column>
                            ))
                        }
                    }}
                </global-layout>
            </u-container>
        )
    }
})
</script>
