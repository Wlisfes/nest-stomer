import { createComponent } from '@/utils/utils-instance'
import { Rule } from './fetch-import'

export async function fetchRule(props = {}) {
    return await createComponent(Rule, { immediate: true, props })
}
