<template>
  <div class="detail">
      <router-link to="/about">返回</router-link>
      <img :src="imgUrl" alt="我是弹簧" class="spring" @click="toBig()" ref="spring">
      
  </div>
</template>

<script lang="ts">
import spring, { toString } from 'css-spring';
import styled, { keyframes } from 'styled-components';
import { Component, Vue, Prop, Watch, Emit} from 'vue-property-decorator';
import {change} from '../utils/index.js';
@Component({
  components: {
  },
})
export default class Home extends Vue {
  private imgUrl: any = require('../assets/images/test.jpg');
  private toBig(): void {
  const keyframes = spring(
    { scale: 0 }, // from
    { scale: 1 }, // to
    // precision表示精度有2位
    { damping: 14, stiffness: 170, precision: 2},
);
  const keyframeString = toString(keyframes);
  console.log(keyframeString);
  console.dir(this.$refs.spring);
  console.log(`keyframes${keyframeString} 1s linear infinite`);
  // this.$refs.spring.style.animation = `@keyframes${keyframeString} 1s linear infinite`;
  change('spring', 'spring', keyframeString);
  }
//   private change(selector,animName) {
//     var keyframes = findKeyframesRule(animName);
//     // 删除已经存在的开始和结束帧
//     keyframes.deleteRule("0%"); keyframes.deleteRule('100%'); var clientWidth = document.documentElement.clientWidth/2 || document.body.clientWidth/2 // 此处为举例 keyframes.insertRule("0% { -webkit-transform: translate("+clientWidth+"px); }"); keyframes.insertRule("100% { -webkit-transform: translate(-"+clientWidth/2+"px); }");//结束移动屏幕一半 // 重新指定动画名字使之生效 document.querySelector(selector).style.webkitAnimationName = animName; }
// }
}
</script>

<style lang="less">
.detail{
    background: #fff;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: aqua;
    .spring{
      width: 1.5rem;
      height: 1.5rem;
      animation: spring 1s linear infinite;
    }
}
@keyframes spring {
  0% {}
  100% {}
}
</style>

