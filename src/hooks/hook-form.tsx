import type { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { ref, toRefs } from 'vue'
import { useState } from '@/hooks/hook-state'

export function useCustomizeForm<T extends Object>(option: T & { rules?: FormRules }) {
    const formRef = ref<FormInst>()
    const { state, setState } = useState<typeof option>(option)

    /**验证表单**/
    function divineFormValidater(callback: Function, factorRule?: (e: FormItemRule) => boolean) {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            //prettier-ignore
            formRef.value.validate(err => {
                if (!err) {
                    return resolve(callback?.())
                }
            }, factorRule).catch(err => reject(err))
        })
    }

    /**重置表单校验结果**/
    function divineFormRestore() {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            return resolve(formRef.value.restoreValidation())
        })
    }

    return { ...toRefs(state), state, formRef, setState, divineFormValidater, divineFormRestore }
}
