var __cityMarketId = {
  gz: '1',
  pn: '2',
  jfn: '3',
  xt: '4',
  hz: '5',
  hznz: '6',
  jm: '10',
  yw: '11',
};

function getUserType() {
  var userInfo = JSON.parse(window.localStorage.getItem('loginInfo'));
  var userType = '';
  if (userInfo) {
    var typeObj = {
      1: '档口主',
      0: '店主',
    };
    userType = typeObj[+userInfo.type] ? typeObj[+userInfo.type] : '';
  }
  return userType;
}
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function initVvicSensors() {
  var itemAlgo = JSON.parse(getCookie('itemAlgo'));
  var vvicCountDom = document.getElementById('vvicCount');
  var dataEnv = vvicCountDom.getAttribute('data-env');
  var environment = 'dev';
  if (dataEnv === '//test-src.vvic.com') {
    environment = 'test';
  }
  if (dataEnv === '//rc-src.vvic.com') {
    environment = 'rc';
  }
  if (dataEnv === '//dev.src.vvic.com') {
    environment = 'dev';
  }
  if (dataEnv === '//src.vvic.com') {
    environment = 'production';
  }

  if (window['sensorsDataAnalytic201505'] && process.env.NODE_ENV) {
    // eslint-disable-next-line no-undef
    window.vvicSensors = new VvicSensors({
      environment: environment,
      sensors: window['sensorsDataAnalytic201505'],
      globalParams: {
        platform_type: 'web', // 平台类型
        app_name: '搜款网pc端', // 应用名称
        is_login: getCookie('uid') ? true : false, // 是否为登录状态
        ABtestId: itemAlgo && itemAlgo.algoId ? ['' + itemAlgo.algoId + ''] : [], // AB testid
        city_market_id: getCookie('city') ? __cityMarketId[getCookie('city')] : '1', // 站点id
        user_type: getUserType(), // 用户类型
        device_id_old: getCookie('cu') ? getCookie('cu') : '', // 游客id
      },
      exposeConfig: {
        visivleRatio: 0.5, // 曝光比例, 默认[0]
        one: true,
      },
    });
  }
  // sensors.store.getDistinctId()
}

export default initVvicSensors;
