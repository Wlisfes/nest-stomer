import { request } from '@/utils/utils-request'
import { RCommon } from '@/interface/fetch-core'

/**发送手机验证码**/
export function httpMobile(data: { mobile: string }) {
    return request<Pick<RCommon, 'message'>>({
        url: `/api/core/fetch-mobile`,
        method: 'POST',
        data
    })
}
