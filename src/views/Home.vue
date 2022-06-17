<!--
 * @Descripttion: 
 * @version: 
 * @Author: Husiyuan
 * @Date: 2022-04-18 11:56:41
 * @LastEditors: Husiyuan
 * @LastEditTime: 2022-06-08 20:03:25
-->
<template>
  <div class="sub-title">
    <div v-if="microModule === 'picMicro'">图片模块重构</div>
    <div v-else-if="microModule === 'adsMicro'">广告模块重构</div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'Home',
  computed: {
    ...mapState({
      microModule(state) {
        return state.microModule;
      },
    }),
  },
  components: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.sub-title {
  z-index: 9;
  width: 120px;
  height: 40px;
  color: #ffffff;
  background-color: blue;
  line-height: 40px;
  @include transform-centering;
}
</style>
