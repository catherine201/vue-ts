<template>
  <div class="about">
<div class="wrapper">
  <ul class="content">
    <li v-for="(item, index) in arr" :key="index">{{item}}</li>
  </ul>
  <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit} from 'vue-property-decorator';
import { setFlagsFromString } from 'v8';
import BScroll from 'better-scroll';
import { setTimeout } from 'timers';
let houseScroll: BScroll;
@Component({
  components: {
  },
})
export default class Home extends Vue {
  get count(): string {
    return `count${this.hello}`;
  }
  public arr: number[] = [];
  // public public  = new BScroll(document.querySelector('.wrapper') as Element);
  private hello: string = '你好';
  private totalPage: number = 10;
  private pageNo: number = 0;
  private loading: boolean = false;
  private loadingOver: boolean = false;
  // computed
  @Prop({default: '默认值'}) private propB!: string;
  constructor() {
    super();
  }

  @Watch('hello', {immediate: true})
  public onHelloChange(val: string, oldVal: string) {
    console.log(val, oldVal);
  }
  public init(): void {
    for (let i: number = 0; i < 30; i++) {
        this.arr.push(i);
    }
    // setTimeout(() => {
    this._houseScroll();
      // console.log(this);
    // }, 50);
  }
  public _houseScroll() {
    console.log(houseScroll);
    this.$nextTick(() => {
      console.log(houseScroll);
      // if (!houseScroll) {
      console.log('gun');
      const wrapper = document.querySelector('.wrapper'); // scroll容器
                          // new Bscroll(),初始化容器；
      houseScroll = new BScroll(wrapper as Element, {
                            scrollY: true,
                            probeType: 3,
                            click: true,
                            pullUpLoad: {
                              threshold: -100, // 在上拉到超过底部 20px 时，触发 pullingUp 事件
                            },
                        },
                    );
      console.dir(houseScroll);
                      // 初始化上拉刷新加载更多方法
      houseScroll.on('pullingUp', () => {
                      console.log('pullingUp');
                      this.pageNo++;
                      if (this.totalPage >= this.pageNo) {
                             this.pageNo++; // 通过pageNo增加，加载第二页的数据
                             this.init();
                             this.loading = true;
                        } else {
                            this.loading = false;
                            this.loadingOver = true;
                        }
                    });
                // } else {
                //     houseScroll.finishPullUp();
                //     houseScroll.refresh();
                // }
            });
    }

  public mounted() {
    houseScroll = new BScroll(document.querySelector('.wrapper') as Element);
    this.init();
  }
  private handleReset(val: string) {
    console.log(val);
    console.log(`触发了`);
  }
   }
</script>

<style scoped lang="less">
p{
  font-size: .21rem;
}
.wrapper{
  height: 5rem;
  overflow-y: hidden;
}
</style>

