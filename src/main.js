import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/global.css'
import { Button } from 'vant';
import 'vant/lib/index.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import mainContainer from "@/components/container";
import * as ElIconModules from '@element-plus/icons'
import less from 'less'
import { Swipe, SwipeItem } from 'vant';
//import '@vant/touch-emulator'

//https://blog.csdn.net/qq_33733799/article/details/129873731
const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
    constructor(callback) {
        callback = debounce(callback, 16);
        super(callback);
    }
}

const app = createApp(App);
app.use(store).
use(ElementPlus).component('mainContainer',mainContainer)
    .use(Button).use(router).mount('#app')
app.use(Swipe)
app.use(SwipeItem)
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
}