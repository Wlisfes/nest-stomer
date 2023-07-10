import type { HCommand } from '@/interface/basic-interface'
import { createComponent } from '@/utils/utils-instance'
import { Rule, Route } from './fetch-import'
export interface HBasic {
    command: HCommand
    title: string
    parent?: number
    id?: number
}

export async function fetchRule(props: HBasic) {
    return await createComponent(Rule, { ...props })
}

export async function fetchRoute(props: HBasic) {
    return await createComponent(Route, { ...props })
}
