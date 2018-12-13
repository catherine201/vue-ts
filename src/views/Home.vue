<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <p>{{hello}}</p>
    <p> {{propB}}</p>
    <p>{{count}}</p> -->
    
<input type="tel" v-model="tel">
    <HelloWorld msg="你好" @reset="handleReset"/>
    <v-touch v-on:swipeleft="onSwipeLeft()">Swipe me!</v-touch>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { MessageBox } from 'mint-ui';
import { setTimeout } from 'timers';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  // computed
  get count(): string {
    return `count${this.hello}`;
  }
  private hello: string = '你好';
  private tel = '';
  private imgUrl = require('../assets/images/mouse.jpg');
  // http://lensbuyersguide.com/gallery/219/2/23_iso100_14mm.jpg
  @Prop({default: '默认值'}) private propB!: string;

  @Watch('hello', {immediate: true})
  public onHelloChange(val: string, oldVal: string) {
    console.log(val, oldVal);
  }

  public onSwipeLeft() {
    this.$router.push({path: '/about'});
  }
  // method
  private greet(): void {
    // alert('hello')
  }

  private handleReset(val: string) {
    console.log(val);
    console.log(`触发了`);
  }
  private created() {
// MessageBox({
//   title: '提示',
//   message: '确定执行此操作?',
//   showCancelButton: true
// });
this.greet();
  }
  // private mounted() {
  //   setTimeout(() => {
  //     this.imgUrl = 'http://lensbuyersguide.com/gallery/219/2/23_iso100_14mm.jpg';
  //   }, 5000);
  // }
}
</script>

<style scoped lang="less">
p{
  font-size: .21rem;
}
.home{
  width: 100%;
  height: 100%;
  background: palegreen;
}
</style>
