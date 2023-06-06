<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Login',
    setup() {
        return () => (
            <div>
                <n-form label-placement="left">
                    <n-form-item path="mobile">
                        <n-input maxlength={11} type="text" size="medium" input-props={{ autocomplete: 'off' }}></n-input>
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input
                            maxlength={16}
                            size="medium"
                            type="password"
                            show-password-on="mousedown"
                            input-props={{ autocomplete: 'new-password' }}
                        ></n-input>
                    </n-form-item>
                    <n-form-item path="code">
                        <n-input size="medium" maxlength={4} input-props={{ autocomplete: 'off' }}></n-input>
                        <common-scale max-width={120} scale={120 / 50} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                            <n-image preview-disabled style={{ borderRadius: '2px' }}>
                                {{
                                    placeholder: () => (
                                        <n-skeleton
                                            width="100%"
                                            height="100%"
                                            style={{ borderRadius: '4px', backgroundColor: '#E8F0FE' }}
                                        />
                                    )
                                }}
                            </n-image>
                        </common-scale>
                    </n-form-item>
                </n-form>
            </div>
        )
    }
})
</script>
