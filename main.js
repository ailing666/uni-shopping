import Vue from 'vue'
import request from './utils/request.js'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$request = request
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
