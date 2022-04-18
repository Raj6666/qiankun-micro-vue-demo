<template>
  <div class="home">
    <p class="sub-title">子应用在此</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.sub-title {
  color: #fff;
  background-color: red;
  height: 40px;
  line-height: 40px;
  width: 80px;
  @include transform-centering;
}
</style>
