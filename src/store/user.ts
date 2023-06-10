import { defineStore } from 'pinia'
import { httpUser, type IUser } from '@/api/http-user'

export const useUser = defineStore({
    id: 'user',
    state: (): Partial<IUser> => ({
        uid: undefined
    }),
    actions: {
        httpUser: () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await httpUser()
                    console.log(data)

                    resolve(data)
                } catch (e) {
                    reject(e)
                }
            })
        }
    }
})
