import type { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { ref, toRefs, onMounted } from 'vue'
import { useState } from '@/hooks/hook-state'
import { divineHandler } from '@/utils/utils-common'
export interface OptionCustomize<T extends Record<string, any>> {
    immediate?: boolean
    visible?: boolean
    rules?: FormRules
    form: T
    loading: boolean
}

export function useCustomize<T extends Object>(option: OptionCustomize<T>, handler?: Function) {
    const formRef = ref<FormInst>()
    const { state, setState } = useState<typeof option>(option)

    onMounted(async () => {
        await divineHandler(
            () => option.immediate && typeof handler === 'function',
            () => handler?.(state)
        )
    })

    /**验证表单**/
    function divineFormValidater(
        callback: Function,
        app: { reject?: boolean; catch?: Function; formatter?: (e: FormItemRule) => boolean } = {}
    ) {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            //prettier-ignore
            formRef.value.validate(async err => {
                if (!err) {
                    return resolve(await callback())
                }
            }, app.formatter).catch(err => {
                app.catch && app.catch(err)
                app.reject && reject(err)
            })
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
