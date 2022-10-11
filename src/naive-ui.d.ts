import type { LoadingBarInst } from 'naive-ui/lib/loading-bar'
import type { NotificationApiInjection } from 'naive-ui/lib/notification'
import type { DialogApiInjection } from 'naive-ui/lib/dialog'
import type { MessageApiInjection } from 'naive-ui/lib/message'
import type { NInstance } from '@/utils/utils-instance'

declare global {
    interface Window {
        $message: MessageApiInjection
        $loading: LoadingBarInst
        $notification: NotificationApiInjection
        $dialog: DialogApiInjection
        $instance: NInstance
        AliyunUpload: {
            Vod: new (option) => any
        }
    }
}
