/**
 * 埋点相关插件包括 countly 和 sensors
 *
 * */
import initsensor from './vvicSensors';
import directives from './directives';

export default {
  install(Vue) {
    initsensor();
    Vue.directive('expose', directives.expose);
    Vue.directive('track', directives.track);
  },
};
