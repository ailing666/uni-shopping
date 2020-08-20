 const BASE_URL = 'https://www.uinav.com'
 function request({
	 url,
	 showLoading=true
 }){
	return new Promise((resolve,reject)=>{
		if (showLoading) {
		  uni.showToast({
		    title: '加载中...',
		    icon: 'loading',
		    mask: true 
		  })
		}
		uni.request({
			url:BASE_URL+url,
			success:res=>{
				let {meta,message} = res.data
				if(meta.status === 200){
					resolve(message)
				}
			},
    fail(){
        uni.showToast({
          title: '网络超时',
          icon: 'none'
        })
        reject(new Error('网络超时'))
      },
			complete() {
			  if (showLoading) {
			    uni.hideLoading()
			  }
			}
		})
	})
}
export default request