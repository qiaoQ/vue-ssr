<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/detail">详情</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'app',
  components: {},
  mounted() {
    dayjs().format();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
