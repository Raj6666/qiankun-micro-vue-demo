import './public-path';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import authGuard from './router/auth-guard'; // 路由守卫
import Interceptors from './request/interceptors'; // 请求拦截
import '@/assets/styles/border.css'; // 全局border样式重置
import Api from '@/apis/index.js'; // 全局注册api接口对象

// import buriedpoint from '@/plugins/buriedpoint';

Vue.prototype.Api = Api;
Vue.config.productionTip = false;
Vue.use(Interceptors.request); // 请求拦截器
Vue.use(Interceptors.response); // 相应拦截器
require('./components/index.js'); // 全局注册公共组件

// Vue.use(buriedpoint);

// 仅在开发环境时引入mock
if (process.env.NODE_ENV === 'local') {
  require('./request/mock/index.js'); // 模拟普通请求状态的mock
}

// new Vue({
//   router,
//   store,
//   authGuard,
//   render: (h) => h(App),
// }).$mount('#app');

// 微应用注册
let instance = null;

// 1. 将注册方法用函数包裹，供后续主应用与独立运行调用
function render(props = {}) {
  // 解析主应用传入的值并注册vue实例
  const {container, microModule} = props;
  console.log('开始渲染', microModule);
  instance = new Vue({
    router,
    store,
    authGuard,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
  if (microModule) {
    console.log('更新state', {microModule});
    store.commit('setMicroModule', {microModule});
  }
}

// 判断是否在乾坤环境下，非乾坤环境下独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}

// 2. 导出的生命周期
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}
