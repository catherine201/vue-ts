<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/capture">capture</router-link> |
      <router-link to="/purchase">purchase</router-link>
    </div>
    <transition :name="transitionName">
    <router-view/>
    </transition>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop, Watch, Emit} from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  public transitionName: string = ''
  @Watch('$route', {immediate: true})
  public onRouteChange(to: any, from: any) {
      // console.log(to); // "/pointList"
      // console.log(from); // “/index”
      const routeDeep = ['/', '/capure','/about', '/detail', '/purchase'];
      const toDepth = routeDeep.indexOf(to.path)
      const fromDepth = routeDeep.indexOf(from ? from.path : '')
      // const fromDepth = -1
      this.transitionName = toDepth > fromDepth ? 'fold-left' : 'fold-right'
  }
}
</script>

<style lang="less">
html,body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: .16rem;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  position: relative;
}
#nav {
  padding: 30px;
  background: greenyellow;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: .3s;
  }
  .fold-left-leave-active {
    animation-name: fold-left-out;
    animation-duration: .3s;
  }
.fold-right-enter-active {
    animation-name: fold-right-in;
    animation-duration: .3s;
  }
  .fold-right-leave-active {
    animation-name: fold-right-out;
    animation-duration: .3s;
  }
@keyframes fold-left-in {
    0% {
      transform: translate3d(100%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fold-left-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
</style>
