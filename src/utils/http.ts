import { useMemberStore } from "@/stores"

const baseURL = "https://pcapi-xiaotuxian-front-devtest.itheima.net"

// 添加拦截器
const httpInterceptor = (config: AxiosRequestConfig) => {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 非http开头需拼接地址
    if(!options.url.startsWith('http')) {
      defineOptions.url = baseURL + options.url
    }

    // 请求超时，默认60s
    options.timeout = 10000
    // 添加小程序请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp'
    }
    // 添加token请求头
    const memberStore = useMemberStore()
    const token = useMemberStore.profile?.token
    if(token) {
      options.header.Authorization = token
    }
  }
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: number
  message: string
  result: T
}

const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: (res: any) => {
        if(res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if(res.statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            title: (res.data as Data<T>).msg || '请求失败',
            icon: 'none'
          })
        }
      },
      // 响应失败 网络错误
      fail: (err: any) => {
        uni.showToast({
          title: '网络错误',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}