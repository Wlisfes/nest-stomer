import { LoadingBarInst } from 'naive-ui/lib/loading-bar'
import { NotificationApiInjection } from 'naive-ui/lib/notification'
import { DialogApiInjection } from 'naive-ui/lib/dialog'
import { MessageApiInjection } from 'naive-ui/lib/message'
import { CookieStorage } from '@/utils/utils-cookie'

declare global {
    interface Window {
        $message: MessageApiInjection
        $loading: LoadingBarInst
        $notification: NotificationApiInjection
        $dialog: DialogApiInjection
        $cookie: CookieStorage
        AliyunUpload: {
            Vod: new (option) => any
        }
    }
}
