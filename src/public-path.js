// 修改webpack运行时的publicPath
if (window.__POWERED_BY_QIANKUN__) {
  console.log(123);
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  console.log(__webpack_public_path__);
}
