import type { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { ref, toRefs, onMounted } from 'vue'
import { useState } from '@/hooks/hook-state'
import { divineHandler, divineDelay } from '@/utils/utils-common'
type Option<T extends Record<string, any>, R extends Record<string, any>> = {
    immediate?: boolean
    disabled?: boolean
    visible?: boolean
    rules?: FormRules
    option: R
    form: T
    loading: boolean
}

export function useCustomize<T extends Object, R extends Object>(option: Option<T, R>, handler?: Function) {
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
        callback: Function = Function,
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

    /**滚动到第一个报错表单选项**/
    async function divineFormScrollbar() {
        await divineDelay(0)
        // const element = formRef.$el.querySelector('.el-form-item__error')
        // return element?.scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'center'
        // })
    }

    return { ...toRefs(state), state, formRef, setState, divineFormValidater, divineFormRestore, divineFormScrollbar }
}
