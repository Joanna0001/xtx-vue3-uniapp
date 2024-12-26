import { ref } from "vue"

export const useMemberStore = defineStore('member', () => {
  // 会员信息
  const profile = ref()

  // 保存会员信息，登录时使用
  const setProfile = (data: any) => {
    profile.value = data
  }

  // 清理会员信息，退出时使用
  const clearProfile = () => {
    profile.value = null
  }

  return {
    profile,
    setProfile,
    clearProfile
  }
},
  // 持久化
  {
    // 网页端
    // persist: true,
    // 小程序端
    persist: {
      storage: {
        getItem: (key: string) => uni.getStorageSync(key),
        setItem: (key: string, value: any) => uni.setStorageSync(key, value),
        removeItem: (key: string) => uni.removeStorageSync(key)
      }
    }
  }
)