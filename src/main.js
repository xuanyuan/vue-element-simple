import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import Config from './config';
import Api from './api';
import './assets/scss/common.scss';
import './theme/index.css';
import './assets/css/font-awesome.min.css';
import './assets/css/style.css';
import Cookies from 'js-cookie';

// 原型链上修改东西，不好。 
Vue.prototype.$Config = Config;
Vue.prototype.$Api = Api;

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title ? to.meta.title + '-' + Config.siteName : Config.siteName;
  if (!store.getters.GET_TOKEN && to.path != '/login') {
    next({
      path: '/login'
    });
  } else {
    next();
  }
});
router.afterEach(transition => {

});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})