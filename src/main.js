import { createApp } from 'vue'
import App from './App.vue'
// mitt 라이브러리 세팅
import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App)
app.config.globalProperties.emitter = emitter;  // global 변수 보관(모든 컴포넌트에서 사용가능)

// vuex 라이브러리 세팅
import store from './store.js'

import './registerServiceWorker'

// createApp(App).mount('#app')
// app.mount('#app')
app.use(store).mount('#app')
