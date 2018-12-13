<template>
<div class="shareWrap">
<div class="actShareBox">
  <!-- 我是html！！ -->
  <!-- 要用于生成快照的html代码 -->
  <div class="j_snapshot snapshot">
      <p>1225614</p>
      <p>哈哈哈</p>
  </div>
</div>
<div class="j_snapshot_img_box actShareImgBox">
    我是html2canvas生成的图片
    <!-- 用于展示html2canvas生成的图片 -->
    <img src="" class="j_snapshot_img2">
</div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit} from 'vue-property-decorator';
import html2canvas from 'html2canvas';

@Component({
  components: {
  },
})
export default class Capture extends Vue {
  // computed
  get count(): string {
    return `count${this.hello}`;
  }
  private hello: string = '你好';
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
  private mounted() {
  // html2canvas 生成canvas
const $snapshot: any = document.querySelector('.j_snapshot');
const $snapshotImg2: any = document.querySelector('.j_snapshot_img2');
html2canvas($snapshot, {
    // useCORS: true, // 允许图片跨域
    backgroundColor: null,
    logging: true,
    // scale: window.devicePixelRatio * 2,
}).then((canvas: any) => {
    // 'image/jpeg', 1.0
    // 再利用canvas的toDataURL 方法，将canvas转为图片
    const dataURL: string = canvas.toDataURL();
    $snapshotImg2.src = dataURL;
}, (err: any) => {
    console.error('oops, something went wrong!', err);
});
  }
}
</script>

<style scoped lang="less">
// p{
//   font-size: .21rem;
// }
.shareWrap{
  width: 100%;
  height: 100%;
  background: palevioletred;
}
.j_snapshot{
    width:100%;
    p{
        font-size: .32rem;
    }
}
.j_snapshot_img2{
    width: 100%;
    // background-size: 200% 200%;
}
</style>
