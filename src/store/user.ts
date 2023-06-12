import { defineStore } from 'pinia'
import { httpBasicUser, type IUser } from '@/api/http-user'

export const useUser = defineStore({
    id: 'user',
    state: (): Partial<IUser> => ({
        uid: undefined
    }),
    actions: {
        httpBasicUser: () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await httpBasicUser()
                    console.log(data)

                    resolve(data)
                } catch (e) {
                    reject(e)
                }
            })
        }
    }
})
