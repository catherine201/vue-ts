<template>
<div class="purchase_wrap">
<!-- <mt-button type="primary" @click="rightRow()">立即付款</mt-button> -->
<div class="purchase">
    <!-- 其实这里不需要这样去弄,因为可以在ui组件那里mounted 就直接触发focus唤起键盘 -->
<mt-button type="primary" class="ui-btn" @click="submitApply()">立即认购</mt-button>
<input type="tel" ref="tel" pattern="[0-9]*" class="trade-pwd" @click="submitApply()">
</div>
<ui v-if="isShow" ref="ui" @close="closeUi"></ui>
</div>
</template>

<script lang="ts">
import { Button } from 'mint-ui';
import { Component, Vue, Prop, Watch, Emit} from 'vue-property-decorator';
@Component({
    data() {
        return {
          pwdValue: ''
        }
    },
    components: {
        ui: () => import('../components/ui.vue')
    }}
)
export default class Ui extends Vue {
// @Prop({default: '请输入交易密码'}) private dtitle!: string;
  private isShow: boolean = false;
  private dtitle: string = '请输入交易密码';
  private submitApply() {
    //   this.$refs.tel.focus()
      this.isShow = true;
  }
  private closeUi() {
      this.isShow = false;
  }
 @Watch('pwdValue', {immediate: true})
  public pwdValueChange(val: number, oldVal: number) {
    console.log(val, oldVal);
  }
}
</script>

<style scoped lang="less">
.purchase_wrap{
    position: relative;
    width: 100%;
    height: 100%;
    background: burlywood;
    .purchase{
     width: 96px;
     height: 41px;
       position: absolute;
     left: 0rem;
     right: 0;
     top: 0;
     bottom: 0;
     margin: auto;
 /deep/ .mint-button--primary{
 }
 .trade-pwd{
     width: 96px;
     height: 41px;
     position: absolute;
     left: 0;
     top: 0;
     outline: none;
     &:focus{
        outline: none;
        appearance:none;
        color:transparent;
     }
 }
 }
}
</style>