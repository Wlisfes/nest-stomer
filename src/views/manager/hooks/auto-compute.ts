import { createComponent } from '@/utils/utils-instance'
import { AutoRule } from './auto-import'

export async function fetchRule() {
    return await createComponent(AutoRule, {
        immediate: true
    })
}
