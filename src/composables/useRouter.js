import {getCurrentInstance} from 'vue'

export function useRouter() {
    const instance = getCurrentInstance()
    if (!instance) {
        throw new Error('useRouter must be called within a component')
    }

    const router = instance.appContext.config.globalProperties.$router
    if (!router) {
        throw new Error('Router not found. Make sure it is properly configured in main.js')
    }

    return router
}