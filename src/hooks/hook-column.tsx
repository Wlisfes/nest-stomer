import { IColumn } from '@/interface/fetch-core'

export function useColumn<R = any>(option?: IColumn<R>) {
    /**计算列百分比**/
    const calcColumn = (width: number, max: number = 1080) => {
        return (width / max) * 100 + '%'
    }

    return { calcColumn }
}
