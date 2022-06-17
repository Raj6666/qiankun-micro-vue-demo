function isJSON(value) {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
}

function bindExpose(el, binding) {
  if (isJSON(binding.value)) {
    // 后端有返回数据才进行上报
    let data = JSON.parse(binding.value);
    window.vvicSensors.expose({
      el: el,
      data: data,
      event: data.eventName || '',
    });
  } else {
    window.vvicSensors.expose({
      el: el,
      paramsString: binding.value,
    });
  }
}

function bindCollect(el, binding) {
  if (isJSON(binding.value)) {
    // 后端有返回数据才进行上报
    let data = JSON.parse(binding.value);
    el.addEventListener('click', () => {
      window.vvicSensors.collect({
        el: el,
        data: data,
        event: data.eventName || '',
      });
    });
  } else {
    el.addEventListener('click', () => {
      window.vvicSensors.collect({
        el: el,
        paramsString: binding.value,
      });
    });
  }
}

function unbindCollect(el) {
  el.removeEventListener && el.removeEventListener('click', event);
}

function unbindExpose() {
  if (window.vvicSensors) {
    window.vvicSensors.disconnect();
  }
}

export default {
  expose: {
    bind(el, binding, vNode) {
      if (binding.value) {
        bindExpose(el, binding, vNode);
      }
    },
    update(el, binding, vNode) {
      // 数据变化时重新绑定
      if (binding.value && JSON.stringify(binding.value) !== JSON.stringify(binding.oldValue)) {
        unbindExpose(el);
        bindExpose(el, binding, vNode);
      }
    },
    unbind(el) {
      setTimeout(() => {
        unbindExpose(el);
      }, 0);
    },
  },
  track: {
    bind(el, binding, vNode) {
      bindCollect(el, binding, vNode);
    },
    update(el, binding, vNode) {
      // 数据变化时重新绑定
      if (binding.value && JSON.stringify(binding.value) !== JSON.stringify(binding.oldValue)) {
        unbindCollect(el);
        bindCollect(el, binding, vNode);
      }
    },
    unbind(el) {
      // 去掉监听
      setTimeout(() => {
        unbindCollect(el);
      });
    },
  },
};
