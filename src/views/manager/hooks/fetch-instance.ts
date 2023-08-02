import type { HCommand } from '@/interface/basic-interface'
import { createComponent } from '@/utils/utils-instance'
import { Rule, Route, Authorize } from './fetch-import'

export async function fetchRule(props: { command: HCommand; title: string; parent?: number; id?: number }) {
    return await createComponent(Rule, { ...props })
}

export async function fetchRoute(props: { command: HCommand; title: string; parent?: number; id?: number }) {
    return await createComponent(Route, { ...props })
}

export async function fetchAuthorize(props: { uid: number }) {
    return await createComponent(Authorize, { ...props })
}
