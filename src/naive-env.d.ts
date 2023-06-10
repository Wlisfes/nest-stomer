import { LoadingBarInst } from 'naive-ui/lib/loading-bar'
import { NotificationApiInjection } from 'naive-ui/lib/notification'
import { DialogApiInjection } from 'naive-ui/lib/dialog'
import { MessageApiInjection } from 'naive-ui/lib/message'
import { CookieStorage } from '@/utils/utils-cookie'
import { Layout } from '@/utils/utils-layout'

declare global {
    interface Window {
        $message: MessageApiInjection
        $loading: LoadingBarInst
        $notification: NotificationApiInjection
        $dialog: DialogApiInjection
        $cookie: CookieStorage
        $layout: Layout
        AliyunUpload: {
            Vod: new (option) => any
        }
    }
}
