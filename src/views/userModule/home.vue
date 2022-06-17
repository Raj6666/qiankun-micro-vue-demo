<template>
  <div>
    <p class="sub-title">子应该个人中心</p>
    <router-view />
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  name: 'userHome',
  computed: {
    ...mapState({
      microModule(state) {
        return state.microModule;
      },
    }),
  },
};
</script>
<style lang="scss" scoped>
.sub-title {
  width: 120px;
  height: 40px;
  color: #ffffff;
  background-color: blue;
  line-height: 40px;
  @include transform-centering;
}
</style>
